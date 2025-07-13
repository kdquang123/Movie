import { Observable } from 'rxjs';
import { BannerModel } from '../../models/banner/banner.model';
import { PaginatedResult } from '../../models/paginated-result.model';

export interface IBannerService {
  getAll(): Observable<BannerModel[]>;
  getById(id: string): Observable<BannerModel>;
  create(banner: any): Observable<boolean>;
  update(banner: any): Observable<boolean>;
  delete(id: string): Observable<boolean>;
  search(filter: any): Observable<PaginatedResult<BannerModel>>;
}
