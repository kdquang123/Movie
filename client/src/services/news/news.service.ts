import { Injectable } from '@angular/core';
import { INewsService } from './news-service.interface';
import { Observable } from 'rxjs';
import { NewsModel } from '../../models/news/news.model';
import { PaginatedResult } from '../../models/paginated-result.model';
import { HttpClient } from '@angular/common/http';
import { ApiEndpoints } from '../../constants/api-endpoint/api-endpoint';

@Injectable({
  providedIn: 'root',
})
export class NewsService implements INewsService {
  constructor(private readonly httpClient: HttpClient) {}

  getAll(): Observable<NewsModel[]> {
    return this.httpClient.get<NewsModel[]>(ApiEndpoints.getAllNews);
  }

  getById(id: string): Observable<NewsModel> {
    return this.httpClient.get<NewsModel>(`${ApiEndpoints.getNewsById}/${id}`);
  }

  create(news: any): Observable<boolean> {
    return this.httpClient.post<boolean>(ApiEndpoints.createNews, news);
  }

  update(id: string, news: any): Observable<boolean> {
    return this.httpClient.put<boolean>(
      `${ApiEndpoints.updateNews}/${id}`,
      news
    );
  }

  delete(id: string): Observable<boolean> {
    return this.httpClient.delete<boolean>(`${ApiEndpoints.deleteNews}/${id}`);
  }

  search(filter: any): Observable<PaginatedResult<NewsModel>> {
    return this.httpClient.post<PaginatedResult<NewsModel>>(
      ApiEndpoints.searchNews,
      filter
    );
  }
}
