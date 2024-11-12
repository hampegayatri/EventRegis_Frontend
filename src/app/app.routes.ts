import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Components/Auth/login/login.component';
import { SignupComponent } from './Components/Auth/signup/signup.component';
import { EventDetailsComponent } from './Components/event-details/event-details.component';
import { AdmindashboardComponent } from './Components/Admin/admindashboard/admindashboard.component';
import { RegisteredUsersComponent } from './Components/Admin/registered-users/registered-users.component';
import { AddEventsComponent } from './Components/Admin/add-events/add-events.component';
import { AvailableEventsComponent } from './Components/Admin/available-events/available-events.component';
import { AuthGuard } from '../Guard/auth.guard';
import { TicketTypesComponent } from './Components/Admin/ticket-types/ticket-types.component';
import { EventRegistrationComponent } from './Components/event-registration/event-registration.component';
import { RegistrationSuccessComponent } from './Components/registration-success/registration-success.component';
import { UserRegistrationsComponent } from './Components/user-registrations/user-registrations.component';
import { ReportsComponent } from './Components/Admin/reports/reports.component';
import { LandingComponent } from './landing/landing.component';

export const routes: Routes = [
  { path: 'eventDetails', component: EventDetailsComponent, canActivate: [AuthGuard]  },
  { path: 'event-registration/:eventId', component: EventRegistrationComponent } , 
  { path: 'admin-dashboard', component: AdmindashboardComponent,canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'signUp', component: SignupComponent },
  { path: 'registered-users', component: RegisteredUsersComponent },
  { path: 'add-events', component: AddEventsComponent },
  { path: 'available-events', component: AvailableEventsComponent },
  { path: 'ticket-types', component: TicketTypesComponent },
  { path: 'registration-success', component: RegistrationSuccessComponent, canActivate: [AuthGuard] },
  { path: 'user-registrations', component: UserRegistrationsComponent },
  { path: 'export-reports', component: ReportsComponent },
    { path: '', component: LandingComponent },
    {path:'**', component: LandingComponent },
    
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
