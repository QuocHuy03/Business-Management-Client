import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiAccessTokenService {
  private baseURL = 'http://localhost:3000/api';
  constructor(private http: HttpClient) {}

  getAccessToken(): string | null {
    return localStorage.getItem('accessToken');
  }

  createAuthHeader(): HttpHeaders {
    const accessToken = this.getAccessToken();
    return new HttpHeaders().set('Authorization', `Bearer ${accessToken}`);
  }

  get(): Observable<any> {
    const headers = this.createAuthHeader();
    return this.http.get(`${this.baseURL}/verifyAccessToken`, { headers });
  }
}
