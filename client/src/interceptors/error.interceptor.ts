import {
  HttpErrorResponse,
  HttpInterceptorFn,
  HttpResponse,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { catchError, of } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const toastr = inject(ToastrService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      switch (error.status) {
        case 400:
          toastr.error(
            error.error.errors[Object.keys(error.error.errors)[0]][0],
            'Lỗi'
          );
          break;
        default: {
          const errorMessage =
            error.error?.message ?? 'Lỗi không mong muốn xảy ra.';
          toastr.error(errorMessage, `Lỗi ${error.status}`);
          break;
        }
      }
      return of(new HttpResponse({ body: null }));
    })
  );
};
