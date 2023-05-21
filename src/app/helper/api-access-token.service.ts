import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ApiAccessTokenService {
  constructor(private http: HttpClient) {}

   getAccessToken(): string | null {
    return localStorage.getItem('accessToken');
  }

  // Hàm helper để tạo header với accessToken
  createAuthHeader(): HttpHeaders {
    const accessToken = this.getAccessToken();
    return new HttpHeaders().set('Authorization', `Bearer ${accessToken}`);
  }
}
