import { Observable } from 'rxjs';
import { TicketModel } from '../../models/ticket/ticket.model';
import { TicketDetailModel } from '../../models/ticket/ticket-detail.model';
import { TicketOfBookingModel } from '../../models/ticket/ticket-of-booking.model';

export interface ITicketService {
  getByShowtimeId(showtimeId: string): Observable<TicketModel[]>;
  getTicketByBookingId(bookingId: string): Observable<TicketDetailModel[]>;
  getTicketByTicketCode(ticketCode: string): Observable<TicketOfBookingModel>;
  approveTicket(ticketCode: string): Observable<boolean>;
}
