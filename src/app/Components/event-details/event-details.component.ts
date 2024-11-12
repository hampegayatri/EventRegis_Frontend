import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../Services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EventRegistration } from '../../models/eventregistration.model'; // Ensure correct casing
import { forkJoin } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Component({
  standalone: true,
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.css'],
  imports: [CommonModule, FormsModule]
})
export class EventDetailsComponent implements OnInit {
  categories: any[] = [];
  events: any[] = [];
  filteredEvents: any[] = [];
  selectedCategoryId: number | null = null;
  errorMessage: string | null = null;
  venues: any[] = [];
  organizers: any[] = [];
  artists: any[] = [];
  ticketTypes: any[] = [];
  searchTag: string = '';
  venueMap: Map<number, { name: string; city: string }> = new Map();
  organizerMap: Map<number, string> = new Map();
  artistMap: Map<number, string> = new Map();
  ticketTypeMap: Map<number, any[]> = new Map();
  
  registrationDetails: EventRegistration[] = []; // To store registration details

  // Pagination Variables
  currentPage: number = 1;
  itemsPerPage: number = 3; // Show 3 events per page
  totalItems: number = 0;
  totalPages: number = 0;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.loadCategories();
    this.loadAdditionalData();
    this.loadRegistrations(); // Load registrations on init
  }

  loadCategories(): void {
    this.authService.getCategories().subscribe(
      categories => {
        this.categories = categories;
      },
      error => {
        this.errorMessage = 'Failed to load categories.';
      }
    );
  }

  loadAdditionalData(): void {
    forkJoin({
      venues: this.authService.getVenues().pipe(catchError(() => [])),
      organizers: this.authService.getOrganizers().pipe(catchError(() => [])),
      artists: this.authService.getArtists().pipe(catchError(() => [])),
      ticketTypes: this.authService.getTicketTypes().pipe(catchError(() => []))
    }).subscribe(({ venues, organizers, artists, ticketTypes }) => {
      this.venues = venues;
      this.organizers = organizers;
      this.artists = artists;
      this.ticketTypes = ticketTypes;

      this.venues.forEach(venue => {
        this.venueMap.set(venue.id, { name: venue.name, city: venue.city });
      });

      this.organizers.forEach(organizer => this.organizerMap.set(organizer.id, organizer.name));
      this.artists.forEach(artist => this.artistMap.set(artist.id, artist.name));

      this.ticketTypes.forEach(ticket => {
        if (!this.ticketTypeMap.has(ticket.eventId)) {
          this.ticketTypeMap.set(ticket.eventId, []);
        }
        this.ticketTypeMap.get(ticket.eventId)?.push(ticket);
      });
    });
  }

  loadRegistrations(): void {
    const userId = this.authService.getUserIdFromToken();
    
    if (userId) {
      this.authService.getEventRegistrationsByUserId(userId).subscribe(
        registrations => {
          this.registrationDetails = registrations;
        },
        error => {
          console.error('Error fetching event registrations:', error);
          this.errorMessage = 'Failed to load event registrations.';
        }
      );
    } else {
      console.error('User ID not found.');
      this.errorMessage = 'User ID not available.';
    }
  }
  viewRegisteredEvents(): void {
    this.router.navigate(['/user-registrations']); // Navigate to the UserRegistrationsComponent
  }
  
  onSelectEvent(event: any): void {
    this.router.navigate(['/event-registration', event.id]);
  }

  onCategorySelect(categoryId: number): void {
    this.selectedCategoryId = categoryId;
    this.loadEventsByCategory(categoryId);
  }

  loadEventsByCategory(categoryId: number): void {
    this.authService.getEventsByCategory(categoryId).subscribe(
      events => {
        this.events = events;
        this.totalItems = events.length;  // Update total item count for pagination
        this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage); // Calculate total pages
        this.filteredEvents = this.paginateEvents(events);  // Paginate the events initially
        this.events.forEach(event => {
          const venue = this.venueMap.get(event.venueId);
          event.venueName = venue ? `${venue.name}, ${venue.city}` : 'Unknown Venue';
          event.organizerName = this.organizerMap.get(event.organizerId) || 'Unknown Organizer';
          event.artistName = this.artistMap.get(event.artistId) || 'Unknown Artist';
          event.ticketTypes = this.ticketTypeMap.get(event.id) || [];
          event.tagsArray = event.tags ? event.tags.split(',').map((tag: string) => tag.trim()) : [];
        });
      },
      error => {
        this.errorMessage = 'Failed to load events.';
      }
    );
  }

  // Pagination Methods
  paginateEvents(events: any[]): any[] {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return events.slice(start, end);
  }

  changePage(page: number): void {
    this.currentPage = page;
    this.filteredEvents = this.paginateEvents(this.events);
  }

  // Other Methods
  filterEventsByTag(): void {
    if (this.searchTag.trim()) {
      this.filteredEvents = this.events.filter(event =>
        event.tagsArray.some((tag: string) => 
          tag.toLowerCase().includes(this.searchTag.toLowerCase())
        )
      );
    } else {
      this.filteredEvents = this.events;
    }
  }

  clearSearch(): void {
    this.searchTag = '';
    this.filteredEvents = this.paginateEvents(this.events);
  }

  fetchRegistrationById(id: string): void {
    this.authService.getEventRegistrationsByUserId(id).subscribe(
      (registrations: EventRegistration[]) => {
        const registration = registrations.find(reg => reg.id.toString() === id.toString());
        if (registration) {
          console.log('Registration details:', registration);
          // Handle registration details
        } else {
          console.error('No registration found for the given ID.');
        }
      },
      error => {
        console.error('Error fetching registrations:', error);
        this.errorMessage = 'Failed to fetch registration details.';
      }
    );
  }
      
  cancelRegistration(id: number): void {
    this.authService.cancelEventRegistrationById(id).subscribe(
      response => {
        console.log('Registration canceled successfully');
        this.registrationDetails = this.registrationDetails.filter(reg => reg.id !== id);
      },
      error => {
        this.errorMessage = 'Failed to cancel registration.';
      }
    );
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
