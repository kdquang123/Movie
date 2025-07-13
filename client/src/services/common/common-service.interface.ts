import { Observable } from 'rxjs';
import { CategoryModel } from '../../models/category/category.model';
import { AgeRestrictionModel } from '../../models/age-restriction/age-restriction.model';
import { RoomTypeModel } from '../../models/room/room-type.model';

export interface ICommonService {
  getAllCategory(): Observable<CategoryModel[]>;
  getAllAgeRestriction(): Observable<AgeRestrictionModel[]>;
  getAllMovieStatus(): Observable<any[]>;
  getAllRoomType(): Observable<RoomTypeModel[]>;
}
