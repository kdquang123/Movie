import { Observable } from 'rxjs';
import { CategoryModel } from '../../models/category/category.model';
import { AgeRestrictionModel } from '../../models/age-restriction/age-restriction.model';

export interface ICommonService {
  getAllCategory(): Observable<CategoryModel[]>;
  getAllAgeRestriction(): Observable<AgeRestrictionModel[]>;
  getAllMovieStatus(): Observable<any[]>;
}
