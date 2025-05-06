import { Observable } from 'rxjs';

export interface ISeatService {
  changeSeatType(seatId: string, seatType: number): Observable<boolean>;
}
