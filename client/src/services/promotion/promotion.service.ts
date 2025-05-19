import { Injectable } from '@angular/core';
import { IPromotionService } from './promotion-service.interface';
import { Observable } from 'rxjs';
import { PaginatedResult } from '../../models/paginated-result.model';
import { PromotionModel } from '../../models/promotion/promotion.model';
import { HttpClient } from '@angular/common/http';
import { ApiEndpoints } from '../../constants/api-endpoint/api-endpoint';

@Injectable({
  providedIn: 'root',
})
export class PromotionService implements IPromotionService {
  constructor(private readonly httpClient: HttpClient) {}
  getAll(): Observable<PromotionModel[]> {
    return this.httpClient.get<PromotionModel[]>(ApiEndpoints.getAllPromotion);
  }
  getById(id: string): Observable<PromotionModel> {
    return this.httpClient.get<PromotionModel>(
      `${ApiEndpoints.getPromotionById}/${id}`
    );
  }
  create(promotion: any): Observable<boolean> {
    return this.httpClient.post<boolean>(
      ApiEndpoints.createPromotion,
      promotion
    );
  }
  update(id: string, promotion: any): Observable<boolean> {
    return this.httpClient.put<boolean>(
      `${ApiEndpoints.getPromotionById}/${id}`,
      promotion
    );
  }
  delete(id: string): Observable<boolean> {
    return this.httpClient.delete<boolean>(
      `${ApiEndpoints.getPromotionById}/${id}`
    );
  }
  search(filter: any): Observable<PaginatedResult<PromotionModel>> {
    return this.httpClient.post<PaginatedResult<PromotionModel>>(
      ApiEndpoints.searchPromotion,
      filter
    );
  }
}
