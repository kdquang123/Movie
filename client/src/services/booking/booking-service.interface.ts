import { Observable } from 'rxjs';
import { BookingResponseModel } from '../../models/booking/booking-response.model';
import { BookingModel } from '../../models/booking/booking.model';
import { PaginatedResult } from '../../models/paginated-result.model';

export interface IBookingService {
  createBooking(bookingCreateModel: any): Observable<BookingResponseModel>;
  getMyBooking(): Observable<BookingModel[]>;
  getAllBookings(): Observable<BookingModel[]>;
  getCurrentMonthBookings(): Observable<BookingModel[]>;
  search(filter: any): Observable<PaginatedResult<BookingModel>>;
}
