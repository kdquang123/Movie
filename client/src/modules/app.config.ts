import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideToastr } from 'ngx-toastr';
import { provideAnimations } from '@angular/platform-browser/animations';

import { routes } from './app.routes';
import { AUTH_SERVICE } from '../constants/injection/injection.constant';
import { AuthService } from '../services/auth/auth.service';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    { provide: AUTH_SERVICE, useClass: AuthService },
    provideAnimations(),
    provideToastr(),
    provideHttpClient(),
  ],
};
