import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  private baseURL = 'https://localhost:2003/api';
  constructor(private http: HttpClient) {}

  add(data: any) {
    return this.http.post(`${this.baseURL}/addProject`, data);
  }
}
