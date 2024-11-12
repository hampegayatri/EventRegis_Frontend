import { Component } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [HttpClientModule],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css'
})
export class LandingComponent {
  constructor(private router: Router) {} // Inject Router into the component

  // Method to navigate to Login page
  navigateToLogin() {
    this.router.navigate(['/login']); // Navigate to /login route
  }

  // Method to navigate to Signup page
  navigateToSignup() {
    this.router.navigate(['/signUp']); // Navigate to /signup route
  }

}
