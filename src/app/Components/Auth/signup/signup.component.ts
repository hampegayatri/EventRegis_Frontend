import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../Services/auth.service'; // Update the import path based on your folder structure
import { Router } from '@angular/router';
import { SignupData } from '../../../Models/signup.model'; // Adjust the import path as needed
import { ReactiveFormsModule } from '@angular/forms';
@Component({
  standalone: true,
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  imports: [ReactiveFormsModule]
})
export class SignupComponent implements OnInit {
  signUpForm!: FormGroup;
  message: string | null = null;

  // Define a property to hold signup data, typed with SignupData
  signupData: SignupData = {
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  };

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.signUpForm = this.fb.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    }, {
      validator: this.passwordMatchValidator
    });
  }

  passwordMatchValidator(group: FormGroup) {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  onSubmit(): void {
    if (this.signUpForm.valid) {
      // Map form values to signupData
      this.signupData = this.signUpForm.value as SignupData;

      this.authService.signup(this.signupData).subscribe(
        response => {
          this.message = 'Sign up successful!';
          this.signUpForm.reset();
          setTimeout(() => this.router.navigate(['/login']), 2000); // Navigate to login after 2 seconds
        },
        error => {
          this.message = 'There was an error signing up. Please try again.';
        }
      );
    }
  }
}
