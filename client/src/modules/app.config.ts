import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideToastr } from 'ngx-toastr';
import { provideAnimations } from '@angular/platform-browser/animations';

import { routes } from './app.routes';
import {
  AUTH_SERVICE,
  BOOKING_SERVICE,
  COMMON_SERVICE,
  MOVIE_SERVICE,
  PRODUCT_SERVICE,
  ROOM_SERVICE,
  SEAT_HOLD_SERVICE,
  SEAT_SERVICE,
  SHOWTIME_SERVICE,
  TICKET_SERVICE,
} from '../constants/injection/injection.constant';
import { AuthService } from '../services/auth/auth.service';
import { provideHttpClient } from '@angular/common/http';
import { CommonService } from '../services/common/common.service';
import { MovieService } from '../services/movie/movie.service';
import { RoomService } from '../services/room/room.service';
import { SeatService } from '../services/seat/seat.service';
import { ShowtimeService } from '../services/showtime/showtime.service';
import { SeatHoldService } from '../services/seat-hold/seathold.service';
import { BookingService } from '../services/booking/booking.service';
import { ProductService } from '../services/product/product.service';
import { TicketService } from '../services/ticket/ticket.service';

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
    provideAnimations(),
    provideToastr(),
    provideHttpClient(),
  ],
};
