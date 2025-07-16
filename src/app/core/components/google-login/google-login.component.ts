import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { GoogleAuthenticationService } from '../../services/google-authentication/google-authentication.service';
import { environment } from '../../environments/environment';

declare const google: any;

@Component({
  selector: 'app-google-login',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './google-login.component.html',
  styleUrl: './google-login.component.scss'
})
export class GoogleLoginComponent implements OnInit, AfterViewInit {
  @ViewChild('googleBtn', { static: false }) googleBtn!: ElementRef;

  constructor(
    private googleAuthService: GoogleAuthenticationService,
    private router: Router
  ) { }

  ngOnInit(): void {
    // Check if user is already authenticated
    this.googleAuthService.isAuthenticated$.subscribe(isAuthenticated => {
      if (isAuthenticated) {
        this.router.navigate(['/']);
      }
    });
  }

  ngAfterViewInit(): void {
    this.initializeGoogleSignIn();
  } private initializeGoogleSignIn(): void {
    if (typeof google !== 'undefined' && this.googleBtn) {
      google.accounts.id.initialize({
        client_id: environment.googleClientId,
        callback: (response: any) => this.handleCredentialResponse(response),
        auto_select: false,
        cancel_on_tap_outside: true
      });

      google.accounts.id.renderButton(this.googleBtn.nativeElement, {
        theme: 'filled_blue',
        size: 'large',
        text: 'signin_with',
        shape: 'rectangular',
        width: 250
      });
    }
  } private handleCredentialResponse(response: any): void {
    // The auth service will handle the response
    this.googleAuthService.handleCredentialResponse(response);
    this.router.navigate(['/']);
  }

  signInWithGoogle(): void {
    this.googleAuthService.signIn();
  }
}
