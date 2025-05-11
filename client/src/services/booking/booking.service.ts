import { Injectable } from '@angular/core';
import { IBookingService } from './booking-service.interface';
import { Observable } from 'rxjs';
import { BookingCreateModel } from '../../models/booking/booking-create.model';
import { ApiEndpoints } from '../../constants/api-endpoint/api-endpoint';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class BookingService implements IBookingService {
  constructor(private readonly httpClient: HttpClient) {}
  createBooking(bookingCreateModel: any): Observable<string> {
    return this.httpClient.post<string>(
      ApiEndpoints.createBooking,
      bookingCreateModel
    );
  }
}
