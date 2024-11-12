import { Injectable } from '@angular/core';
import { Observable, forkJoin, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError,  map, switchMap } from 'rxjs/operators';
import { SignupData } from '../Models/signup.model';
import { LoginData } from '../Models/login.model';
import { Event } from '../Models/Event.model';
import { EventRegistration } from '../models/eventregistration.model'; // Update path to lowercase
import { ExtendedEventRegistration } from '../models/extended-event-registration.model'; // Adjust path as needed
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://localhost:44396/api/Account'; // User authentication API URL
  private eventApiUrl = 'https://localhost:44396/api/EventDetail'; // Event API URL
  private organizerApiUrl = 'https://localhost:44396/api/Organizer'; // Organizer API URL
  private venueApiUrl = 'https://localhost:44396/api/Venue'; // Venue API URL
  private artistApiUrl = 'https://localhost:44396/api/Artist'; // Artist API URL
  private categoryApiUrl = 'https://localhost:44396/api/Category'; // Category API URL
  private ticketTypeApiUrl = 'https://localhost:44396/api/TicketType'; // Category API URL
  private eventRegistrationApiUrl = 'https://localhost:44396/api/EventRegistration';
  private paymentApiUrl = 'https://localhost:44396/api/Payment'; 
  constructor(private http: HttpClient) {}

  // Signup
  signup(signupData: SignupData): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, signupData).pipe(
      catchError(this.handleError)
    );
  }

  // Login
  login(loginData: LoginData): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, loginData).pipe(
      catchError(this.handleError)
    );
  }

  // Log out user
  logout() {
    localStorage.removeItem('token');
  }

  // Save JWT token
  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  // Get JWT token
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  // Check if user is logged in
  isLoggedIn(): boolean {
    return !!this.getToken();
  }
  

  // Decode JWT token
  private decodeToken(token: string): any {
    try {
      return JSON.parse(atob(token.split('.')[1])); // Decode JWT token
    } catch (error) {
      console.error('Error decoding token', error);
      return null;
    }
  }

  // Get user ID from token
  getUserIdFromToken(): string | null {
    const token = this.getToken();
    if (token) {
      const decodedToken = this.decodeToken(token);
      return decodedToken ? decodedToken['nameid'] : null;
    }
    return null;
  }

  // Get all registers
  getRegisters(): Observable<any> {
    const token = this.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get(`${this.apiUrl}/register`, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  // Get a register by ID
  getRegisterById(Id: number): Observable<any> {
    const token = this.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get(`${this.apiUrl}/register/${Id}`, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  // Fetch event registrations
  getEventRegistrations(): Observable<any> {
    const token = this.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get('https://localhost:7144/api/EventRegistration', { headers }).pipe(
      catchError(this.handleError)
    );
  }

  // Add new event
  addEvent(eventDetail: any): Observable<any> {
    const token = this.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    return this.http.post(this.eventApiUrl, eventDetail, { headers }).pipe(
      catchError(this.handleError)
    );
  }
    // Get all events
    getEvents(): Observable<any[]> {
      const token = this.getToken();
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });
  
      return this.http.get<any[]>(this.eventApiUrl, { headers }).pipe(
        catchError(this.handleError)
      );
    }
  
    // Get available events (Alias for getEvents)
    getAvailableEvents(): Observable<any[]> {
      return this.getEvents(); // Reuse getEvents
    }
  

  // Get event by ID
  getEventById(id: number): Observable<any> {
    const token = this.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get(`${this.eventApiUrl}/${id}`, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  // Update event
  updateEvent(id: number, eventDetail: any): Observable<any> {
    const token = this.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    return this.http.put(`${this.eventApiUrl}/${id}`, eventDetail, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  // Delete event
  deleteEvent(id: number): Observable<any> {
    const token = this.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.delete(`${this.eventApiUrl}/${id}`, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  // AuthService method for bulk deletion
bulkDeleteEvents(ids: number[]): Observable<any> {
  const token = this.getToken();
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  });

  return this.http.request('DELETE', this.eventApiUrl, {
    body: { ids },
    headers: headers
  }).pipe(
    catchError(this.handleError)
  );
}

  // Fetch organizers
  getOrganizers(): Observable<any> {
    return this.http.get(this.organizerApiUrl).pipe(
      catchError(this.handleError)
    );
  }

  // Fetch venues
  getVenues(): Observable<any> {
    return this.http.get(this.venueApiUrl).pipe(
      catchError(this.handleError)
    );
  }

  // Fetch artists
  getArtists(): Observable<any> {
    return this.http.get(this.artistApiUrl).pipe(
      catchError(this.handleError)
    );
  }
// Fetch a venue by ID
getVenueById(venueId: number): Observable<any> {
  return this.http.get<any>(`${this.venueApiUrl}/${venueId}`).pipe(
    catchError(this.handleError)
  );
}

// Fetch an artist by ID
getArtistById(artistId: number): Observable<any> {
  return this.http.get<any>(`${this.artistApiUrl}/${artistId}`).pipe(
    catchError(this.handleError)
  );
}

  // Fetch categories
  getCategories(): Observable<any> {
    return this.http.get(this.categoryApiUrl).pipe(
      catchError(this.handleError)
    );
  }

   // Fetch ticket types by event ID
   getTicketTypesByEventId(eventId: number): Observable<any[]> {
    const token = this.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<any[]>(`${this.ticketTypeApiUrl}/ticket-typesbyeventid?eventId=${eventId}`, { headers }).pipe(
      catchError(this.handleError)
    );
  }
  // Fetch ticket type details by ID
  getTicketTypeById(ticketTypeId: number): Observable<any> {
    const token = this.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<any>(`${this.ticketTypeApiUrl}/${ticketTypeId}`, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  getEventRegistrationsByUserId(userId: string): Observable<ExtendedEventRegistration[]> {
    if (!userId) {
      return throwError('User ID is required.');
    }

    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<EventRegistration[]>(`${this.eventRegistrationApiUrl}/user/${userId}`, { headers }).pipe(
      switchMap((registrations: EventRegistration[]) => {
        const eventIds = registrations.map(reg => reg.eventId);

        if (eventIds.length === 0) {
          return of(registrations.map(reg => ({
            ...reg,
            eventName: 'Unknown',
            eventDate: new Date()
          }))); // Default values if no events
        }

        return forkJoin(eventIds.map(id =>
          this.http.get<Event>(`${this.eventApiUrl}/${id}`, { headers })
        )).pipe(
          map((events: Event[]) => {
            return registrations.map(reg => {
              const event = events.find(e => e.id === reg.eventId);
              return {
                ...reg,
                eventName: event?.name || 'Unknown',
                eventDate: new Date(event?.date || new Date()) // Ensure eventDate is a Date
              };
            });
          })
        );
      }),
      catchError(this.handleError)
    );
  
  }  // Cancel event registration by ID
cancelEventRegistrationById(id: number): Observable<any> {
  const token = localStorage.getItem('token');
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}`
  });

  return this.http.post(`${this.eventRegistrationApiUrl}/cancel/${id}`, null, { headers }).pipe(
    catchError(this.handleError)
  );

    return this.http.post(`${this.eventRegistrationApiUrl}/cancel/${id}`, {}, { headers }).pipe(
      catchError(this.handleError)
    );
  }
  registerEvent(registrationData: any): Observable<any> {
    const token = this.getToken();
    const userId = this.getUserIdFromToken(); // Extract UserId from token
  
    // Ensure UserId is included in the registration data
    if (userId) {
      registrationData.UserId = userId;
    } else {
      console.error('UserId is missing from the token');
      return throwError('UserId is missing from the token');
    }
  
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  
    return this.http.post(this.eventRegistrationApiUrl, registrationData, { headers }).pipe(
      catchError(this.handleError)
    );
  }    
    // Fetch ticket types
  getTicketTypes(): Observable<any[]> {
    const token = this.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<any[]>(this.ticketTypeApiUrl, { headers }).pipe(
      catchError(this.handleError)
    );
  }
  // Add this method in AuthService
getCurrentUser(): Observable<any> {
  const token = this.getToken();
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}`
  });

  return this.http.get(`${this.apiUrl}/currentUser`, { headers }).pipe(
    catchError(this.handleError)
  );
}

  // Handle errors
  private handleError(error: any): Observable<never> {
    console.error('An error occurred:', error);
    return throwError(error);
  }
  // Fetch events by category ID
getEventsByCategory(categoryId: number): Observable<any[]> {
  const token = this.getToken();
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}`
  });

  return this.http.get<any[]>(`${this.eventApiUrl}/category/${categoryId}`, { headers }).pipe(
    catchError(this.handleError)
  );
}
 // Initiate payment
 initiatePayment(paymentData: any): Observable<any> {
  const token = this.getToken();
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  });

  return this.http.post(this.paymentApiUrl, paymentData, { headers }).pipe(
    catchError(this.handleError)
  );
}
// In AuthService
getLastEventRegistrationId(): Observable<any> {
  const token = this.getToken();
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}`
  });

  return this.http.get<any>(`${this.eventRegistrationApiUrl}/latest-registration-id`, { headers }).pipe(
    catchError(this.handleError)
  );
}


// Add new ticket types
addTicketType(ticketType: any): Observable<any> {
  const token = this.getToken();
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  });

  return this.http.post(this.ticketTypeApiUrl, ticketType, { headers }).pipe(
    catchError(this.handleError)
  );
  
  
}}
