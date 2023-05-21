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
    if (this.apiAccessTokenService.getAccessToken()) {
      console.log('đã đăng nhập');
      return true;
    } else {
      this.router.navigate(['/login']);
      console.log('k vào');
      return false;
    }
  }
}
