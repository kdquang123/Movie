import { MovieModel } from '../movie/movie.model';
import { NewsModel } from '../news/news.model';

export class BannerModel {
  id!: string;
  imageUrl!: string;
  filmId!: string;
  film!: MovieModel;
  newsId!: string;
  news!: NewsModel;
  bannerType!: string;
}
