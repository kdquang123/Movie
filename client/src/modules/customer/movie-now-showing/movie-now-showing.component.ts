import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MovieModel } from '../../../models/movie/movie.model';
import { MOVIE_SERVICE } from '../../../constants/injection/injection.constant';
import { IMovieService } from '../../../services/movie/movie-service.interface';

@Component({
  selector: 'app-movie-now-showing',
  imports: [CommonModule, RouterLink],
  templateUrl: './movie-now-showing.component.html',
  styleUrl: './movie-now-showing.component.css',
})
export class MovieNowShowingComponent implements OnInit {
  movies!: MovieModel[];
  constructor(
    @Inject(MOVIE_SERVICE) private readonly movieService: IMovieService
  ) {}
  ngOnInit(): void {
    this.movieService.getNowPlayingMovies().subscribe((response) => {
      this.movies = response;
    });
  }

  formatMinuteToHour(minute: number): string {
    const hours = Math.floor(minute / 60);
    const minutes = minute % 60;
    return `${hours}h ${minutes}m`;
  }
}
