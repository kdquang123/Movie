import { Injectable } from '@angular/core';
import { IBannerService } from './banner-service.interface';
import { Observable } from 'rxjs';
import { BannerModel } from '../../models/banner/banner.model';
import { PaginatedResult } from '../../models/paginated-result.model';
import { HttpClient } from '@angular/common/http';
import { ApiEndpoints } from '../../constants/api-endpoint/api-endpoint';

@Injectable({
  providedIn: 'root',
})
export class BannerService implements IBannerService {
  constructor(private readonly httpClient: HttpClient) {}

  getAll(): Observable<BannerModel[]> {
    return this.httpClient.get<BannerModel[]>(ApiEndpoints.getAllBanner);
  }

  getById(id: string): Observable<BannerModel> {
    return this.httpClient.get<BannerModel>(
      `${ApiEndpoints.getBannerById}/${id}}`
    );
  }

  create(banner: any): Observable<boolean> {
    return this.httpClient.post<boolean>(ApiEndpoints.createBanner, banner);
  }

  update(banner: any): Observable<boolean> {
    return this.httpClient.put<boolean>(ApiEndpoints.updateBanner, banner);
  }

  delete(id: string): Observable<boolean> {
    return this.httpClient.delete<boolean>(
      `${ApiEndpoints.deleteBanner}/${id}`
    );
  }

  search(filter: any): Observable<PaginatedResult<BannerModel>> {
    return this.httpClient.post<PaginatedResult<BannerModel>>(
      ApiEndpoints.searchBanner,
      filter
    );
  }
}
