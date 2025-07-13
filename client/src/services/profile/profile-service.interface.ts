import { Observable } from 'rxjs';
import { ProfileModel } from '../../models/profile/profile.model';

export interface IProfileService {
  getProfile(): Observable<ProfileModel>;
  updateProfile(profile: any): Observable<boolean>;
}
