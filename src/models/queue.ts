export interface Customer {
  id: number;
  name: string;
  emailAddress?: string;
  ticketNumber: string;
  currentPosition: number;
  expectedTime: string;
}

export interface QueueState {
  customers: Customer[];
  loading: boolean;
  error: string | null;
  filter: string;
}
