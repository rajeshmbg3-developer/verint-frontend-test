import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Customer } from "src/models/queue";

interface InitialState {
  customers: Customer[];
  filter: string;
}
const queueSlice = createSlice({
  name: "queue",
  initialState: {
    customers: [],
    filter: "",
  } as InitialState,
  reducers: {
    // Action to set customers
    setCustomers: (state, action: PayloadAction<Customer[]>) => {
      state.customers = action.payload;
    },
    // Action to set filter
    setFilter: (state, action: PayloadAction<string>) => {
      state.filter = action.payload;
    },
  },
});

export const { setCustomers, setFilter } = queueSlice.actions;
export default queueSlice.reducer;
