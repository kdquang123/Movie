import { Injectable } from '@angular/core';
import { IBookingService } from './booking-service.interface';
import { Observable } from 'rxjs';
import { ApiEndpoints } from '../../constants/api-endpoint/api-endpoint';
import { HttpClient } from '@angular/common/http';
import { BookingResponseModel } from '../../models/booking/booking-response.model';
import { BookingModel } from '../../models/booking/booking.model';

@Injectable({
  providedIn: 'root',
})
export class BookingService implements IBookingService {
  constructor(private readonly httpClient: HttpClient) {}

  getMyBooking(): Observable<BookingModel[]> {
    return this.httpClient.get<BookingModel[]>(
      ApiEndpoints.getMyBooking
    );
  }

  createBooking(bookingCreateModel: any): Observable<BookingResponseModel> {
    return this.httpClient.post<BookingResponseModel>(
      ApiEndpoints.createBooking,
      bookingCreateModel
    );
  }

  getAllBookings(): Observable<BookingModel[]> {
    return this.httpClient.get<BookingModel[]>(ApiEndpoints.getAllBookings);
  }

  getCurrentMonthBookings(): Observable<BookingModel[]> {
    return this.httpClient.get<BookingModel[]>(
      ApiEndpoints.getCurrentMonthBookings
    );
  }
}
