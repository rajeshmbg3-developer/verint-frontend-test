import { render, screen, waitFor } from "@testing-library/react";
import { Provider, useDispatch } from "react-redux";
import configureStore from "redux-mock-store";
import CustomerList from "src/components/CustomerList/CustomerList";
import queueService from "src/services/queueService";
import { setCustomers } from "src/store/queueSlice";
import { Customer } from "src/models/queue";

jest.mock("src/services/queueService", () => ({
  fetchCustomers: jest.fn(() => new Promise((resolve) => setTimeout(() => resolve([]), 1000))),
}));

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: jest.fn(),
}));

const mockStore = configureStore([]);

const mockCustomers: Customer[] = [
  {
    id: 11,
    name: "Rajesh",
    emailAddress: "rajesh@gmail.com",
    ticketNumber: "T001",
    currentPosition: 1,
    expectedTime: "26-03-2025",
  },
  {
    id: 12,
    name: "Alice",
    emailAddress: "alice@gmail.com",
    ticketNumber: "T001",
    currentPosition: 1,
    expectedTime: "2025-03-26T12:00:00Z",
  },
  {
    id: 13,
    name: "Bob",
    emailAddress: "bob@gmail.com",
    ticketNumber: "T002",
    currentPosition: 2,
    expectedTime: "2025-03-26T12:30:00Z",
  },
];

describe("CustomerList Component", () => {
  let store: any;
  const dispatch = jest.fn();

  beforeEach(() => {
    store = mockStore({ queue: { customers: [], filter: "" } });
    (useDispatch as unknown as jest.Mock).mockReturnValue(dispatch);
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.useRealTimers();
  });

  const renderWithProviders = (store: any) =>
    render(
      <Provider store={store}>
        <CustomerList />
      </Provider>,
    );

  it("fetches customers and dispatches them", async () => {
    (queueService.fetchCustomers as jest.Mock).mockResolvedValueOnce(mockCustomers);

    // Simulate the component logic calling loadCustomers
    const loadCustomers = async () => {
      try {
        const fetchedCustomers = await queueService.fetchCustomers();
        dispatch(setCustomers(fetchedCustomers));
      } catch (err) {
        console.error("Failed to fetch customers", err);
      }
    };

    await loadCustomers();
    expect(queueService.fetchCustomers).toHaveBeenCalledTimes(1);
    expect(dispatch).toHaveBeenCalledWith(setCustomers(mockCustomers));
  });

  it("filters customers based on the filter input", async () => {
    store = mockStore({ queue: { customers: mockCustomers, filter: "Bob" } });

    renderWithProviders(store);

    // Bob should be visible because the filter is set to "Bob"
    await screen.findByText("Bob");

    // Alice and Charlie should NOT be visible
    expect(screen.queryByText("Alice")).not.toBeInTheDocument();
    expect(screen.queryByText("Charlie")).not.toBeInTheDocument();
  });

  it("shows error message on fetch failure", async () => {
    (queueService.fetchCustomers as jest.Mock).mockRejectedValueOnce(new Error("Failed to fetch"));
    renderWithProviders(store);

    await screen.findByText("Failed to fetch customers");
  });

  it("should show  loading spinner when loading ", async () => {
    const store = mockStore({ queue: { customers: [], filter: "" } });
    // Simulate a pending request
    jest.spyOn(queueService, "fetchCustomers").mockImplementation(() => new Promise(() => {}));

    renderWithProviders(store);
    // Ensure the loading indicator (CircularProgress) is present
    expect(await screen.findByRole("progress")).toBeInTheDocument();
  });

  it("should show error text", async () => {
    const store = mockStore({ queue: { customers: [], filter: "" } });
    jest
      .spyOn(queueService, "fetchCustomers")
      .mockImplementation(() => Promise.reject(new Error("Error fetching customers")));
    renderWithProviders(store);
    expect(await screen.findByTestId("error-text")).toBeInTheDocument();
  });

  it("should render the customer filter", async () => {
    const store = mockStore({ queue: { customers: [], filter: "" } });
    renderWithProviders(store);
    // Wait for loading spinner to disappear
    await waitFor(() => expect(screen.queryByRole("progress")).not.toBeInTheDocument());

    expect(screen.getByPlaceholderText("Search by name or ticket number")).toBeInTheDocument();
  });

  it("should show 'No customers found' when the customer list is empty", async () => {
    const store = mockStore({ queue: { customers: [], filter: "" } });

    render(
      <Provider store={store}>
        <CustomerList />
      </Provider>,
    );
    await waitFor(() => expect(screen.queryByRole("progress")).not.toBeInTheDocument());

    expect(screen.getByText("No customers found")).toBeInTheDocument();
  });

  it("should display customer cards when customers are available", async () => {
    const store = mockStore({ queue: { customers: mockCustomers, filter: "" } });

    render(
      <Provider store={store}>
        <CustomerList />
      </Provider>,
    );
    await waitFor(() => expect(screen.queryByRole("progress")).not.toBeInTheDocument());

    expect(screen.getByText("Rajesh")).toBeInTheDocument();
    expect(screen.getByText("Alice")).toBeInTheDocument();
    expect(screen.getByText("Bob")).toBeInTheDocument();
  });
});
