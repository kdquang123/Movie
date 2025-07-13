import { Injectable } from '@angular/core';
import { IProfileService } from './profile-service.interface';
import { Observable } from 'rxjs';
import { ProfileModel } from '../../models/profile/profile.model';
import { HttpClient } from '@angular/common/http';
import { ApiEndpoints } from '../../constants/api-endpoint/api-endpoint';

@Injectable({
  providedIn: 'root',
})
export class ProfileService implements IProfileService {
  constructor(private readonly httpClient: HttpClient) {}
  public getProfile(): Observable<ProfileModel> {
    return this.httpClient.get<ProfileModel>(ApiEndpoints.getProfile);
  }
  public updateProfile(profile: any): Observable<boolean> {
    return this.httpClient.post<boolean>(ApiEndpoints.updateProfile, profile);
  }
}
