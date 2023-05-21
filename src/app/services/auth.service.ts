import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseURL = 'http://localhost:3000/api';
  private isLoggedInStatus: boolean = false;
  constructor(private http: HttpClient) {}

  register(userData: any): Observable<any> {
    return this.http.post(`${this.baseURL}/register`, userData);
  }

  login(userData: any): Observable<any> {
    return this.http.post(`${this.baseURL}/login`, userData);
  }

  isLoggedIn(): boolean {
    return this.isLoggedInStatus;
  }

  setIsLoggedIn(status: boolean): void {
    this.isLoggedInStatus = status;
  }
}
