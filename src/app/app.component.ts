import { Component, OnInit,  } from '@angular/core';
import { RouterOutlet, Router,  RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { JwtInterceptor } from './Interceptor/jwt.interceptor';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { SignupComponent } from './Components/Auth/signup/signup.component';
import { AuthService } from './Services/auth.service';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet, // For routing outlet
    ReactiveFormsModule,
    SignupComponent,
    HttpClientModule, // For HTTP operations
    ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [
    AuthService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }
  ],
})

export class AppComponent {
  constructor(private router: Router) {}

  ngOnInit() {
    
  }
}