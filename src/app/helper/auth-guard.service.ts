import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ApiAccessTokenService } from './api-access-token.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
    private apiAccessTokenService: ApiAccessTokenService
  ) {}

  canActivate(): boolean {
    const accessToken = this.apiAccessTokenService.getAccessToken();
    
    if (accessToken) {
      this.authService.huyit.subscribe((level) => {
        if (level === 'team-leader') {
          return true; // Allow access for team leaders
        } else {
          this.router.navigate(['access-denied']); // Redirect to access-denied page for other levels
          return false;
        }
      });
      return false;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
  
}
