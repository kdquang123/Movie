import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { UserInformation } from '../models/auth/user-information.model';
import { map } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

export const adminRoleGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const toastr = inject(ToastrService);
  return authService.getUserInformation().pipe(
    map((user: UserInformation | null) => {
      if (user?.roles[0] !== 'ADMIN') {
        router.navigate(['/admin/dashboard']);
        toastr.error('Bạn không có quyền truy cập trang này', 'Thông báo');
        return false;
      }
      return true;
    })
  );
};
