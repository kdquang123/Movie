import { Injectable } from '@angular/core';
import { IMovieReviewService } from './movie-review-service.interface';
import { Observable } from 'rxjs';
import { ReviewModel } from '../../models/review/review.model';
import { HttpClient } from '@angular/common/http';
import { ApiEndpoints } from '../../constants/api-endpoint/api-endpoint';

@Injectable({
  providedIn: 'root',
})
export class MovieReviewService implements IMovieReviewService {
  constructor(private readonly httpClient: HttpClient) {}

  getByMovieId(movieId: string): Observable<ReviewModel[]> {
    return this.httpClient.get<ReviewModel[]>(
      `${ApiEndpoints.getReviewByMovieId}/${movieId}`
    );
  }

  createReview(review: any): Observable<boolean> {
    return this.httpClient.post<boolean>(ApiEndpoints.createReview, review);
  }
}
