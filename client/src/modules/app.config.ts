import {
  ApplicationConfig,
  importProvidersFrom,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideToastr } from 'ngx-toastr';
import { provideAnimations } from '@angular/platform-browser/animations';
import { NgxSpinnerModule } from 'ngx-spinner';

import { routes } from './app.routes';
import {
  AUTH_SERVICE,
  BOOKING_SERVICE,
  COMMON_SERVICE,
  EMPLOYEE_SERVICE,
  MEMBER_SERVICE,
  MOVIE_SERVICE,
  NEWS_SERVICE,
  PRODUCT_SERVICE,
  PROMOTION_SERVICE,
  ROOM_SERVICE,
  SEAT_HOLD_SERVICE,
  SEAT_SERVICE,
  SHOWTIME_SERVICE,
  TICKET_SERVICE,
} from '../constants/injection/injection.constant';
import { AuthService } from '../services/auth/auth.service';
import {
  HTTP_INTERCEPTORS,
  provideHttpClient,
  withInterceptors,
} from '@angular/common/http';
import { CommonService } from '../services/common/common.service';
import { MovieService } from '../services/movie/movie.service';
import { RoomService } from '../services/room/room.service';
import { SeatService } from '../services/seat/seat.service';
import { ShowtimeService } from '../services/showtime/showtime.service';
import { SeatHoldService } from '../services/seat-hold/seathold.service';
import { BookingService } from '../services/booking/booking.service';
import { ProductService } from '../services/product/product.service';
import { TicketService } from '../services/ticket/ticket.service';
import { EmployeeService } from '../services/employee/employee.service';
import { MemberService } from '../services/member/member.service';
import { PromotionService } from '../services/promotion/promotion.service';
import { NewsService } from '../services/news/news.service';
import { loadingInterceptor } from '../interceptors/loading.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    { provide: AUTH_SERVICE, useClass: AuthService },
    { provide: COMMON_SERVICE, useClass: CommonService },
    { provide: MOVIE_SERVICE, useClass: MovieService },
    { provide: ROOM_SERVICE, useClass: RoomService },
    { provide: SEAT_SERVICE, useClass: SeatService },
    { provide: SHOWTIME_SERVICE, useClass: ShowtimeService },
    { provide: SEAT_HOLD_SERVICE, useClass: SeatHoldService },
    { provide: BOOKING_SERVICE, useClass: BookingService },
    { provide: PRODUCT_SERVICE, useClass: ProductService },
    { provide: TICKET_SERVICE, useClass: TicketService },
    { provide: EMPLOYEE_SERVICE, useClass: EmployeeService },
    { provide: MEMBER_SERVICE, useClass: MemberService },
    { provide: PROMOTION_SERVICE, useClass: PromotionService },
    { provide: NEWS_SERVICE, useClass: NewsService },
    provideAnimations(),
    provideToastr(),
    provideHttpClient(withInterceptors([loadingInterceptor])),
  ],
};
