import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseURL = 'http://localhost:3000/api';
  private levelSubject: BehaviorSubject<string | null> = new BehaviorSubject<
    string | null
  >(null);

  constructor(private http: HttpClient) {
    const storedLevel = localStorage.getItem('level');
    this.levelSubject = new BehaviorSubject<string | null>(storedLevel);
  }

  register(userData: any): Observable<any> {
    return this.http.post(`${this.baseURL}/register`, userData);
  }

  login(userData: any): Observable<any> {
    return this.http.post(`${this.baseURL}/login`, userData);
  }

  //  load khi vô nó hiển thị luôn

  huyit = this.levelSubject.asObservable();
  getLevel(): string | null {
    return this.levelSubject.getValue();
  }
  setLevel(level: string | null) {
    this.levelSubject.next(level);
  }
}
