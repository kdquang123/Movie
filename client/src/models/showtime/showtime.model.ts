import { MovieModel } from '../movie/movie.model';
import { RoomModel } from '../room/room.model';

export class ShowtimeModel {
  id!: string;
  movieId!: string;
  movie?: MovieModel;
  roomId!: string;
  room?: RoomModel;
  startTime!: Date;
  endTime!: Date;
  basePrice!: number;
  weekendPrice!: number;
}
