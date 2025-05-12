import { Injectable } from '@angular/core';
import { IBookingService } from './booking-service.interface';
import { Observable } from 'rxjs';
import { BookingCreateModel } from '../../models/booking/booking-create.model';
import { ApiEndpoints } from '../../constants/api-endpoint/api-endpoint';
import { HttpClient } from '@angular/common/http';
import { BookingResponseModel } from '../../models/booking/booking-response.model';

@Injectable({
  providedIn: 'root',
})
export class BookingService implements IBookingService {
  constructor(private readonly httpClient: HttpClient) {}
  createBooking(bookingCreateModel: any): Observable<BookingResponseModel> {
    return this.httpClient.post<BookingResponseModel>(
      ApiEndpoints.createBooking,
      bookingCreateModel
    );
  }
}
