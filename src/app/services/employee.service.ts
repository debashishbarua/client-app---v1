import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Employee } from '../models/employee';




@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private employeeBaseUrl: string = 'http://localhost:9090/api/v1/employees';

  constructor(private http: HttpClient) { }

  findAll(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.employeeBaseUrl);
  }

  create(employee: Employee): Observable<Employee> {
    return this.http.post<Employee>(`${this.employeeBaseUrl}`, employee);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.employeeBaseUrl}/${id}`, { responseType: 'text' });
  }

  getEmployeeById(id: number): Observable<Employee> {
    return this.http.get(`${this.employeeBaseUrl}/${id}`);
  }

  update(id: number, employee: Employee): Observable<Employee> {
    return this.http.put(`${this.employeeBaseUrl}/${id}`, employee);
  }

}
