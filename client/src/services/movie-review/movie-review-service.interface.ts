import { Observable } from 'rxjs';
import { ReviewModel } from '../../models/review/review.model';

export interface IMovieReviewService {
  getByMovieId(movieId: string): Observable<ReviewModel[]>;
  createReview(review: any): Observable<boolean>;
}
