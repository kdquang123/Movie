import { Component, Inject, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { faSave } from '@fortawesome/free-solid-svg-icons';
import { MEMBER_SERVICE } from '../../../../constants/injection/injection.constant';
import { IMemberService } from '../../../../services/member/member-service.interface';
import { ToastrService } from 'ngx-toastr';
import { Router, RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-user',
  imports: [ReactiveFormsModule, FontAwesomeModule, CommonModule, RouterLink],
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.css',
})
export class AddUserComponent implements OnInit {
  faSave = faSave;

  memberForm!: FormGroup;

  constructor(
    @Inject(MEMBER_SERVICE)
    private readonly memberService: IMemberService,
    private readonly toastr: ToastrService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.memberForm = new FormGroup({
      fullName: new FormControl('', Validators.required),
      dateOfBirth: new FormControl('', Validators.required),
      gender: new FormControl(1, Validators.required),
      address: new FormControl(''),
      email: new FormControl('', Validators.required),
      phoneNumber: new FormControl(''),
    });
  }

  onSubmit() {
    this.memberService.createMember(this.memberForm.value).subscribe({
      next: () => {
        this.router.navigate(['/admin/users']);
        this.toastr.success('Thêm thành viên thành công!', 'Success');
      },
      error: (error) => {
        this.toastr.error(error.error.message, 'Error');
      },
    });
  }
}
