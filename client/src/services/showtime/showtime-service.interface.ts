import { Observable } from 'rxjs';
import { ShowtimeModel } from '../../models/showtime/showtime.model';

export interface IShowtimeService {
  getAllShowtimes(): Observable<ShowtimeModel[]>;
  getShowtimeById(id: string): Observable<ShowtimeModel>;
  deleteShowtime(id: string): Observable<boolean>;
  createShowtime(showtime: any): Observable<boolean>;
  updateShowtime(showtime: any, id: string): Observable<boolean>;
  search(filter: any): Observable<ShowtimeModel[]>;
  getShowtimeByDate(date: Date): Observable<ShowtimeModel[]>;
  getShowtimeByMovieId(movieId: string): Observable<ShowtimeModel[]>;
}
