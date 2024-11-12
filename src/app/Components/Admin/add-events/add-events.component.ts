import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../../Services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-add-events',
  templateUrl: './add-events.component.html',
  styleUrls: ['./add-events.component.css'],
  imports: [ReactiveFormsModule, CommonModule]
})
export class AddEventsComponent implements OnInit {
  eventForm!: FormGroup;
  organizers: any[] = [];
  venues: any[] = [];
  artists: any[] = [];
  categories: any[] = [];
  successMessage: string = ''; // Property to hold success message
  errorMessage: string = ''; // Property to hold error message
  
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.loadDropdownData();
  }

  initForm() {
    this.eventForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(100)]],
      description: ['', [Validators.maxLength(500)]],
      date: ['', Validators.required],
      venueId: ['', Validators.required],
      categoryId: ['', Validators.required],
      artistId: ['', Validators.required],
      organizerId: ['', Validators.required],
      tags: ['']
    });
  }

  loadDropdownData() {
    this.authService.getOrganizers().subscribe(
      data => this.organizers = data,
      error => console.error('Error fetching organizers:', error)
    );

    this.authService.getVenues().subscribe(
      data => this.venues = data,
      error => console.error('Error fetching venues:', error)
    );

    this.authService.getArtists().subscribe(
      data => this.artists = data,
      error => console.error('Error fetching artists:', error)
    );

    this.authService.getCategories().subscribe(
      data => this.categories = data,
      error => console.error('Error fetching categories:', error)
    );
  }

  onSubmit() {
    if (this.eventForm.valid) {
      this.authService.addEvent(this.eventForm.value).subscribe(
        response => {
          this.successMessage = 'Event added successfully!'; // Set success message
          this.errorMessage = ''; // Clear any previous error message
          console.log('Event added successfully:', response);
          this.eventForm.reset(); // Optionally reset the form
        },
        error => {
          this.errorMessage = 'Error adding event. Please try again.'; // Set error message
          this.successMessage = ''; // Clear any previous success message
          console.error('Error adding event:', error);
        }
      );
    }
  }
}
