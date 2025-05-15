import { Observable } from 'rxjs';
import { EmployeeModel } from '../../models/employee/employee.model';
import { PaginatedResult } from '../../models/paginated-result.model';

export interface IEmployeeService {
  getAllEmployee(): Observable<EmployeeModel[]>;
  getEmployeeById(id: string): Observable<EmployeeModel>;
  deleteEmployee(id: string): Observable<boolean>;
  updateEmployee(id: string, employee: any): Observable<boolean>;
  createEmployee(employee: any): Observable<boolean>;
  searchEmployee(filter: any): Observable<PaginatedResult<EmployeeModel>>;
}
