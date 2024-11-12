import { TicketType } from "./TicketType.model";
export interface Event {
  id?: number; // Optional, only if returned by the server
  name: string;
  description?: string;
  date: string;
  venueId: number;
  categoryId: number;
  artistId: number;
  organizerId: number;
  tags?: string;
  ticketTypes: TicketType[]; // Array of ticket types
}