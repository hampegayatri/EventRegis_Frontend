import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Components/Auth/login/login.component';
import { SignupComponent } from './Components/Auth/signup/signup.component';
import { EventDetailsComponent } from './Components/event-details/event-details.component';
import { AdmindashboardComponent } from './Components/admindashboard/admindashboard.component';
export const routes: Routes = [
  { path: 'eventDetails', component: EventDetailsComponent },
  { path: 'admin-dashboard', component: AdmindashboardComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signUp', component: SignupComponent },
    { path: '', redirectTo: 'signUp', pathMatch: 'full' } // Default route
    
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
