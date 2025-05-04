import { Injectable } from '@angular/core';
import { ICommonService } from './common-service.interface';
import { Observable } from 'rxjs';
import { AgeRestrictionModel } from '../../models/age-restriction/age-restriction.model';
import { CategoryModel } from '../../models/category/category.model';
import { HttpClient } from '@angular/common/http';
import { ApiEndpoints } from '../../constants/api-endpoint/api-endpoint';

@Injectable({
  providedIn: 'root',
})
export class CommonService implements ICommonService {
  constructor(private readonly httpClient: HttpClient) {}
  getAllMovieStatus(): Observable<any[]> {
    return this.httpClient.get<any[]>(ApiEndpoints.getAllMovieStatus);
  }

  getAllCategory(): Observable<CategoryModel[]> {
    return this.httpClient.get<CategoryModel[]>(ApiEndpoints.getAllCategory);
  }

  getAllAgeRestriction(): Observable<AgeRestrictionModel[]> {
    return this.httpClient.get<AgeRestrictionModel[]>(
      ApiEndpoints.getAllAgeRestriction
    );
  }
}
