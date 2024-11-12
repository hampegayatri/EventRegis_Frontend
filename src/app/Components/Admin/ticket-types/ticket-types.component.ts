import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../Services/auth.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-ticket-types',
  templateUrl: './ticket-types.component.html',
  styleUrls: ['./ticket-types.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule] // Add ReactiveFormsModule here
})
export class TicketTypesComponent implements OnInit {
  ticketTypeForm: FormGroup;
  events: any[] = [];
  successMessage: string | null = null;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.ticketTypeForm = this.fb.group({
      eventId: ['', Validators.required],
      name: ['', [Validators.required, Validators.maxLength(100)]],
      price: [0, [Validators.required, Validators.min(0.01)]],
      maxCapacity: [0, [Validators.min(1)]],
      availableQuantity: [0, [Validators.min(1)]]
    });
  }

  ngOnInit(): void {
    this.loadEvents();
  }

  loadEvents(): void {
    this.authService.getEvents().subscribe(
      events => this.events = events,
      error => console.error('Error fetching events:', error)
    );
  }

  onSubmit(): void {
    if (this.ticketTypeForm.valid) {
      const ticketType = this.ticketTypeForm.value;

      this.authService.addTicketType(ticketType).subscribe(
        response => {
          this.successMessage = 'Ticket type added successfully!';
          this.ticketTypeForm.reset();
        },
        error => {
          this.errorMessage = 'Error adding ticket type. Please try again.';
          console.error('Error adding ticket type:', error);
        }
      );
    } else {
      this.errorMessage = 'Please ensure all fields are filled out correctly.';
    }
  }
}
