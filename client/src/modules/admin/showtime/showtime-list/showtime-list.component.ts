import { Component, Inject, OnInit } from '@angular/core';
import { TableComponent } from '../../../shared/common/table/table.component';
import { MasterDataComponent } from '../../master-data/master-data.component';
import { ShowtimeModel } from '../../../../models/showtime/showtime.model';
import { Router, RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TableColumn } from '../../../shared/common/table/table-column.model';
import {
  MOVIE_SERVICE,
  ROOM_SERVICE,
  SHOWTIME_SERVICE,
} from '../../../../constants/injection/injection.constant';
import { IRoomService } from '../../../../services/room/room-service.interface';
import { IShowtimeService } from '../../../../services/showtime/showtime-service.interface';
import { ToastrService } from 'ngx-toastr';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RoomModel } from '../../../../models/room/room.model';
import { CommonModule } from '@angular/common';
import { MovieModel } from '../../../../models/movie/movie.model';
import { IMovieService } from '../../../../services/movie/movie-service.interface';

@Component({
  selector: 'app-showtime-list',
  imports: [
    TableComponent,
    RouterLink,
    FontAwesomeModule,
    CommonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './showtime-list.component.html',
  styleUrl: './showtime-list.component.css',
})
export class ShowtimeListComponent
  extends MasterDataComponent<ShowtimeModel>
  implements OnInit
{
  public statusList: any[] = [];
  public roomList: RoomModel[] = [];
  public movieList: MovieModel[] = [];

  public override columns: TableColumn[] = [
    {
      name: 'Phim',
      value: 'showtime',
      formatter: (showtime: ShowtimeModel) => showtime.movie?.name ?? 'N/A',
    },
    {
      name: 'Phòng',
      value: 'room',
      formatter: (showtime: ShowtimeModel) => showtime.room?.name ?? 'N/A',
    },
    {
      name: 'Ngày chiếu',
      value: 'startTime',
      formatter: this.formatDate.bind(this),
    },
    {
      name: 'Giờ chiếu',
      value: 'startTime',
      formatter: this.formatTime.bind(this),
    },
    {
      name: 'Giá vé',
      value: 'basePrice',
      formatter: (showtime: ShowtimeModel) => showtime.basePrice + 'đ',
    },
  ];

  constructor(
    @Inject(MOVIE_SERVICE) private readonly movieService: IMovieService,
    @Inject(ROOM_SERVICE) private readonly roomService: IRoomService,
    @Inject(SHOWTIME_SERVICE)
    private readonly showtimeService: IShowtimeService,
    private readonly router: Router,
    private readonly toastr: ToastrService
  ) {
    super();
  }

  public override ngOnInit(): void {
    this.createForm();
    this.roomService.getAllRoom().subscribe((response) => {
      this.roomList = response;
    });
    this.movieService.getAllMovie().subscribe((response) => {
      this.movieList = response;
    });
    this.searchData();
  }

  protected override createForm(): void {
    this.searchForm = new FormGroup({
      roomId: new FormControl(''),
      startDate: new FormControl(''),
      showtimeId: new FormControl(''),
    });
  }

  public override searchData(): void {
    this.showtimeService.search(this.filter).subscribe((res) => {
      this.data = res;
    });
  }

  public detail(id: string): void {
    this.router.navigate(['/admin/showtimes', id, 'detail']);
  }

  public delete(id: string): void {
    this.showtimeService.deleteShowtime(id).subscribe({
      next: (response) => {
        if (response) {
          this.toastr.success('Xóa suất chiếu thành công!');
          this.searchData();
        } else {
          this.toastr.error('Xóa suất chiếu thất bại!');
        }
      },
      error: () => {
        this.toastr.error('Xóa suất chiếu thất bại!');
      },
    });
  }

  private formatDate(showtime: ShowtimeModel, column: TableColumn): string {
    const dateValue = showtime[column.value as keyof ShowtimeModel];
    if (dateValue) {
      const formatter = new Intl.DateTimeFormat('vi-VN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      });
      const date = new Date(dateValue as string);
      return formatter.format(date);
    }
    return 'Invalid Date';
  }

  private formatTime(showtime: ShowtimeModel, column: TableColumn): string {
    const timeValue = showtime[column.value as keyof ShowtimeModel];
    if (timeValue) {
      const time = new Date(timeValue as string);
      const hours = time.getHours().toString().padStart(2, '0');
      const minutes = time.getMinutes().toString().padStart(2, '0');
      return `${hours}:${minutes}`;
    }
    return 'Invalid Time';
  }
}
