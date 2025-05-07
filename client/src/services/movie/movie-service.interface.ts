import { Observable } from 'rxjs';
import { MovieModel } from '../../models/movie/movie.model';
import { PaginatedResult } from '../../models/paginated-result.model';

export interface IMovieService {
  getAllMovie(): Observable<MovieModel[]>;
  getMovieById(id: string): Observable<MovieModel>;
  deleteMovie(id: string): Observable<boolean>;
  createMovie(movie: any): Observable<boolean>;
  updateMovie(movie: any, id: string): Observable<boolean>;
  search(filter: any): Observable<PaginatedResult<MovieModel>>;
  getCommingSoonMovies(): Observable<MovieModel[]>;
  getNowPlayingMovies(): Observable<MovieModel[]>;
  getAllAvailableMovie(): Observable<MovieModel[]>;
}
