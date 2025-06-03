import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faSave } from '@fortawesome/free-solid-svg-icons';
import { EMPLOYEE_SERVICE } from '../../../../constants/injection/injection.constant';
import { IEmployeeService } from '../../../../services/employee/employee-service.interface';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-employee-detail',
  imports: [ReactiveFormsModule, FontAwesomeModule, CommonModule],
  templateUrl: './employee-detail.component.html',
  styleUrl: './employee-detail.component.css',
})
export class EmployeeDetailComponent implements OnInit {
  faSave = faSave;

  employeeForm!: FormGroup;
  employeeId!: string;

  constructor(
    @Inject(EMPLOYEE_SERVICE)
    private readonly employeeService: IEmployeeService,
    private readonly toastr: ToastrService,
    private readonly route: ActivatedRoute,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.employeeId = this.route.snapshot.params['id'];
    this.createForm();
    this.employeeService.getEmployeeById(this.employeeId).subscribe((res) => {
      this.employeeForm.patchValue({
        fullName: res.fullName,
        dateOfBirth: res.dateOfBirth
          ? new Date(new Date(res.dateOfBirth).getTime() + 7 * 60 * 60 * 1000)
              .toISOString()
              .split('T')[0]
          : '',
        gender: res.gender === true ? 1 : res.gender === false ? 0 : -1,
        address: res.address,
        email: res.email,
        phoneNumber: res.phoneNumber,
      });
    });
  }

  createForm() {
    this.employeeForm = new FormGroup({
      fullName: new FormControl('', Validators.required),
      dateOfBirth: new FormControl('', Validators.required),
      gender: new FormControl(1, Validators.required),
      address: new FormControl(''),
      email: new FormControl('', Validators.required),
      phoneNumber: new FormControl(''),
    });
  }

  onSubmit() {
    if (this.employeeForm.valid) {
      this.employeeService
        .updateEmployee(this.employeeId, this.employeeForm.value)
        .subscribe({
          next: () => {
            this.router.navigate(['/admin/employees']);
            this.toastr.success('Sửa nhân viên thành công!', 'Thành công');
          },
          error: (error) => {
            this.toastr.error(error.error.message, 'Lỗi');
          },
        });
    } else {
      this.toastr.error('Vui lòng điền đầy đủ thông tin!', 'Lỗi');
    }
  }

  private formatDate(dateValue: string): string {
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
