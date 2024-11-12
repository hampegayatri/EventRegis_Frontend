import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../Services/auth.service';
import { Router } from '@angular/router';
import { EventRegistrationDto } from '../../../Models/event-registration.model'; // Adjust import path if needed
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination'; // Import NgxPaginationModule
import { FormsModule } from '@angular/forms';
import { Event } from '../../../Models/Event.model'; // Import Event model
import { TicketType } from '../../../Models/TicketType.model'; // Import TicketType model
import { forkJoin } from 'rxjs';
import { Location } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-registered-users',
  templateUrl: './registered-users.component.html',
  styleUrls: ['./registered-users.component.css'],
  imports: [CommonModule, NgxPaginationModule, FormsModule] // Add NgxPaginationModule
})
export class RegisteredUsersComponent implements OnInit {
  registrations: EventRegistrationDto[] = [];
  eventDetails: Map<number, string> = new Map(); // Map to store event names
  ticketTypeDetails: Map<number, string> = new Map(); // Map to store ticket type names
  message: string | null = null;
  searchTerm: string = '';
  currentPage: number = 1;
  pageSize: number = 7; // Number of items per page
  sortDirection: { [key: string]: boolean } = {};


  constructor(
    private authService: AuthService,
    private router: Router,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.fetchEventRegistrations();
  }

  fetchEventRegistrations(): void {
    this.authService.getEventRegistrations().subscribe(
      (response: EventRegistrationDto[]) => {
        this.registrations = response;
        if (this.registrations.length === 0) {
          this.message = 'No event registrations found.';
        } else {
          this.message = null; // Clear message if data is found
          this.fetchEventAndTicketTypeDetails(); // Fetch event and ticket type details
        }
      },
      (error) => {
        console.error('Error fetching event registrations:', error);
        this.message = 'An error occurred while fetching event registrations.';
      }
    );
  }
  goBack() {
    this.location.back(); // Navigates back to the previous page
  }

  fetchEventAndTicketTypeDetails(): void {
    const eventIds = Array.from(new Set(this.registrations.map(r => r.eventId)));
    const ticketTypeIds = Array.from(new Set(this.registrations.map(r => r.ticketTypeId)));

    // Fetch events
    forkJoin(eventIds.map(id => this.authService.getEventById(id))).subscribe(
      (events: Event[]) => {
        events.forEach(event => {
          if (event.id !== undefined) {  // Check if event.id is not undefined
            this.eventDetails.set(event.id, event.name);
          }
        });
      },
      (error) => {
        console.error('Error fetching events:', error);
      }
    );

    // Fetch ticket types
    forkJoin(ticketTypeIds.map(id => this.authService.getTicketTypeById(id))).subscribe(
      (ticketTypes: any[]) => {
        ticketTypes.forEach(ticketType => {
          if (ticketType.id !== undefined) {  // Check if ticketType.id is not undefined
            this.ticketTypeDetails.set(ticketType.id, ticketType.name);
          }
        });
      },
      (error) => {
        console.error('Error fetching ticket types:', error);
      }
    );
  }
  navigateTo(page: string): void {
    this.router.navigate([`/${page}`]);
  }

  sort(property: keyof EventRegistrationDto) {
    const isAscending = this.sortDirection[property] = !this.sortDirection[property];

    this.registrations.sort((a, b) => {
      const valueA = a[property] as any;
      const valueB = b[property] as any;

      if (valueA < valueB) return isAscending ? -1 : 1;
      if (valueA > valueB) return isAscending ? 1 : -1;
      return 0;
    });
  }


  get filteredRegistrations() {
    const searchTermLower = this.searchTerm.toLowerCase();
    return this.registrations.filter(registration =>
      registration.firstName.toLowerCase().includes(searchTermLower) ||
      registration.lastName.toLowerCase().includes(searchTermLower)
    );
  }
}