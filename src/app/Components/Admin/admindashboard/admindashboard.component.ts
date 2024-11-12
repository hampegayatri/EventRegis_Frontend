import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../Services/auth.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReportService } from '../../../Services/report.service';

@Component({
  standalone: true,
  selector: 'app-admindashboard',
  templateUrl: './admindashboard.component.html',
  styleUrls: ['./admindashboard.component.css'],
  imports: [CommonModule, RouterModule]
})
export class AdmindashboardComponent {
  cards = [
    {
      title: 'Add Events',
      description: 'Easily create and manage events with this feature. You can specify all event details, including date, time, and venue, and keep track of upcoming events efficiently.',
      route: 'add-events'
    },
    {
      title: 'Registered Users',
      description: 'Access a complete list of users registered for events. This section allows you to view user profiles, track their registration status, and manage user communications effectively.',
      route: 'registered-users'
    },
    {
      title: 'Available Events',
      description: 'Browse and explore all upcoming events that are open for registration. This feature helps you stay updated with the latest events and facilitates easy access to event details and registration options.',
      route: 'available-events'
    },
    {
      title: 'Add Tickets',
      description: 'Add and manage ticket types for events. This feature allows you to define different ticket categories and their details for events.',
      route: 'ticket-types' // Route to the TicketTypesComponent
    },
    {
      title: 'Export Reports',
      description: 'Generate and download reports related to event registrations, cancellations, and other metrics. This feature allows you to export detailed reports for analysis.',
      route: 'export-reports' // Route to the ReportsComponent
    }
  ];

  constructor(private router: Router, private authService: AuthService,  private reportService: ReportService) {}

  navigateTo(route: string) {
    this.router.navigate([`/${route}`]);
  }

  logout() {
    this.authService.logout();
    
    this.router.navigate(['/login']); // Redirect to login page after logout
  }
  exportReport(reportType: string) {
    this.reportService.exportReport(reportType).subscribe(
      (response: Blob) => {
        const url = window.URL.createObjectURL(response);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${reportType}.csv`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
      },
      error => {
        console.error('Error exporting report', error);
      }
    );
  }

}
