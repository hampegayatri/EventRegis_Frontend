export interface EventRegistrationDto {
    id: number;
    userId: string;
    eventId: number;
    ticketTypeId: number;
    registrationDate: Date; // Use string to match ISO date format
    firstName: string;
    lastName: string;
    email: string;
    mobileNumber: string;
    age: number;
    gender: string;
  }
  