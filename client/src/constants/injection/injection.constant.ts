import { InjectionToken } from '@angular/core';
import { IAuthService } from '../../services/auth/auth-service.interface';
import { ICommonService } from '../../services/common/common-service.interface';
import { IMovieService } from '../../services/movie/movie-service.interface';

export const AUTH_SERVICE = new InjectionToken<IAuthService>('AUTH_SERVICE');
export const COMMON_SERVICE = new InjectionToken<ICommonService>(
  'COMMON_SERVICE'
);
export const MOVIE_SERVICE = new InjectionToken<IMovieService>('MOVIE_SERVICE');
