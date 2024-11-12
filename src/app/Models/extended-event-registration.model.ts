import { EventRegistration } from './eventregistration.model'; // Ensure correct casing

export interface ExtendedEventRegistration extends EventRegistration {
  eventName: string;
  eventDate: Date;
}
