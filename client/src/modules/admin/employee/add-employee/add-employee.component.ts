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
import { IEmployeeService } from '../../../../services/employee/employee-service.interface';
import { EMPLOYEE_SERVICE } from '../../../../constants/injection/injection.constant';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-employee',
  imports: [ReactiveFormsModule, FontAwesomeModule, CommonModule],
  templateUrl: './add-employee.component.html',
  styleUrl: './add-employee.component.css',
})
export class AddEmployeeComponent implements OnInit {
  faSave = faSave;

  employeeForm!: FormGroup;

  constructor(
    @Inject(EMPLOYEE_SERVICE)
    private readonly employeeService: IEmployeeService,
    private readonly toastr: ToastrService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.createForm();
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
    this.employeeService.createEmployee(this.employeeForm.value).subscribe({
      next: () => {
        this.router.navigate(['/admin/employees']);
        this.toastr.success('Thêm nhân viên thành công!', 'Success');
      },
      error: (error) => {
        this.toastr.error(error.error.message, 'Error');
      },
    });
  }
}
