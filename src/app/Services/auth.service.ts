import { Injectable } from '@angular/core';
import { Observable,throwError } from 'rxjs';
import { SignupData } from '../Models/signup.model';
import { LoginData } from '../Models/login.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://localhost:7144/api/Account'; // Adjust URL as necessary

  constructor(private http: HttpClient) {}

  signup(signupData: SignupData): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, signupData);
  }

  login(loginData: LoginData): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, loginData);
  }
    // Log out user
    logout() {
        localStorage.removeItem('token');
      }
    
      // Save JWT token
      setToken(token: string) {
        localStorage.setItem('token', token);
      }
    
      // Get JWT token
      getToken(): string | null {
        return localStorage.getItem('token');
      }
    
      // Check if user is logged in
      isLoggedIn(): boolean {
        return !!this.getToken();
      }
    
      // Decode JWT token
      private decodeToken(token: string): any {
        try {
          return JSON.parse(atob(token.split('.')[1])); // Decode JWT token
        } catch (error) {
          console.error('Error decoding token', error);
          return null;
        }
      }
    
      // Get user ID from token
      getUserIdFromToken(): string | null {
        const token = this.getToken();
        if (token) {
          const decodedToken = this.decodeToken(token);
          return decodedToken ? decodedToken['nameid'] : null;
        }
        return null;
      }
    
      // Get all registers
      getRegisters(): Observable<any> {
        const token = this.getToken();
        const headers = new HttpHeaders({
          'Authorization': `Bearer ${token}`
        });
    
        return this.http.get(`${this.apiUrl}/register`, { headers }).pipe(
          catchError(error => {
            console.error('Error fetching registers:', error);
            return throwError(error);
          })
        );
      }
    
      // Get a register by ID
      getRegisterById(Id: number): Observable<any> {
        const token = this.getToken();
        const headers = new HttpHeaders({
          'Authorization': `Bearer ${token}`
        });
    
        return this.http.get(`${this.apiUrl}/register/${Id}`, { headers }).pipe(
          catchError(this.handleError)
        );
      }
    
      // Handle errors
      private handleError(error: any): Observable<never> {
        console.error('An error occurred:', error);
        return throwError(error);
      }
    }    

