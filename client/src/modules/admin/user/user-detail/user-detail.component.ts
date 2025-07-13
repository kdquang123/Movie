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
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-detail',
  imports: [ReactiveFormsModule, FontAwesomeModule, CommonModule, RouterLink],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.css',
})
export class UserDetailComponent implements OnInit {
  faSave = faSave;

  memberForm!: FormGroup;
  memberId!: string;

  userIsActive!: boolean;

  constructor(
    @Inject(MEMBER_SERVICE)
    private readonly memberService: IMemberService,
    private readonly toastr: ToastrService,
    private readonly route: ActivatedRoute,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.memberId = this.route.snapshot.params['id'];
    this.createForm();
    this.memberService.getMemberById(this.memberId).subscribe((res) => {
      this.userIsActive = res.isActive;
      this.memberForm.patchValue({
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
    if (this.memberForm.valid) {
      this.memberService
        .updateMember(this.memberId, this.memberForm.value)
        .subscribe({
          next: () => {
            this.router.navigate(['/admin/members']);
            this.toastr.success('Sửa thành viên thành công!', 'Thành công');
          },
          error: (error) => {
            this.toastr.error(error.error.message, 'Lỗi');
          },
        });
    } else {
      this.toastr.error('Vui lòng điền đầy đủ thông tin', 'Lỗi');
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

  onChangeStatus() {
    this.memberService.changeStatus(this.memberId).subscribe({
      next: (res) => {
        this.userIsActive = !this.userIsActive;
        this.toastr.success(
          `Thành viên ${this.userIsActive ? 'đã được kích hoạt' : 'đã bị khóa'} thành công!`,
          'Thành công'
        );
      },
      error: (error) => {
        if (error.error.message) {
          this.toastr.error(error.error.message, 'Lỗi');
        }
      },
    });
  }
}
