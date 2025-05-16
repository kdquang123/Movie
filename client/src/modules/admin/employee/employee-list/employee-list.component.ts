import { Component, Inject } from '@angular/core';
import { MasterDataComponent } from '../../master-data/master-data.component';
import { EmployeeModel } from '../../../../models/employee/employee.model';
import { TableComponent } from '../../../shared/common/table/table.component';
import { Router, RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TableColumn } from '../../../shared/common/table/table-column.model';
import { EMPLOYEE_SERVICE } from '../../../../constants/injection/injection.constant';
import { IEmployeeService } from '../../../../services/employee/employee-service.interface';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-employee-list',
  imports: [TableComponent, RouterLink, FontAwesomeModule, ReactiveFormsModule],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.css',
})
export class EmployeeListComponent extends MasterDataComponent<EmployeeModel> {
  constructor(
    @Inject(EMPLOYEE_SERVICE)
    private readonly employeeService: IEmployeeService,
    private readonly toastr: ToastrService,
    private readonly router: Router
  ) {
    super();
  }
  public override columns: TableColumn[] = [
    { name: 'Họ tên', value: 'fullName' },
    { name: 'Email', value: 'email' },
    {
      name: 'Ngày sinh',
      value: 'dateOfBirth',
      formatter: this.formatDate.bind(this),
    },
    {
      name: 'Giới tính',
      value: 'gender',
      formatter: (e: EmployeeModel) =>
        e.gender === true ? 'Nam' : e.gender === false ? 'Nữ' : 'Khác',
    },
    {
      name: 'Trạng thái',
      value: 'isActive',
      formatter: (e: EmployeeModel) =>
        e.isActive ? 'Hoạt động' : 'Ngừng hoạt động',
    },
  ];

  override ngOnInit(): void {
    this.createForm();
    this.searchData();
  }

  protected override searchData(): void {
    this.employeeService.searchEmployee(this.filter).subscribe((res) => {
      this.data = res;
    });
  }

  protected override createForm(): void {
    this.searchForm = new FormGroup({
      keyword: new FormControl(''),
      status: new FormControl(''),
    });
  }

  delete(id: string): void {
    this.employeeService.deleteEmployee(id).subscribe({
      next: () => {
        this.toastr.success('Xóa nhân viên thành công!', 'Thông báo');
        this.searchData();
      },
      error: () => {
        this.toastr.error('Xóa nhân viên thất bại!', 'Thông báo');
      },
    });
  }

  detail(id: string): void {
    this.router.navigate(['/admin/employees', id, 'detail']);
  }

  private formatDate(employee: EmployeeModel, column: TableColumn): string {
    const dateValue = employee[column.value as keyof EmployeeModel];
    if (dateValue) {
      const formatter = new Intl.DateTimeFormat('vi-VN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      });
      const date = new Date(dateValue as string);
      return formatter.format(date);
    }
    return 'Invalid Date';
  }
}
