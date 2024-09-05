import { Component } from '@angular/core';
import { AuthService } from '../../../Services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
  standalone: true,
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [CommonModule, FormsModule]
})
export class LoginComponent {
  loginData = {
    email: '',
    password: ''
  };
  message: string | null = null;

  constructor(
    private authService: AuthService, // Inject AuthService
    private router: Router // For navigation after login
  ) {}

  // Login method to handle form submission
  login(): void {
    if (!this.loginData.email || !this.loginData.password) {
      this.message = 'Email and Password are required';
      return;
    }

    this.authService.login(this.loginData).subscribe(
      (response: any) => {
        if (response && response.token) {
          // Save token and redirect to home or admin dashboard
          this.authService.setToken(response.token);
          if (this.loginData.email === 'admin@example.com') {
            this.router.navigate(['/admin-dashboard']);
          } else {
            this.router.navigate(['/eventDetails']);
          }
        } else {
          this.message = 'Invalid credentials. Please try again.';
        }
      },
      (error) => {
        console.error('Login error:', error);
        this.message = 'An error occurred. Please try again later.';
      }
    );
  }
}
