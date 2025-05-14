import { SeatModel } from '../seat/seat.model';

export class TicketModel {
  seatId!: string;
  seat!: SeatModel;
  bookingId!: string;
}
