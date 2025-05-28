import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { map, tap } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const toastr = inject(ToastrService);
  const router = inject(Router);
  return authService.isAuthenticated().pipe(
    map((isAuthenticated: boolean) => isAuthenticated),
    tap((isAuthenticated) => {
      if (!isAuthenticated) {
        router.navigate(['/']);
        toastr.error('Bạn phải đăng nhập để truy cập trang này', 'Thông báo');
      }
    })
  );
};
