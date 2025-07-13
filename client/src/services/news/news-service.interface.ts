import { Observable } from 'rxjs';
import { NewsModel } from '../../models/news/news.model';
import { PaginatedResult } from '../../models/paginated-result.model';

export interface INewsService {
  getAll(): Observable<NewsModel[]>;
  getById(id: string): Observable<NewsModel>;
  create(news: any): Observable<boolean>;
  update(id: string, news: any): Observable<boolean>;
  delete(id: string): Observable<boolean>;
  search(filter: any): Observable<PaginatedResult<NewsModel>>;
}
