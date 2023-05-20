import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  private baseURL = 'http://localhost:3000/api';
  constructor(private http: HttpClient) {}

  add(data: any) {
    return this.http.post(`${this.baseURL}/addProject`, data);
  }
  get() {
    return this.http.get(`${this.baseURL}/getProjects`);
  }
  getID(id: any) {
    return this.http.get(`${this.baseURL}/getIDProject/${id}`);
  }
  update(id: any, data: any): Observable<any> {
    return this.http.put(`${this.baseURL}/updateProject/${id}`, data);
  }
}
