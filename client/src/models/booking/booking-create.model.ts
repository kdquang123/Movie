import { ProductModel } from '../product/product.model';
import { SeatModel } from '../seat/seat.model';
import { ShowtimeModel } from '../showtime/showtime.model';

export class BookingCreateModel {
  userId!: string;
  showtime!: ShowtimeModel;
  seatList!: SeatModel[];
  productList!: ProductModel[];
  paymentMethod!: string;
  promotionCode!: string;
}
