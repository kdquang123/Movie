import { Observable } from 'rxjs';
import { PromotionModel } from '../../models/promotion/promotion.model';
import { PaginatedResult } from '../../models/paginated-result.model';

export interface IPromotionService {
  getAll(): Observable<PromotionModel[]>;
  getById(id: string): Observable<PromotionModel>;
  create(promotion: any): Observable<boolean>;
  update(id: string, promotion: any): Observable<boolean>;
  delete(id: string): Observable<boolean>;
  search(filter: any): Observable<PaginatedResult<PromotionModel>>;
  getByCode(code: string, orderAmount: number): Observable<PromotionModel>;
}
