import { Injectable } from '@angular/core';
import { IAuthService } from './auth-service.interface';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { ForgotPasswordRequest } from '../../models/auth/forgot-password-request.model';
import { LoginRequest } from '../../models/auth/login-request.model';
import { LoginResponse } from '../../models/auth/login-response.model';
import { ResetPasswordRequest } from '../../models/auth/reset-password-request.model';
import { UserInformation } from '../../models/auth/user-information.model';
import { HttpClient } from '@angular/common/http';
import { ApiEndpoints } from '../../constants/api-endpoint/api-endpoint';
import { RegisterRequest } from '../../models/auth/register-request.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService implements IAuthService {
  private readonly _isAuthenticated: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);

  private readonly _isAuthenticated$: Observable<boolean> =
    this._isAuthenticated.asObservable();

  private readonly _userInformation: BehaviorSubject<UserInformation | null> =
    new BehaviorSubject<UserInformation | null>(null);

  private readonly _userInformation$: Observable<UserInformation | null> =
    this._userInformation.asObservable();

  constructor(private readonly httpClient: HttpClient) {
    const lsToken = localStorage.getItem('accessToken');

    if (lsToken) {
      this._isAuthenticated.next(true);
      const userInformation = localStorage.getItem('userInformation');
      if (userInformation) {
        this._userInformation.next(JSON.parse(userInformation));
      }
    }
  }

  register(registerRequest: RegisterRequest): Observable<LoginResponse> {
    return this.httpClient
      .post<LoginResponse>(ApiEndpoints.register, registerRequest)
      .pipe(
        tap((response: LoginResponse) => {
          localStorage.setItem('accessToken', response.accessToken);
          localStorage.setItem('refreshToken', response.refreshToken);
          localStorage.setItem(
            'userInformation',
            JSON.stringify(response.userInfo)
          );

          this._isAuthenticated.next(true);
          this._userInformation.next(response.userInfo);
        })
      );
  }

  getAccessToken(): string {
    return (
      localStorage.getItem('accessToken') ??
      sessionStorage.getItem('accessToken') ??
      ''
    );
  }

  getRefreshToken(): string {
    return (
      localStorage.getItem('refreshToken') ??
      sessionStorage.getItem('refreshToken') ??
      ''
    );
  }

  public isAuthenticated(): Observable<boolean> {
    return this._isAuthenticated$;
  }

  public getUserInformation(): Observable<UserInformation | null> {
    return this._userInformation$;
  }

  public getUserInformationFromAccessToken(): Observable<UserInformation | null> {
    // Using JWT to decode the access token and get the user information
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      const payload = JSON.parse(atob(accessToken.split('.')[1]));
      const rawRoles =
        payload['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
      const roles = Array.isArray(rawRoles) ? rawRoles : [rawRoles];
      const userInformation: UserInformation = {
        id: payload.nameid,
        email: payload.email,
        fullName: payload.fullName,
        username: payload.unique_name,
        roles: roles,
      };
      this._userInformation.next(userInformation);
    }
    return this._userInformation$;
  }

  logout(): void {
    window.location.reload();
    this.httpClient.post<boolean>(ApiEndpoints.logout, {
      refreshToken: this.getRefreshToken(),
    });
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('userInformation');
    this._isAuthenticated.next(false);
    this._userInformation.next(null);
  }

  public login(loginRequest: LoginRequest): Observable<LoginResponse> {
    return this.httpClient
      .post<LoginResponse>(ApiEndpoints.login, loginRequest)
      .pipe(
        tap((response: LoginResponse) => {
          localStorage.setItem('accessToken', response.accessToken);
          localStorage.setItem('refreshToken', response.refreshToken);
          localStorage.setItem(
            'userInformation',
            JSON.stringify(response.userInfo)
          );

          this._isAuthenticated.next(true);
          this._userInformation.next(response.userInfo);
        })
      );
  }

  public forgotPassword(
    forgotPasswordRequest: ForgotPasswordRequest
  ): Observable<any> {
    console.log(forgotPasswordRequest);
    return this.httpClient.post(
      ApiEndpoints.forgotPassword,
      forgotPasswordRequest
    );
  }

  resetPassword(
    resetPasswordRequest: ResetPasswordRequest
  ): Observable<boolean> {
    return this.httpClient.post<boolean>(
      ApiEndpoints.resetPassword,
      resetPasswordRequest
    );
  }

  public getUserRoles(): string[] {
    const userInfo: UserInformation | null = this._userInformation.getValue();
    if (userInfo?.roles) {
      return Array.isArray(userInfo.roles) ? userInfo.roles : [userInfo.roles];
    }
    return [];
  }

  public hasRole(allowedRoles: string[]): boolean {
    const roles = this.getUserRoles();
    return allowedRoles.some((role) => roles.includes(role));
  }
}
