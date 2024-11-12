import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../../Services/auth.service';
import { Router } from '@angular/router';
import * as bootstrap from 'bootstrap';
import { CommonModule } from '@angular/common';
import { Location } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-available-events',
  templateUrl: './available-events.component.html',
  styleUrls: ['./available-events.component.css'],
  imports: [ReactiveFormsModule, CommonModule]
})
export class AvailableEventsComponent implements OnInit {
  events: any[] = [];
  displayedEvents: any[] = [];
  selectedEvents: Set<number> = new Set(); // Track selected events for bulk delete
  editEventForm!: FormGroup;
  modalEvent: any;

  organizers: any[] = [];
  venues: any[] = [];
  artists: any[] = [];
  categories: any[] = [];

  // Pagination variables
  currentPage: number = 1;
  pageSize: number = 5;
  totalEvents: number = 0;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private location: Location

  ) { }

  ngOnInit(): void {
    this.initEditForm();
    this.loadEvents();
    this.loadDropdownData();
  }

  initEditForm() {
    this.editEventForm = this.fb.group({
      id: [''],
      name: ['', [Validators.required, Validators.maxLength(100)]],
      description: ['', [Validators.maxLength(500)]],
      date: ['', Validators.required],
      venueId: ['', Validators.required],
      categoryId: ['', Validators.required],
      artistId: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0.01)]],
      maxCapacity: ['', [Validators.min(1)]],
      organizerId: ['', Validators.required],
      tags: ['']
    });
  }

  loadEvents() {
    this.authService.getEvents().subscribe(
      (data: any[]) => {
        this.events = data;
        this.totalEvents = data.length; // Set total number of events
        this.updateDisplayedEvents(); // Update displayed events based on current page
      },
      (error: any) => console.error('Error fetching events:', error)
    );
  }
  goBack() {
    this.location.back(); // Navigates back to the previous page
  }


  updateDisplayedEvents() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.displayedEvents = this.events.slice(startIndex, endIndex);
    // Map IDs to names
    this.displayedEvents = this.displayedEvents.map(event => ({
      ...event,
      venueName: this.getVenueName(event.venueId),
      categoryName: this.getCategoryName(event.categoryId),
      artistName: this.getArtistName(event.artistId),
      organizerName: this.getOrganizerName(event.organizerId),
      tagsList: this.formatTags(event.tags) // Format tags for display
    }));
  }

  loadDropdownData() {
    this.authService.getVenues().subscribe(data => this.venues = data);
    this.authService.getCategories().subscribe(data => this.categories = data);
    this.authService.getArtists().subscribe(data => this.artists = data);
    this.authService.getOrganizers().subscribe(data => this.organizers = data);
  }

  getVenueName(venueId: number): string {
    const venue = this.venues.find(v => v.id === venueId);
    return venue ? venue.name : 'Unknown Venue';
  }

  getCategoryName(categoryId: number): string {
    const category = this.categories.find(c => c.id === categoryId);
    return category ? category.name : 'Unknown Category';
  }

  getArtistName(artistId: number): string {
    const artist = this.artists.find(a => a.id === artistId);
    return artist ? artist.name : 'Unknown Artist';
  }

  getOrganizerName(organizerId: number): string {
    const organizer = this.organizers.find(o => o.id === organizerId);
    return organizer ? organizer.name : 'Unknown Organizer';
  }

  formatTags(tags: string): string[] {
    return tags ? tags.split(',').map(tag => tag.trim()) : [];
  }

  openEditModal(event: any) {
    this.modalEvent = event;
    this.editEventForm.patchValue({
      id: event.id,
      name: event.name,
      description: event.description,
      date: event.date,
      venueId: event.venueId,
      categoryId: event.categoryId,
      artistId: event.artistId,
      price: event.price,
      maxCapacity: event.maxCapacity,
      organizerId: event.organizerId,
      tags: event.tags
    });

    // Open the modal here (assuming Bootstrap)
    const modalElement = document.getElementById('editEventModal');
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    }
  }

  onEditSubmit() {
    if (this.editEventForm.valid) {
      const id = this.editEventForm.get('id')?.value;
      if (id) {
        this.authService.updateEvent(id, this.editEventForm.value).subscribe(
          () => {
            this.loadEvents(); // Reload events after update
            console.log('Event updated successfully');
            // Close the modal manually
            const modalElement = document.getElementById('editEventModal');
            if (modalElement) {
              const modal = bootstrap.Modal.getInstance(modalElement);
              if (modal) {
                modal.hide();
              }
            }
          },
          (error: any) => console.error('Error updating event:', error)
        );
      }
    }
  }

  deleteEvent(eventId: number) {
    this.authService.deleteEvent(eventId).subscribe(
      () => {
        this.loadEvents(); // Reload events after deletion
        console.log('Event deleted successfully');
      },
      (error: any) => console.error('Error deleting event:', error)
    );
  }

  toggleEventSelection(eventId: number) {
    if (this.selectedEvents.has(eventId)) {
      this.selectedEvents.delete(eventId);
    } else {
      this.selectedEvents.add(eventId);
    }
  }

  isEventSelected(eventId: number): boolean {
    return this.selectedEvents.has(eventId);
  }

  // Method to handle bulk delete
  bulkDelete(): void {
    if (this.selectedEvents.size > 0) {
      this.authService.bulkDeleteEvents(Array.from(this.selectedEvents)).subscribe(
        response => {
          this.loadEvents(); // Reload events after deletion
          console.log('Events deleted successfully', response);
        },
        error => {
          console.error('Error deleting events', error);
          // Handle error
        }
      );
    } else {
      console.warn('No events selected for deletion');
    }
  }

  // Pagination methods
  goToPage(page: number) {
    if (page > 0 && page <= this.getTotalPages()) {
      this.currentPage = page;
      this.updateDisplayedEvents();
    }
  }

  getTotalPages(): number {
    return Math.ceil(this.totalEvents / this.pageSize);
  }
}
