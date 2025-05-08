import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  MOVIE_SERVICE,
  ROOM_SERVICE,
  SHOWTIME_SERVICE,
} from '../../../../constants/injection/injection.constant';
import { IMovieService } from '../../../../services/movie/movie-service.interface';
import { ToastrService } from 'ngx-toastr';
import { Router, RouterLink } from '@angular/router';
import { faSave } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MovieModel } from '../../../../models/movie/movie.model';
import { RoomModel } from '../../../../models/room/room.model';
import { ShowtimeModel } from '../../../../models/showtime/showtime.model';
import { IShowtimeService } from '../../../../services/showtime/showtime-service.interface';
import { IRoomService } from '../../../../services/room/room-service.interface';

@Component({
  selector: 'app-add-showtime',
  imports: [CommonModule, ReactiveFormsModule, FontAwesomeModule, RouterLink],
  templateUrl: './add-showtime.component.html',
  styleUrl: './add-showtime.component.css',
})
export class AddShowtimeComponent implements OnInit {
  faSave = faSave;
  showtimeForm!: FormGroup;
  movieList: MovieModel[] = [];
  roomList: RoomModel[] = [];
  allShowtimesOfDay: ShowtimeModel[] = [];
  filteredShowtimes: ShowtimeModel[] = [];
  selectedMovie: MovieModel | undefined;
  availableTimes: string[] = [];
  selectedTime: string = '';

  constructor(
    @Inject(MOVIE_SERVICE) private readonly movieService: IMovieService,
    @Inject(ROOM_SERVICE) private readonly roomService: IRoomService,
    @Inject(SHOWTIME_SERVICE)
    private readonly showtimeService: IShowtimeService,
    private readonly toastr: ToastrService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.createForm();
    this.movieService.getAllAvailableMovie().subscribe((response) => {
      this.movieList = response;
    });
    this.roomService.getAllRoom().subscribe((response) => {
      this.roomList = response;
    });
  }

  createForm(): void {
    this.showtimeForm = new FormGroup({
      movieId: new FormControl('', Validators.required),
      roomId: new FormControl(
        { value: '', disabled: true },
        Validators.required
      ),
      startDate: new FormControl('', Validators.required),
      startTime: new FormControl(
        { value: '', disabled: true },
        Validators.required
      ),
      duration: new FormControl(0),
      basePrice: new FormControl('', Validators.required),
      weekendPrice: new FormControl('', Validators.required),
    });
  }

  onMovieChange(): void {
    this.showtimeForm.get('roomId')?.setValue('');
    this.showtimeForm.get('startTime')?.setValue('');
    if (this.showtimeForm.get('movieId')?.value) {
      this.selectedMovie = this.movieList.filter(
        (m) => m.id === this.showtimeForm.get('movieId')?.value
      )[0];
      this.showtimeForm.get('duration')?.setValue(this.selectedMovie.duration);
    }
    this.changeInputStatus();
  }

  onDateChange(): void {
    this.showtimeForm.get('roomId')?.setValue('');
    this.showtimeForm.get('startTime')?.setValue('');
    if (this.showtimeForm.get('startDate')?.value) {
      this.showtimeService
        .getShowtimeByDate(this.showtimeForm.get('startDate')?.value)
        .subscribe((response) => {
          this.allShowtimesOfDay = response;
        });
    }
    this.changeInputStatus();
  }

  onRoomChange(): void {
    this.showtimeForm.get('startTime')?.setValue('')
    if (this.showtimeForm.get('roomId')?.value) {
      this.filteredShowtimes = this.allShowtimesOfDay.filter(
        (s) => s.roomId === this.showtimeForm.get('roomId')?.value
      );
      this.availableTimes = this.generateAvailableTimes(this.filteredShowtimes);
    }
    this.changeInputStatus();
  }

  changeInputStatus() {
    if (
      this.showtimeForm.get('movieId')?.value &&
      this.showtimeForm.get('startDate')?.value
    ) {
      this.showtimeForm.get('roomId')?.enable();
      if (this.showtimeForm.get('roomId')?.value) {
        this.showtimeForm.get('startTime')?.enable();
      } else {
        this.showtimeForm.get('startTime')?.setValue('');
        this.showtimeForm.get('startTime')?.disable();
      }
    } else {
      this.showtimeForm.get('roomId')?.disable();
      this.showtimeForm.get('startTime')?.disable();
    }
  }

  generateAvailableTimes(existing: ShowtimeModel[]): string[] {
    const result: string[] = [];

    for (let hour = 9; hour <= 22; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const start = this.formatTime(hour, minute);
        const end = this.addMinutes(start, this.selectedMovie!.duration);

        const isConflict = existing.some((s) => {
          return this.isOverlap(
            start,
            end,
            new Date(s.startTime),
            new Date(s.endTime)
          );
        });

        if (!isConflict) result.push(start);
      }
    }

    return result;
  }

  formatTime(h: number, m: number): string {
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
  }

  addMinutes(time: string, mins: number): string {
    const [h, m] = time.split(':').map(Number);
    const date = new Date(0, 0, 0, h, m);
    date.setMinutes(date.getMinutes() + mins);

    return this.formatTime(date.getHours(), date.getMinutes());
  }

  isOverlap(start1: string, end1: string, start2: Date, end2: Date): boolean {
    const start2Time = this.extractTime(start2);
    const end2Time = this.extractTime(end2);

    return start1 <= end2Time && end1 >= start2Time;
  }

  extractTime(date: Date): string {
    const h = date.getHours().toString().padStart(2, '0');
    const m = date.getMinutes().toString().padStart(2, '0');
    return `${h}:${m}`;
  }

  onSubmit(): void {
    this.showtimeService.createShowtime(this.showtimeForm.value).subscribe({
      next: () => {
        this.toastr.success('Thêm lịch chiếu thành công!', 'Success');
        this.router.navigate(['/admin/showtimes']);
      },
      error: (error) => {
        this.toastr.error('Thêm thất bại!', 'Lỗi');
      },
    });
  }
}
