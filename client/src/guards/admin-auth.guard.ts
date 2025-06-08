import { inject } from '@angular/core';
import { CanMatchFn, Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { UserInformation } from '../models/auth/user-information.model';
import { catchError, map, of } from 'rxjs';

export const adminAuthGuard: CanMatchFn = (route, segments) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  return authService.getUserInformationFromAccessToken().pipe(
    map((user: UserInformation | null) => {
      if (user === null || user === undefined) {
        router.navigate(['/']);
        return false;
      }
      if (user.roles[0] !== 'ADMIN' && user.roles[0] !== 'EMPLOYEE') {
        router.navigate(['/']);
        return false;
      }
      return true;
    }),
    catchError(() => {
      router.navigate(['/']);
      return of(false);
    })
  );
};
