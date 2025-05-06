import { Injectable } from '@angular/core';
import { IRoomService } from './room-service.interface';
import { Observable } from 'rxjs';
import { RoomModel } from '../../models/room/room.model';
import { HttpClient } from '@angular/common/http';
import { ApiEndpoints } from '../../constants/api-endpoint/api-endpoint';
import { PaginatedResult } from '../../models/paginated-result.model';

@Injectable({
  providedIn: 'root',
})
export class RoomService implements IRoomService {
  constructor(private readonly httpClient: HttpClient) {}

  search(filter: any): Observable<PaginatedResult<RoomModel>> {
    return this.httpClient.post<PaginatedResult<RoomModel>>(
      ApiEndpoints.searchRoom,
      filter
    );
  }

  getAllRoom(): Observable<RoomModel[]> {
    return this.httpClient.get<RoomModel[]>(ApiEndpoints.getAllRoom);
  }

  getRoomById(id: string): Observable<RoomModel> {
    return this.httpClient.get<RoomModel>(`${ApiEndpoints.getRoomById}/${id}`);
  }

  createRoom(room: any): Observable<boolean> {
    return this.httpClient.post<boolean>(ApiEndpoints.createRoom, room);
  }

  updateRoom(id: string, room: any): Observable<boolean> {
    return this.httpClient.put<boolean>(
      `${ApiEndpoints.updateRoom}/${id}`,
      room
    );
  }

  deleteRoom(id: string): Observable<boolean> {
    return this.httpClient.delete<boolean>(`${ApiEndpoints.deleteRoom}/${id}`);
  }
}
