import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { saveAs } from 'file-saver'; // npm install file-saver
import { ReportService } from '../../../Services/report.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common'; 

@Component({
  standalone: true, 
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css'],
  imports: [HttpClientModule, CommonModule]  
})
export class ReportsComponent {

  reports = [
    {
      type: 'registrations-per-event-category',
      title: 'Registrations Per Event Category',
      description: 'Export a report detailing the number of registrations for each event category. This helps to analyze the popularity of different categories.',
      getUrl: () => this.reportService.getRegistrationsPerEventCategoryUrl()
    },
    {
      type: 'oversubscribed-events-category',
      title: 'Oversubscribed Events by Category',
      description: 'Export a report on events that are oversubscribed within each category. Useful for identifying which events are in high demand.',
      getUrl: () => this.reportService.getOversubscribedEventsCategoryUrl()
    },
    {
      type: 'registrations-per-user',
      title: 'Registrations Per User',
      description: 'Export a report showing the number of registrations made by each user. This can be useful for analyzing user activity and engagement.',
      getUrl: () => this.reportService.getRegistrationsPerUserUrl()
    },
    {
      type: 'events-for-children',
      title: 'Events for Children',
      description: 'Export a list of events specifically tailored for children. Useful for targeting family-oriented marketing and planning.',
      getUrl: () => this.reportService.getEventsForChildrenUrl()
    },
    {
      type: 'event-user-age-report',
      title: 'Event User Age Report',
      description: 'Export a report detailing the age distribution of users attending events. This helps to understand the demographics of your audience.',
      getUrl: () => this.reportService.getEventUserAgeReportUrl()
    },
    {
      type: 'event-cancellation-report',
      title: 'Event Cancellation Report',
      description: 'Export a report on events that have been canceled, including reasons and details. Useful for tracking cancellations and improving planning.',
      getUrl: () => this.reportService.getEventCancellationReportUrl()
    },
    {
      type: 'event-by-organizers-report',
      title: 'Events by Organizers Report',
      getUrl: () => this.reportService.getEventsByOrganizerReportUrl()
    }

  ];

  constructor(private http: HttpClient, private reportService: ReportService) {}

  exportReport(reportType: string) {
    const report = this.reports.find(r => r.type === reportType);
    if (report) {
      const url = report.getUrl();
      this.http.get(url, { responseType: 'blob' }).subscribe(blob => {
        const fileName = `${reportType}.csv`;
        saveAs(blob, fileName);
      }, error => {
        console.error('Error downloading the report:', error);
      });
    } else {
      console.error('Unknown report type');
    }
  }
}
