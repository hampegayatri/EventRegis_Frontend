import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../Services/auth.service';

@Component({
  standalone: true,
  selector: 'app-registration-success',
  templateUrl: './registration-success.component.html',
  styleUrls: ['./registration-success.component.css'],
  imports: [CommonModule]
})
export class RegistrationSuccessComponent implements OnInit {
  eventName: string = '';
  eventDate: string = '';
  venue: string = '';
  ticketType: string = '';
  price: number = 0;

  constructor(private route: ActivatedRoute, private authService: AuthService, private router: Router,

  ) { }

  ngOnInit(): void {
    // Assuming the event details are passed through query parameters or state
    this.route.queryParams.subscribe(params => {
      this.eventName = params['eventName'] || 'Unknown Event';
      this.eventDate = params['eventDate'] || 'Unknown Date';
      this.venue = params['venue'] || 'Unknown Venue';
    });
  }
  logout() {
    this.authService.logout();

    this.router.navigate(['/login']); // Redirect to login page after logout
  }

}
