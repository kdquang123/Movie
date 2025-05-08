import {
  AfterViewInit,
  Component,
  ElementRef,
  Inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { faSave } from '@fortawesome/free-solid-svg-icons';
import { MovieModel } from '../../../../models/movie/movie.model';
import { RoomModel } from '../../../../models/room/room.model';
import { ShowtimeModel } from '../../../../models/showtime/showtime.model';
import {
  MOVIE_SERVICE,
  ROOM_SERVICE,
  SHOWTIME_SERVICE,
} from '../../../../constants/injection/injection.constant';
import { IMovieService } from '../../../../services/movie/movie-service.interface';
import { IRoomService } from '../../../../services/room/room-service.interface';
import { IShowtimeService } from '../../../../services/showtime/showtime-service.interface';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { forkJoin, switchMap } from 'rxjs';

@Component({
  selector: 'app-showtime-detail',
  imports: [CommonModule, ReactiveFormsModule, FontAwesomeModule, RouterLink],
  templateUrl: './showtime-detail.component.html',
  styleUrl: './showtime-detail.component.css',
})
export class ShowtimeDetailComponent implements OnInit {
  faSave = faSave;
  showtimeForm!: FormGroup;
  movieList: MovieModel[] = [];
  roomList: RoomModel[] = [];
  allShowtimesOfDay: ShowtimeModel[] = [];
  filteredShowtimes: ShowtimeModel[] = [];
  selectedMovie: MovieModel | undefined;
  availableTimes: string[] = [];
  selectedTime: string = '';

  showtimeId: string = '';
  currentStartTime: string = '';

  @ViewChild('timeSelect') timeSelect!: ElementRef<HTMLSelectElement>;

  constructor(
    @Inject(MOVIE_SERVICE) private readonly movieService: IMovieService,
    @Inject(ROOM_SERVICE) private readonly roomService: IRoomService,
    @Inject(SHOWTIME_SERVICE)
    private readonly showtimeService: IShowtimeService,
    private readonly toastr: ToastrService,
    private readonly router: Router,
    private readonly route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.createForm();
    this.showtimeId = this.route.snapshot.paramMap.get('id')!;
    forkJoin([
      this.movieService.getAllAvailableMovie(),
      this.roomService.getAllRoom(),
    ])
      .pipe(
        switchMap(([movies, rooms]) => {
          this.movieList = movies;
          this.roomList = rooms;
          return this.showtimeService.getShowtimeById(this.showtimeId);
        }),
        switchMap((showtime) => {
          this.selectedMovie = this.movieList.find(
            (m) => m.id === showtime.movieId
          );

          this.showtimeForm.patchValue({
            movieId: showtime.movieId,
            roomId: showtime.roomId,
            startDate: showtime.startTime
              ? new Date(showtime.startTime).toISOString().split('T')[0]
              : '',
            basePrice: showtime.basePrice,
            weekendPrice: showtime.weekendPrice,
            duration: this.selectedMovie?.duration,
          });

          this.currentStartTime = showtime.startTime
            .toString()
            .split('T')[1]
            .slice(0, 5);
          console.log(this.currentStartTime);

          const selectedDate = new Date(
            this.showtimeForm.get('startDate')?.value
          );

          return this.showtimeService.getShowtimeByDate(selectedDate);
        })
      )
      .subscribe((showtimesOfDay) => {
        this.allShowtimesOfDay = showtimesOfDay;
        this.filteredShowtimes = showtimesOfDay.filter(
          (s) => s.roomId === this.showtimeForm.get('roomId')?.value
        );
        this.availableTimes = this.generateAvailableTimes(
          this.filteredShowtimes
        );
        this.availableTimes.push(this.currentStartTime);
        this.showtimeForm.get('startTime')?.setValue(this.currentStartTime);
      });
  }

  createForm(): void {
    this.showtimeForm = new FormGroup({
      movieId: new FormControl('', Validators.required),
      roomId: new FormControl('', Validators.required),
      startDate: new FormControl('', Validators.required),
      duration: new FormControl(0),
      startTime: new FormControl('', Validators.required),
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
    this.showtimeForm.get('startTime')?.setValue('');
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
    console.log(this.showtimeId);

    this.showtimeService
      .updateShowtime(this.showtimeForm.value, this.showtimeId)
      .subscribe({
        next: () => {
          this.toastr.success('Sửa lịch chiếu thành công!', 'Success');
          this.router.navigate(['/admin/showtimes']);
        },
        error: (error) => {
          this.toastr.error('Sửa thất bại!', 'Lỗi');
        },
      });
  }
}
