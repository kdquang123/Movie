import { Observable } from 'rxjs';
import { BookingCreateModel } from '../../models/booking/booking-create.model';

export interface IBookingService {
  createBooking(bookingCreateModel: any): Observable<string>;
}
