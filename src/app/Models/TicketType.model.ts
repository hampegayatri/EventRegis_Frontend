export interface TicketType {
    name: string;
    price: number;
    maxCapacity: number;
    availableQuantity: number;
    eventId?: number; 
  }