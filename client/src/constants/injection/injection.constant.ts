import { InjectionToken } from '@angular/core';
import { IAuthService } from '../../services/auth/auth-service.interface';
import { ICommonService } from '../../services/common/common-service.interface';
import { IMovieService } from '../../services/movie/movie-service.interface';
import { IRoomService } from '../../services/room/room-service.interface';
import { ISeatService } from '../../services/seat/seat-service.interface';
import { IShowtimeService } from '../../services/showtime/showtime-service.interface';
import { ISeatHoldService } from '../../services/seat-hold/seathold-service.interface';
import { IBookingService } from '../../services/booking/booking-service.interface';
import { IProductService } from '../../services/product/product-service.interface';
import { ITicketService } from '../../services/ticket/ticket-service.interface';
import { IEmployeeService } from '../../services/employee/employee-service.interface';
import { IMemberService } from '../../services/member/member-service.interface';
import { IPromotionService } from '../../services/promotion/promotion-service.interface';
import { INewsService } from '../../services/news/news-service.interface';

export const AUTH_SERVICE = new InjectionToken<IAuthService>('AUTH_SERVICE');
export const COMMON_SERVICE = new InjectionToken<ICommonService>(
  'COMMON_SERVICE'
);
export const MOVIE_SERVICE = new InjectionToken<IMovieService>('MOVIE_SERVICE');
export const ROOM_SERVICE = new InjectionToken<IRoomService>('ROOM_SERVICE');
export const SEAT_SERVICE = new InjectionToken<ISeatService>('SEAT_SERVICE');
export const SHOWTIME_SERVICE = new InjectionToken<IShowtimeService>(
  'SHOWTIME_SERVICE'
);
export const SEAT_HOLD_SERVICE = new InjectionToken<ISeatHoldService>(
  'SEAT_HOLD_SERVICE'
);
export const BOOKING_SERVICE = new InjectionToken<IBookingService>(
  'BOOKING_SERVICE'
);

export const PRODUCT_SERVICE = new InjectionToken<IProductService>(
  'PRODUCT_SERVICE'
);

export const TICKET_SERVICE = new InjectionToken<ITicketService>(
  'TICKET_SERVICE'
);

export const EMPLOYEE_SERVICE = new InjectionToken<IEmployeeService>(
  'EMPLOYEE_SERVICE'
);

export const MEMBER_SERVICE = new InjectionToken<IMemberService>(
  'MEMBER_SERVICE'
);

export const PROMOTION_SERVICE = new InjectionToken<IPromotionService>(
  'PROMOTION_SERVICE'
);

export const NEWS_SERVICE = new InjectionToken<INewsService>('NEWS_SERVICE');
