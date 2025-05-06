import { SeatModel } from '../seat/seat.model';
import { RoomTypeModel } from './room-type.model';

export class RoomModel {
  id!: string;
  name!: string;
  roomTypeId!: string;
  totalRows!: number;
  totalColumns!: number;
  seatQuantity?: number;
  seats?: SeatModel[];
  roomType?: RoomTypeModel;
  status?: string;
}
