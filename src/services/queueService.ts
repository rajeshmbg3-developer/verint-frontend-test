import fetchQueueData from "src/mocks/mockApi";
import { Customer } from "src/models/queue";

const queueService = {
  async fetchCustomers(): Promise<Customer[]> {
    try {
      const response = await fetchQueueData();
      const data = await response.json();
      return data.queueData.queue.customersToday.map((customer: any) => ({
        id: customer.customer.id,
        name: customer.customer.name,
        emailAddress: customer.customer.emailAddress,
        ticketNumber: customer.customer.ticketNumber,
        currentPosition: customer.currentPosition,
        expectedTime: customer.expectedTime,
      }));
    } catch (error) {
      console.error("Failed to fetch queue data", error);
      return [];
    }
  },
};

export default queueService;
