import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';  
import { HttpHeaders } from '@angular/common/http';  
import { Observable } from 'rxjs';  
import { Employee } from './employee';  

@Injectable({
  providedIn: 'root'
})

export class EmployeeService {  
   private url: string = 'http://localhost:59198/Api/EmployeeAPI';

  constructor(private http: HttpClient) { }  

  getAllEmployee(): Observable<Employee[]> { 
    return this.http.get<Employee[]>(this.url + '/GetEmployeeDetails');  
  }

  getEmployeeById(EmpId: string): Observable<Employee> {  
    return this.http.get<Employee>(this.url + '/GetEmaployeeById/' + EmpId);  
  } 

  createEmployee(employee: Employee): Observable<Employee> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };  
    return this.http.post<Employee>(this.url + '/InsertEmployeeDetails/', employee, httpOptions);  
  }  

  updateEmployee(employee: Employee): Observable<Employee> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };  
    return this.http.put<Employee>(this.url + '/UpdateEmployeeDetails/', employee, httpOptions);  
  }  

  deleteEmployeeById(EmpId: string): Observable<number> {  
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };  
    return this.http.delete<number>(this.url + '/DeleteEmployeeDetailsById?id=' +EmpId, httpOptions);  
  }  

  public downloadImage(image: string): Observable < Blob > {  
    return this.http.get(this.url + '/GetImage?image=' + image, {  
        responseType: 'blob',
    });  
  }
  
}  