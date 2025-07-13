import { BookingModel } from '../booking/booking.model';
import { SeatModel } from '../seat/seat.model';

export class TicketDetailModel {
  ticketCode!: string;
  seatId!: string;
  seat!: SeatModel;
  bookingId!: string;
  isUsed!: boolean;
  booking?:BookingModel;
}
