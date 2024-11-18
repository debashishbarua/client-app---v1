import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Department } from '../models/department';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  private departmentBaseUrl: string = 'http://localhost:9090/api/v1/departments';

  constructor(private http: HttpClient) { }

  findAll(): Observable<Department[]> {
    return this.http.get<Department[]>(this.departmentBaseUrl);
  }

  create(department: Department): Observable<Department> {
    return this.http.post<Department>(`${this.departmentBaseUrl}`, department);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.departmentBaseUrl}/${id}`, { responseType: 'text' });
  }

  getDepartmentById(id: number): Observable<Department> {
    return this.http.get(`${this.departmentBaseUrl}/${id}`);
  }

  update(id: number, department: Department): Observable<Department> {
    return this.http.post(`${this.departmentBaseUrl}/${id}`, department);
  }
}
