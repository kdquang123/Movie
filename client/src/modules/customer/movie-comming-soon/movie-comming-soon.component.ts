import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { MOVIE_SERVICE } from '../../../constants/injection/injection.constant';
import { IMovieService } from '../../../services/movie/movie-service.interface';
import { MovieModel } from '../../../models/movie/movie.model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-movie-comming-soon',
  imports: [CommonModule, RouterLink],
  templateUrl: './movie-comming-soon.component.html',
  styleUrl: './movie-comming-soon.component.css',
})
export class MovieCommingSoonComponent implements OnInit {
  movies!: MovieModel[];
  constructor(
    @Inject(MOVIE_SERVICE) private readonly movieService: IMovieService
  ) {}
  ngOnInit(): void {
    this.movieService.getCommingSoonMovies().subscribe((response) => {
      this.movies = response;
    });
  }

  formatMinuteToHour(minute: number): string {
    const hours = Math.floor(minute / 60);
    const minutes = minute % 60;
    return `${hours}h ${minutes}m`;
  }
}
