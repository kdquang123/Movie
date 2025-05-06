import { Observable } from 'rxjs';
import { RoomModel } from '../../models/room/room.model';
import { PaginatedResult } from '../../models/paginated-result.model';

export interface IRoomService {
  getAllRoom(): Observable<RoomModel[]>;
  getRoomById(id: string): Observable<RoomModel>;
  createRoom(room: any): Observable<boolean>;
  updateRoom(id: string, room: any): Observable<boolean>;
  deleteRoom(id: string): Observable<boolean>;
  search(filter: any): Observable<PaginatedResult<RoomModel>>;
}
