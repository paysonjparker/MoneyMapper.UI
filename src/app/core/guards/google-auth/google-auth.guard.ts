import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { GoogleAuthenticationService } from '../../services/google-authentication/google-authentication.service';

@Injectable({
  providedIn: 'root'
})
export class GoogleAuthGuard implements CanActivate {
  constructor(
    private googleAuthService: GoogleAuthenticationService,
    private router: Router
  ) { }

  canActivate(): Observable<boolean> {
    return this.googleAuthService.isAuthenticated$.pipe(
      take(1),
      map(isAuthenticated => {
        if (isAuthenticated) {
          return true;
        } else {
          this.router.navigate(['/google-login']);
          return false;
        }
      })
    );
  }
}
