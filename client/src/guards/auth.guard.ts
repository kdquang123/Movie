import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { catchError, map, of, tap } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { UserInformation } from '../models/auth/user-information.model';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const toastr = inject(ToastrService);
  const router = inject(Router);
  return authService.getUserInformationFromAccessToken().pipe(
    map((user: UserInformation | null) => {
      if (user === null || user === undefined) {
        router.navigate(['/']);
        toastr.error('Bạn phải đăng nhập để truy cập trang này', 'Thông báo');
        return false;
      }
      return true;
    }),
    catchError(() => {
      router.navigate(['/']);
      toastr.error('Bạn phải đăng nhập để truy cập trang này', 'Thông báo');
      return of(false);
    })
  );
};
