// user-registrations.component.ts
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../Services/auth.service';
import { EventRegistration } from '../../models/eventregistration.model';
import { CommonModule } from '@angular/common';
import { ExtendedEventRegistration } from '../../models/extended-event-registration.model'; // Adjust path as needed

@Component({
  standalone: true,
  selector: 'app-user-registrations',
  templateUrl: './user-registrations.component.html',
  styleUrls: ['./user-registrations.component.css'],
  imports: [CommonModule]
})
export class UserRegistrationsComponent implements OnInit {
  registrations: ExtendedEventRegistration[] = []; // Changed to match HTML template
  paginatedRegistrations: ExtendedEventRegistration[] = [];
  errorMessage: string | null = null;
  currentPage: number = 1;
  itemsPerPage: number = 5;
  totalItems: number = 0;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.loadRegistrations();
  }

  loadRegistrations(): void {
    const userId = this.authService.getUserIdFromToken();
    
    if (userId) {
      this.authService.getEventRegistrationsByUserId(userId).subscribe(
        registrations => {
          this.registrations = registrations;
          this.totalItems = registrations.length;
          this.updatePaginatedRegistrations();
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
  
  cancelRegistration(registrationId: number): void {
    this.authService.cancelEventRegistrationById(registrationId).subscribe(
      () => {
        // Update the registration status locally
        const registration = this.registrations.find(r => r.id === registrationId);
        if (registration) {
          registration.status = 'Cancelled';
          this.updatePaginatedRegistrations();
        }
      },
      error => {
        console.error('Error cancelling registration:', error);
        this.errorMessage = 'Failed to cancel registration.';
      }
    );
  }

  isCancelButtonDisabled(status: string): boolean {
    return status.toLowerCase() === 'cancelled';
  }

// Handle page change
onPageChange(page: number): void {
  this.currentPage = page;
  this.updatePaginatedRegistrations();
}

// Update the paginated list based on current page
private updatePaginatedRegistrations(): void {
  const startIndex = (this.currentPage - 1) * this.itemsPerPage;
  const endIndex = startIndex + this.itemsPerPage;
  this.paginatedRegistrations = this.registrations.slice(startIndex, endIndex);
}

// Get the total number of pages
get totalPages(): number {
  return Math.ceil(this.totalItems / this.itemsPerPage);
}
}