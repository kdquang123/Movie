import { MemberModel } from '../member/member.model';
import { ShowtimeModel } from '../showtime/showtime.model';
import { TicketDetailModel } from '../ticket/ticket-detail.model';
import { BookingDetailModel } from './booking-detail.model';

export class BookingModel {
  id!: string;
  showTimeId!: string;
  showtime!: ShowtimeModel;
  tickets!: TicketDetailModel[];
  bookingDetails!: BookingDetailModel[];
  promotionCode!: string;
  totalPrice!: number;
  bookingStatus!: string;
  bookingCode!: string;
  createdAt!: Date;
  user?: MemberModel;
}