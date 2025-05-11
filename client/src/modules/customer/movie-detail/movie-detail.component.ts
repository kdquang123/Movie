import { Component, Inject, OnInit } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPlay, faStar, faTicketAlt } from '@fortawesome/free-solid-svg-icons';
import { IMovieService } from '../../../services/movie/movie-service.interface';
import {
  MOVIE_SERVICE,
  SHOWTIME_SERVICE,
} from '../../../constants/injection/injection.constant';
import { IShowtimeService } from '../../../services/showtime/showtime-service.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieModel } from '../../../models/movie/movie.model';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ShowtimeModel } from '../../../models/showtime/showtime.model';

@Component({
  selector: 'app-movie-detail',
  imports: [FontAwesomeModule, CommonModule],
  templateUrl: './movie-detail.component.html',
  styleUrl: './movie-detail.component.css',
})
export class MovieDetailComponent implements OnInit {
  faTicket = faTicketAlt;
  faStar = faStar;
  faPlay = faPlay;

  movieId: string = '';
  movie!: MovieModel;

  youtubeUrl!: SafeResourceUrl;
  isShowTrailer: boolean = false;

  showtimesOfMovie: ShowtimeModel[] = [];
  dateList: Date[] = [];
  selectedDate!: Date;
  showtimesOfMovieByDate: ShowtimeModel[] = [];

  constructor(
    @Inject(MOVIE_SERVICE) private readonly movieService: IMovieService,
    @Inject(SHOWTIME_SERVICE)
    private readonly showtimeService: IShowtimeService,
    private readonly route: ActivatedRoute,
    private readonly sanitizer: DomSanitizer,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.movieId = this.route.snapshot.paramMap.get('id')!;
    this.movieService.getMovieById(this.movieId).subscribe((response) => {
      this.movie = response;
      this.youtubeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
        this.getEmbedLink(this.movie.trailerUrl ?? '')
      );
    });
    this.showtimeService
      .getShowtimeByMovieId(this.movieId)
      .subscribe((response) => {
        this.showtimesOfMovie = response;
        this.dateList = this.generateDateList(this.showtimesOfMovie);
      });
  }

  public formatCategories(movie: MovieModel): string {
    return movie.categories?.map((c) => c.name).join(', ') ?? 'N/A';
  }

  public formatMinuteToHour(minute: number): string {
    const hours = Math.floor(minute / 60);
    const minutes = minute % 60;
    return `${hours}h ${minutes}m`;
  }

  public formatDate(date: Date): string {
    const newDate = new Date(date);
    return `${newDate.getDate().toString().padStart(2, '0')}/${(
      newDate.getMonth() + 1
    )
      .toString()
      .padStart(2, '0')}/${newDate.getFullYear()}`;
  }

  getStartTimeOfShowTime(dateTime: Date): string {
    const hour = new Date(dateTime).getHours().toString().padStart(2, '0');
    const minute = new Date(dateTime).getMinutes().toString().padStart(2, '0');
    return `${hour}:${minute}`;
  }

  public getYearOfDate(date: Date) {
    return new Date(date).getFullYear();
  }

  public getEmbedLink(urlTrailer: string) {
    return urlTrailer.replace('watch?v=', 'embed/');
  }

  generateDateList(showtimeList: ShowtimeModel[]): Date[] {
    const dateList: Date[] = [];
    showtimeList.forEach((showtime) => {
      const date = new Date(showtime.startTime);
      let check = 1;
      for (let d of dateList) {
        if (d.getDate() === date.getDate()) {
          check = 0;
          break;
        }
      }
      if (check) {
        dateList.push(date);
      }
    });
    return dateList;
  }

  onDateSelect(date: Date): void {
    this.selectedDate = date;
    this.showtimesOfMovieByDate = this.showtimesOfMovie.filter(
      (showtime) =>
        new Date(showtime.startTime).toDateString() === date.toDateString()
    );
  }

  onSelectShowtime(showtimeId: string): void {
    this.router.navigate(['/booking', showtimeId]);
  }
}
