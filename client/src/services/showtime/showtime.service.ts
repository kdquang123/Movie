import { Injectable } from '@angular/core';
import { IShowtimeService } from './showtime-service.interface';
import { Observable } from 'rxjs';
import { ShowtimeModel } from '../../models/showtime/showtime.model';
import { HttpClient } from '@angular/common/http';
import { ApiEndpoints } from '../../constants/api-endpoint/api-endpoint';
import { PaginatedResult } from '../../models/paginated-result.model';

@Injectable({
  providedIn: 'root',
})
export class ShowtimeService implements IShowtimeService {
  constructor(private readonly httpClient: HttpClient) {}

  getShowtimeByDate(date: Date): Observable<ShowtimeModel[]> {
    return this.httpClient.post<ShowtimeModel[]>(
      ApiEndpoints.getShowtimeByDate,
      { startDate: date }
    );
  }

  getShowtimeByMovieId(movieId: string): Observable<ShowtimeModel[]> {
    return this.httpClient.get<ShowtimeModel[]>(
      `${ApiEndpoints.getShowtimeByMovieId}/${movieId}`
    );
  }

  getAllShowtimes(): Observable<ShowtimeModel[]> {
    return this.httpClient.get<ShowtimeModel[]>(ApiEndpoints.getAllShowtime);
  }

  getShowtimeById(id: string): Observable<ShowtimeModel> {
    return this.httpClient.get<ShowtimeModel>(
      `${ApiEndpoints.getShowtimeById}/${id}`
    );
  }

  deleteShowtime(id: string): Observable<boolean> {
    return this.httpClient.delete<boolean>(
      `${ApiEndpoints.deleteShowtime}/${id}`
    );
  }

  createShowtime(showtime: any): Observable<boolean> {
    return this.httpClient.post<boolean>(ApiEndpoints.createShowtime, showtime);
  }

  updateShowtime(showtime: any, id: string): Observable<boolean> {
    return this.httpClient.put<boolean>(
      `${ApiEndpoints.updateShowtime}/${id}`,
      showtime
    );
  }

  search(filter: any): Observable<PaginatedResult<ShowtimeModel>> {
    return this.httpClient.post<PaginatedResult<ShowtimeModel>>(
      ApiEndpoints.searchShowtime,
      filter
    );
  }
}
