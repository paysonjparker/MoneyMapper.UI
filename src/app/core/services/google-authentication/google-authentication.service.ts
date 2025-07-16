import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { GoogleUser } from '../../models/google-authentication/google-user.response';

declare const google: any;

@Injectable({
  providedIn: 'root'
})
export class GoogleAuthenticationService {
  private userSubject = new BehaviorSubject<GoogleUser | null>(null);
  public user$ = this.userSubject.asObservable();

  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor() {
    this.initializeGoogleSignIn();
  } private initializeGoogleSignIn(): void {
    if (typeof google !== 'undefined') {
      google.accounts.id.initialize({
        client_id: environment.googleClientId,
        callback: (response: any) => this.handleCredentialResponse(response),
        auto_select: false,
        cancel_on_tap_outside: true
      });
    }
  } public handleCredentialResponse(response: any): void {
    // Decode the JWT token to get user information
    const token = response.credential;
    const payload = this.decodeJwtPayload(token);

    if (payload) {
      const user: GoogleUser = {
        id: payload.sub,
        name: payload.name,
        email: payload.email,
        picture: payload.picture
      };

      this.userSubject.next(user);
      this.isAuthenticatedSubject.next(true);

      // Store token in localStorage for persistence
      localStorage.setItem('google_token', token);
      localStorage.setItem('user', JSON.stringify(user));
    }
  }

  private decodeJwtPayload(token: string): any {
    try {
      const payload = token.split('.')[1];
      const decodedPayload = atob(payload);
      return JSON.parse(decodedPayload);
    } catch (error) {
      console.error('Error decoding JWT:', error);
      return null;
    }
  }

  public signIn(): void {
    if (typeof google !== 'undefined') {
      google.accounts.id.prompt();
    }
  }

  public signOut(): void {
    if (typeof google !== 'undefined') {
      google.accounts.id.disableAutoSelect();
    }

    // Clear stored data
    localStorage.removeItem('google_token');
    localStorage.removeItem('user');

    this.userSubject.next(null);
    this.isAuthenticatedSubject.next(false);
  }

  public getCurrentUser(): GoogleUser | null {
    return this.userSubject.value;
  }

  public isAuthenticated(): boolean {
    return this.isAuthenticatedSubject.value;
  }

  // Check for existing authentication on app initialization
  public checkAuthenticationStatus(): void {
    const token = localStorage.getItem('google_token');
    const userStr = localStorage.getItem('user');

    if (token && userStr) {
      try {
        const user = JSON.parse(userStr);
        this.userSubject.next(user);
        this.isAuthenticatedSubject.next(true);
      } catch (error) {
        console.error('Error parsing stored user data:', error);
        this.signOut();
      }
    }
  }
}
