import { InjectionToken } from '@angular/core';
import { IAuthService } from '../../services/auth/auth-service.interface';
import { ICommonService } from '../../services/common/common-service.interface';
import { IMovieService } from '../../services/movie/movie-service.interface';
import { IRoomService } from '../../services/room/room-service.interface';
import { ISeatService } from '../../services/seat/seat-service.interface';

export const AUTH_SERVICE = new InjectionToken<IAuthService>('AUTH_SERVICE');
export const COMMON_SERVICE = new InjectionToken<ICommonService>(
  'COMMON_SERVICE'
);
export const MOVIE_SERVICE = new InjectionToken<IMovieService>('MOVIE_SERVICE');
export const ROOM_SERVICE = new InjectionToken<IRoomService>('ROOM_SERVICE');
export const SEAT_SERVICE = new InjectionToken<ISeatService>('SEAT_SERVICE');
