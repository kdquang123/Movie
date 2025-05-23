import { ReviewUserModel } from '../user/review-user.model';

export class ReviewModel {
  id!: string;
  user!: ReviewUserModel;
  filmId!: string;
  comment!: string;
  rating!: number;
}
