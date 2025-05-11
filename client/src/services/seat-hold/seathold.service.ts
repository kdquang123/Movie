import { Injectable } from '@angular/core';
import { ISeatHoldService } from './seathold-service.interface';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { ApiEndpoints } from '../../constants/api-endpoint/api-endpoint';

@Injectable({
  providedIn: 'root',
})
export class SeatHoldService implements ISeatHoldService {
  private readonly hubConnection!: HubConnection;

  constructor() {
    this.hubConnection = new HubConnectionBuilder()
      .withUrl(ApiEndpoints.seatHubUrl)
      .build();
  }

  async releaseSeat(
    showtimeId: string,
    seatId: string,
    userId: string
  ): Promise<void> {
    try {
      await this.hubConnection.invoke('ReleaseSeat', {
        showtimeId,
        seatId,
        userId,
      });
    } catch (error) {
      console.error('Error invoke ReleaseSeat:', error);
    }
  }

  async connect(showtimeId: string): Promise<void> {
    try {
      await this.hubConnection.start();
      console.log('Connected');
      this.hubConnection.invoke('JoinShowtimeGroup', showtimeId);
    } catch (error) {
      console.error('SignalR connection error:', error);
    }
  }

  async holdSeats(
    showtimeId: string,
    seatId: string,
    userId: string
  ): Promise<void> {
    try {
      await this.hubConnection.invoke('HoldSeats', {
        showtimeId,
        seatId,
        userId,
      });
    } catch (error) {
      console.error('Error invoke HoldSeats:', error);
    }
  }

  async disconnect(showtimeId: string): Promise<void> {
    await this.hubConnection.invoke('LeaveShowtimeGroup', showtimeId);
    await this.hubConnection.stop();
  }

  public getHubConnection(): HubConnection {
    return this.hubConnection;
  }
}
