import { Observable } from 'rxjs';
import { BookingResponseModel } from '../../models/booking/booking-response.model';
import { BookingModel } from '../../models/booking/booking.model';

export interface IBookingService {
  createBooking(bookingCreateModel: any): Observable<BookingResponseModel>;
  getBookingByUserId(userId: string): Observable<BookingModel[]>;
  getAllBookings(): Observable<BookingModel[]>;
  getCurrentMonthBookings(): Observable<BookingModel[]>;
}
