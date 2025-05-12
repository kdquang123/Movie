import { HubConnection } from '@microsoft/signalr';

export interface ISeatHoldService {
  connect(showtimeId: string): Promise<void>;

  holdSeats(showtimeId: string, seatId: string, userId: string): Promise<void>;

  disconnect(showtimeId: string): Promise<void>;

  getHubConnection(): HubConnection;

  releaseSeat(
    showtimeId: string,
    seatId: string,
    userId: string
  ): Promise<void>;
}
