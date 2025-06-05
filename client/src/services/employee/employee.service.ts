import { Injectable } from '@angular/core';
import { IEmployeeService } from './employee-service.interface';
import { Observable } from 'rxjs';
import { EmployeeModel } from '../../models/employee/employee.model';
import { PaginatedResult } from '../../models/paginated-result.model';
import { HttpClient } from '@angular/common/http';
import { ApiEndpoints } from '../../constants/api-endpoint/api-endpoint';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService implements IEmployeeService {
  constructor(private readonly httpClient: HttpClient) {}
  changeStatus(userId:string): Observable<boolean> {
    return this.httpClient.post<boolean>(ApiEndpoints.changeUserStatus, {userId});
  }

  getAllEmployee(): Observable<EmployeeModel[]> {
    return this.httpClient.get<EmployeeModel[]>(ApiEndpoints.getAllEmployee);
  }

  getEmployeeById(id: string): Observable<EmployeeModel> {
    return this.httpClient.get<EmployeeModel>(
      `${ApiEndpoints.getEmployeeById}/${id}`
    );
  }

  deleteEmployee(id: string): Observable<boolean> {
    return this.httpClient.delete<boolean>(
      `${ApiEndpoints.deleteEmployee}/${id}`
    );
  }

  updateEmployee(id: string, employee: any): Observable<boolean> {
    return this.httpClient.put<boolean>(
      `${ApiEndpoints.updateEmployee}/${id}`,
      employee
    );
  }

  createEmployee(employee: any): Observable<boolean> {
    return this.httpClient.post<boolean>(ApiEndpoints.createEmployee, employee);
  }

  searchEmployee(filter: any): Observable<PaginatedResult<EmployeeModel>> {
    return this.httpClient.post<PaginatedResult<EmployeeModel>>(
      ApiEndpoints.searchEmployee,
      filter
    );
  }
}
