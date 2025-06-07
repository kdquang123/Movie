import { Injectable } from '@angular/core';
import { ITicketService } from './ticket-service.interface';
import { Observable } from 'rxjs';
import { TicketDetailModel } from '../../models/ticket/ticket-detail.model';
import { TicketModel } from '../../models/ticket/ticket.model';
import { ApiEndpoints } from '../../constants/api-endpoint/api-endpoint';
import { HttpClient } from '@angular/common/http';
import { TicketOfBookingModel } from '../../models/ticket/ticket-of-booking.model';

@Injectable({
  providedIn: 'root',
})
export class TicketService implements ITicketService {
  constructor(private readonly httpClient: HttpClient) {}
  getTicketByTicketCode(ticketCode: string): Observable<TicketOfBookingModel> {
    return this.httpClient.get<TicketOfBookingModel>(
      `${ApiEndpoints.getTicketByTicketCode}/${ticketCode}`
    );
  }
  approveTicket(ticketCode: string): Observable<boolean> {
    return this.httpClient.post<boolean>(`${ApiEndpoints.approveTicket}`, {
      ticketCode: ticketCode,
    });
  }
  getByShowtimeId(showtimeId: string): Observable<TicketModel[]> {
    return this.httpClient.get<TicketModel[]>(
      `${ApiEndpoints.getTicketByShowtimeId}/${showtimeId}`
    );
  }
  getTicketByBookingId(bookingId: string): Observable<TicketDetailModel[]> {
    return this.httpClient.get<TicketDetailModel[]>(
      `${ApiEndpoints.getTicketByBookingId}/${bookingId}`
    );
  }

  getCurrentMonthTickets(): Observable<TicketModel[]> {
    return this.httpClient.get<TicketModel[]>(
      ApiEndpoints.getCurrentMonthTickets
    );
  }
}
