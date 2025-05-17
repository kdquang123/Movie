import { Observable } from 'rxjs';
import { PaginatedResult } from '../../models/paginated-result.model';
import { MemberModel } from '../../models/member/member.model';

export interface IMemberService {
  getAllMember(): Observable<MemberModel[]>;
  getMemberById(id: string): Observable<MemberModel>;
  deleteMember(id: string): Observable<boolean>;
  updateMember(id: string, employee: any): Observable<boolean>;
  createMember(employee: any): Observable<boolean>;
  searchMember(filter: any): Observable<PaginatedResult<MemberModel>>;
}
