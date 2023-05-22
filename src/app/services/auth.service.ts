import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseURL = 'http://localhost:3000/api';
  private levelSubject: Subject<string | null> = new Subject<string | null>();

  constructor(private http: HttpClient) {}

  register(userData: any): Observable<any> {
    return this.http.post(`${this.baseURL}/register`, userData);
  }

  login(userData: any): Observable<any> {
    return this.http.post(`${this.baseURL}/login`, userData);
  }

  // load khi vô nó hiển thị luôn

  huyit = this.levelSubject.asObservable();

  setLevel(level: string | null) {
    this.levelSubject.next(level);
  }
}
