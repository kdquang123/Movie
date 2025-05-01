import { Injectable } from '@angular/core';
import { IMovieService } from './movie-service.interface';
import { Observable } from 'rxjs';
import { MovieDetailModel } from '../../models/movie/movie-detail.model';
import { MovieModel } from '../../models/movie/movie.model';
import { HttpClient } from '@angular/common/http';
import { ApiEndpoints } from '../../constants/api-endpoint/api-endpoint';
import { PaginatedResult } from '../../models/paginated-result.model';

@Injectable({
  providedIn: 'root',
})
export class MovieService implements IMovieService {
  constructor(private readonly httpClient: HttpClient) {}
  search(filter: any): Observable<PaginatedResult<MovieModel>> {
    throw new Error('Method not implemented.');
  }

  getAllMovie(): Observable<MovieModel[]> {
    return this.httpClient.get<MovieModel[]>(ApiEndpoints.getAllMovie);
  }

  getMovieById(id: string): Observable<MovieDetailModel> {
    return this.httpClient.get<MovieDetailModel>(
      `${ApiEndpoints.getMovieById}/${id}`
    );
  }

  deleteMovie(id: string): Observable<boolean> {
    return this.httpClient.delete<boolean>(`${ApiEndpoints.deleteMovie}/${id}`);
  }

  createMovie(movie: any): Observable<boolean> {
    return this.httpClient.post<boolean>(ApiEndpoints.createMovie, movie);
  }

  updateMovie(movie: any): Observable<boolean> {
    return this.httpClient.put<boolean>(ApiEndpoints.updateMovie, movie);
  }
}
