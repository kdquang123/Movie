import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faApple,
  faFacebook,
  faGoogle,
} from '@fortawesome/free-brands-svg-icons';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { LoginRequest } from '../../../models/auth/login-request.model';
import { Router } from '@angular/router';
import { RegisterRequest } from '../../../models/auth/register-request.model';
import { AUTH_SERVICE } from '../../../constants/injection/injection.constant';
import { IAuthService } from '../../../services/auth/auth-service.interface';

@Component({
  selector: 'app-login-and-register-modal',
  imports: [FontAwesomeModule, CommonModule, ReactiveFormsModule],
  templateUrl: './login-and-register-modal.component.html',
  styleUrl: './login-and-register-modal.component.css',
})
export class LoginAndRegisterModalComponent implements OnInit {
  faFacebook = faFacebook;
  faGoogle = faGoogle;
  faApple = faApple;
  faTimes = faTimes;

  public isModalVisible = false;
  public isLoginDisplay = true;

  @Output() public closeLoginModal = new EventEmitter<void>();

  public loginForm!: FormGroup;
  public registerForm!: FormGroup;

  constructor(
    @Inject(AUTH_SERVICE) private readonly authService: IAuthService,
    private readonly toastr: ToastrService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });

    this.registerForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
      confirmPassword: new FormControl('', [Validators.required]),
    });
  }

  openLogin() {
    this.isLoginDisplay = true;
  }

  openRegister() {
    this.isLoginDisplay = false;
  }

  onLoginSubmit() {
    const loginRequest: LoginRequest = {
      username: this.loginForm.value.email,
      password: this.loginForm.value.password,
    };
    this.authService.login(loginRequest).subscribe({
      next: (response) => {
        this.toastr.success('Đăng nhập thành công!', 'Success');
        if (
          response.userInfo.roles[0] == 'ADMIN' ||
          response.userInfo.roles[0] == 'EMPLOYEE'
        ) {
          this.router.navigate(['/admin/dashboard']);
        } else {
          this.closeLoginModal.emit();
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  onRegisterSubmit() {
    const registerRequest: RegisterRequest = {
      fullName: this.registerForm.value.name,
      email: this.registerForm.value.email,
      password: this.registerForm.value.password,
      confirmPassword: this.registerForm.value.confirmPassword,
    };
    this.authService.register(registerRequest).subscribe({
      next: (response) => {
        this.registerForm.reset();
        this.isLoginDisplay = true;
        this.toastr.success('Đăng ký thành công!', 'Success');
        if (
          response.userInfo.roles[0] == 'ADMIN' ||
          response.userInfo.roles[0] == 'EMPLOYEE'
        ) {
          this.router.navigate(['/admin/dashboard']);
        } else {
          this.loginForm.reset();
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
