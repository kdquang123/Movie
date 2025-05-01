import { Observable } from 'rxjs';
import { MovieModel } from '../../models/movie/movie.model';
import { MovieDetailModel } from '../../models/movie/movie-detail.model';
import { PaginatedResult } from '../../models/paginated-result.model';

export interface IMovieService {
  getAllMovie(): Observable<MovieModel[]>;
  getMovieById(id: string): Observable<MovieDetailModel>;
  deleteMovie(id: string): Observable<boolean>;
  createMovie(movie: any): Observable<boolean>;
  updateMovie(movie: any): Observable<boolean>;
  search(filter: any): Observable<PaginatedResult<MovieModel>>;
}
