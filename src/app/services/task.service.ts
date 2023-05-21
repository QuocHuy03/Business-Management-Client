import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private baseURL = 'http://localhost:3000/api';
  constructor(private http: HttpClient) {}

  add(data: any): Observable<any> {
    return this.http.post(`${this.baseURL}/addTask`, data);
  }

  get() {
    return this.http.get(`${this.baseURL}/getTasks`);
  }

  getID(id: any) {
    return this.http.get(`${this.baseURL}/getIDTask/${id}`);
  }

  update(id: any, data: any): Observable<any> {
    return this.http.put(`${this.baseURL}/updateTask/${id}`, data);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${this.baseURL}/deleteTask/${id}`);
  }
}
