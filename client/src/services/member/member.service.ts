import { Injectable } from '@angular/core';
import { IMemberService } from './member-service.interface';
import { Observable } from 'rxjs';
import { PaginatedResult } from '../../models/paginated-result.model';
import { HttpClient } from '@angular/common/http';
import { ApiEndpoints } from '../../constants/api-endpoint/api-endpoint';
import { MemberModel } from '../../models/member/member.model';

@Injectable({
  providedIn: 'root',
})
export class MemberService implements IMemberService {
  constructor(private readonly httpClient: HttpClient) {}
  changeStatus(userId:string): Observable<boolean> {
    return this.httpClient.post<boolean>(ApiEndpoints.changeUserStatus,{userId});
  }

  getAllMember(): Observable<MemberModel[]> {
    return this.httpClient.get<MemberModel[]>(ApiEndpoints.getAllMember);
  }

  getMemberById(id: string): Observable<MemberModel> {
    return this.httpClient.get<MemberModel>(
      `${ApiEndpoints.getMemberById}/${id}`
    );
  }

  deleteMember(id: string): Observable<boolean> {
    return this.httpClient.delete<boolean>(
      `${ApiEndpoints.deleteMember}/${id}`
    );
  }

  updateMember(id: string, employee: any): Observable<boolean> {
    return this.httpClient.put<boolean>(
      `${ApiEndpoints.updateMember}/${id}`,
      employee
    );
  }

  createMember(employee: any): Observable<boolean> {
    return this.httpClient.post<boolean>(ApiEndpoints.createMember, employee);
  }

  searchMember(filter: any): Observable<PaginatedResult<MemberModel>> {
    return this.httpClient.post<PaginatedResult<MemberModel>>(
      ApiEndpoints.searchMember,
      filter
    );
  }
}
