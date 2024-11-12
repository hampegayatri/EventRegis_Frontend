import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../Services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as bootstrap from 'bootstrap';
import { Toast } from 'bootstrap';

@Component({
  standalone: true,
  selector: 'app-event-registration',
  templateUrl: './event-registration.component.html',
  styleUrls: ['./event-registration.component.css'],
  imports: [CommonModule, FormsModule]
})
export class EventRegistrationComponent implements OnInit {

  event: any; // Object to store event details
  ticketTypes: any[] = [];
  selectedPrice: number = 0;
  totalAmount: number = 0; 
  registrationDto = {
    ticketTypeId: null,
    firstName: '',
    lastName: '',
    email: '',
    mobileNumber: '',
    age: null,
    gender: '',
    totalAmount: 0, // Will be set to the value displayed in the modal
    paymentStatus: 'successful', // Set payment status to successful by default
    eventRegistrationId: null as string | null  
  };
  venueName: string = ''; // Variable to store venue name
  artistName: string = ''; // Variable to store artist name
  registrationId: string | null = null; // To store registration ID

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const eventId = +params.get('eventId')!;
      if (eventId) {
        this.fetchEventDetails(eventId);
        this.fetchTicketTypes(eventId);
      }
    });
  }

  fetchEventDetails(eventId: number) {
    this.authService.getEventById(eventId).subscribe({
      next: (data: any) => {
        this.event = data;
        this.fetchVenueDetails(data.venueId);
        this.fetchArtistDetails(data.artistId);
      },
      error: (error) => {
        console.error('Error fetching event details:', error);
      }
    });
  }

  fetchVenueDetails(venueId: number) {
    this.authService.getVenueById(venueId).subscribe({
      next: (data: any) => {
        this.venueName = data.name; // Adjust according to your API response structure
      },
      error: (error) => {
        console.error('Error fetching venue details:', error);
      }
    });
  }

  fetchArtistDetails(artistId: number) {
    this.authService.getArtistById(artistId).subscribe({
      next: (data: any) => {
        this.artistName = data.name; // Adjust according to your API response structure
      },
      error: (error) => {
        console.error('Error fetching artist details:', error);
      }
    });
  }

  fetchTicketTypes(eventId: number) {
    this.authService.getTicketTypesByEventId(eventId).subscribe({
      next: (data: any[]) => {
        this.ticketTypes = data;
      },
      error: (error) => {
        console.error('Error fetching ticket types:', error);
      }
    });
  }

  onTicketTypeChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    const ticketTypeId = Number(target.value);
    const selectedType = this.ticketTypes.find(type => type.id === ticketTypeId);
    if (selectedType) {
      this.selectedPrice = selectedType.price;
      this.totalAmount = this.selectedPrice; 
      this.registrationDto.totalAmount = this.totalAmount; // Update DTO with total amount
    }
  }

  openPaymentModal() {
    const paymentModal = new bootstrap.Modal(document.getElementById('paymentModal')!);
    paymentModal.show();
  }

  onSubmit() {
    const eventId = this.route.snapshot.params['eventId'];
    const userId = localStorage.getItem('userId');
  
    if (this.totalAmount <= 0) {
      console.error('Total Amount must be greater than 0');
      return;
    }
  
    // Prepare registration data
    const registrationData = {
      ...this.registrationDto,
      eventId: eventId,
      userId: userId
    };
  
    this.authService.registerEvent(registrationData).subscribe({
      next: (response: any) => {
        console.log('Registration successful:', response);

        // Show custom toast
        const toastElement = document.getElementById('successToast')!;
        const toast = new Toast(toastElement);
        toast.show();
        
        // Navigate to RegistrationSuccessComponent with event details
        setTimeout(() => {
          this.router.navigate(['/registration-success'], {
            queryParams: {
              eventName: this.event.name,
              eventDate: this.event.date,
              venue: this.venueName,
              ticketType: this.ticketTypes.find(type => type.id === this.registrationDto.ticketTypeId)?.name,
              price: this.selectedPrice
            }
          });
        }, 3000); // Adjust timeout to match toast display duration
      },
      error: (error: any) => {
        console.error('Error registering event:', error);
      }
    });
  }
}