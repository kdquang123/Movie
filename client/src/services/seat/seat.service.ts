import { Injectable } from '@angular/core';
import { ISeatService } from './seat-service.interface';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ApiEndpoints } from '../../constants/api-endpoint/api-endpoint';

@Injectable({
  providedIn: 'root',
})
export class SeatService implements ISeatService {
  constructor(private readonly httpClient: HttpClient) {}

  changeSeatType(seatId: string, seatType: number): Observable<boolean> {
    return this.httpClient.post<boolean>(ApiEndpoints.changeSeatType, {
      id: seatId,
      seatType,
    });
  }
}
