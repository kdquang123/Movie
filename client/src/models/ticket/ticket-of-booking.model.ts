import { BookingModel } from '../booking/booking.model';
import { SeatModel } from '../seat/seat.model';

export class TicketOfBookingModel {
  ticketCode!: string;
  seatId!: string;
  seat!: SeatModel;
  bookingId!: string;
  booking!: BookingModel;
  isUsed!: boolean;
}
