import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  private baseUrl = 'https://localhost:44396/api/EventReport'; // Adjust the base URL as necessary

  constructor(private http: HttpClient) { }

  getRegistrationsPerEventCategoryUrl(): string {
    return `${this.baseUrl}/registrations-per-event-category`;
  }

  getOversubscribedEventsCategoryUrl(): string {
    return `${this.baseUrl}/oversubscribed-events-category`;
  }

  getRegistrationsPerUserUrl(): string {
    return `${this.baseUrl}/registrations-per-user`;
  }

  getEventsForChildrenUrl(): string {
    return `${this.baseUrl}/events-for-children`;
  }

  getEventUserAgeReportUrl(): string {
    return `${this.baseUrl}/event-user-age-report`;
  }

  getEventCancellationReportUrl(): string {
    return `${this.baseUrl}/event-cancellation-report`;
  }
  getEventsByOrganizerReportUrl(): string {
    return `${this.baseUrl}/events-by-organizer`;
  }

  exportReport(reportType: string): Observable<Blob> {
    const url = `${this.baseUrl}/${reportType}`;
    return this.http.get(url, { responseType: 'blob' });
  }
}
