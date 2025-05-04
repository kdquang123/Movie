import { Injectable } from '@angular/core';
import { IMovieService } from './movie-service.interface';
import { Observable } from 'rxjs';
import { MovieModel } from '../../models/movie/movie.model';
import { HttpClient } from '@angular/common/http';
import { ApiEndpoints } from '../../constants/api-endpoint/api-endpoint';
import { PaginatedResult } from '../../models/paginated-result.model';

@Injectable({
  providedIn: 'root',
})
export class MovieService implements IMovieService {
  constructor(private readonly httpClient: HttpClient) {}
  getCommingSoonMovies(): Observable<MovieModel[]> {
    return this.httpClient.get<MovieModel[]>(ApiEndpoints.getCommingSoonMovies);
  }
  getNowPlayingMovies(): Observable<MovieModel[]> {
    return this.httpClient.get<MovieModel[]>(ApiEndpoints.getNowPlayingMovies);
  }
  search(filter: any): Observable<PaginatedResult<MovieModel>> {
    return this.httpClient.post<PaginatedResult<MovieModel>>(
      ApiEndpoints.searchMovie,
      filter
    );
  }

  getAllMovie(): Observable<MovieModel[]> {
    return this.httpClient.get<MovieModel[]>(ApiEndpoints.getAllMovie);
  }

  getMovieById(id: string): Observable<MovieModel> {
    return this.httpClient.get<MovieModel>(
      `${ApiEndpoints.getMovieById}/${id}`
    );
  }

  deleteMovie(id: string): Observable<boolean> {
    return this.httpClient.delete<boolean>(`${ApiEndpoints.deleteMovie}/${id}`);
  }

  createMovie(movie: any): Observable<boolean> {
    return this.httpClient.post<boolean>(ApiEndpoints.createMovie, movie);
  }

  updateMovie(movie: any, id: string): Observable<boolean> {
    return this.httpClient.put<boolean>(
      `${ApiEndpoints.updateMovie}/${id}`,
      movie
    );
  }
}
