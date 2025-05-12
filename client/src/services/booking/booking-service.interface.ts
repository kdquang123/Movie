import { Observable } from 'rxjs';
import { BookingResponseModel } from '../../models/booking/booking-response.model';

export interface IBookingService {
  createBooking(bookingCreateModel: any): Observable<BookingResponseModel>;
}
