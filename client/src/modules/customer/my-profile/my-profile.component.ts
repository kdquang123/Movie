import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faEye,
  faKey,
  faSave,
  faUserCircle,
} from '@fortawesome/free-solid-svg-icons';
import {
  AUTH_SERVICE,
  PROFILE_SERVICE,
} from '../../../constants/injection/injection.constant';
import { ToastrService } from 'ngx-toastr';
import { IAuthService } from '../../../services/auth/auth-service.interface';
import { IProfileService } from '../../../services/profile/profile-service.interface';

@Component({
  selector: 'app-my-profile',
  imports: [ReactiveFormsModule, FontAwesomeModule, CommonModule],
  templateUrl: './my-profile.component.html',
  styleUrl: './my-profile.component.css',
})
export class MyProfileComponent implements OnInit {
  faSave = faSave;
  faUserCircle = faUserCircle;
  faEye = faEye;
  faKey = faKey;

  userForm!: FormGroup;
  userId!: string;

  isChangePasswordVisible = false;

  changePasswordForm!: FormGroup;

  isShowOldPassword = false;
  isShowNewPassword = false;
  isShowConfirmPassword = false;

  constructor(
    @Inject(AUTH_SERVICE)
    private readonly authService: IAuthService,
    @Inject(PROFILE_SERVICE)
    private readonly profileService: IProfileService,
    private readonly toastr: ToastrService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.authService.getUserInformation().subscribe((userInfo) => {
      this.userId = userInfo!.id;
      this.profileService.getProfile().subscribe((profile) => {
        this.userForm.patchValue({
          fullName: profile.fullName,
          dateOfBirth: profile.dateOfBirth
            ? new Date(
                new Date(profile.dateOfBirth).getTime() + 7 * 60 * 60 * 1000
              )
                .toISOString()
                .split('T')[0]
            : '',
          gender:
            profile.gender === true ? 1 : profile.gender === false ? 0 : -1,
          address: profile.address,
          phoneNumber: profile.phoneNumber,
        });
      });
    });
    this.createForm();
  }

  createForm() {
    this.userForm = new FormGroup({
      fullName: new FormControl('', Validators.required),
      dateOfBirth: new FormControl('', Validators.required),
      gender: new FormControl(1, Validators.required),
      address: new FormControl(''),
      phoneNumber: new FormControl(''),
    });
    this.changePasswordForm = new FormGroup({
      oldPassword: new FormControl('', Validators.required),
      newPassword: new FormControl('', Validators.required),
      confirmPassword: new FormControl('', Validators.required),
    });
  }

  onUpdateProfile() {
    if (this.userForm.valid) {
      this.profileService.updateProfile(this.userForm.value).subscribe({
        next: () => {
          this.toastr.success('Cập nhật thông tin thành công!', 'Thành công');
          this.router.navigate(['my-profile']);
        },
        error: (error) => {
          this.toastr.error(error.error.message, 'Lỗi');
        },
      });
    } else {
      this.toastr.error('Vui lòng điền đầy đủ thông tin', 'Lỗi');
    }
  }

  onChangePassword() {
    if (this.changePasswordForm.valid) {
      this.authService.changePassword(this.changePasswordForm.value).subscribe({
        next: () => {
          this.toastr.success('Đổi mật khẩu thành công!', 'Thành công');
          this.isChangePasswordVisible = false;
          this.changePasswordForm.reset();
        },
        error: (error) => {
          if (error.error.message) {
            this.toastr.error(error.error.message, 'Lỗi');
          }
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
}
