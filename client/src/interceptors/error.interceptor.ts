import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { catchError, switchMap, throwError } from 'rxjs';
import { AuthService } from '../services/auth/auth.service';
import { Router } from '@angular/router';
import { LoginResponse } from '../models/auth/login-response.model';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const toastr = inject(ToastrService);
  const authService = inject(AuthService);
  const token = authService.getAccessToken();
  const router = inject(Router);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      switch (error.status) {
        case 400:
          console.log('Bad Request:', error);
          if (error.error.errors) {
            toastr.error(
              error.error.errors[Object.keys(error.error.errors)[0]][0],
              'Lỗi'
            );
          }
          break;
        case 401:
          if (
            error.status === 401 &&
            error.headers.get('WWW-Authenticate')?.includes('invalid_token')
          ) {
            // Gọi refresh token (trả về Observable<string>)
            return authService.refreshToken().pipe(
              switchMap((response: LoginResponse) => {
                const retryReq = req.clone({
                  setHeaders: {
                    Authorization: `Bearer ${response.accessToken}`,
                  },
                });
                return next(retryReq);
              }),
              catchError((refreshError) => {
                // Nếu refresh token thất bại -> logout, chuyển về trang chủ
                authService.logout();
                router.navigate(['/']);
                return throwError(() => refreshError);
              })
            );
          } else {
            const errorMessage =
              error.error?.message ?? 'Lỗi không mong muốn xảy ra.';
            toastr.error(errorMessage, `Lỗi ${error.status}`);
          }
          break;
        default: {
          const errorMessage =
            error.error?.message ?? 'Lỗi không mong muốn xảy ra.';
          toastr.error(errorMessage, `Lỗi ${error.status}`);
          break;
        }
      }
      return throwError(() => error);
    })
  );
};
