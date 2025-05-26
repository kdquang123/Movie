import { Component, Inject, OnInit } from '@angular/core';
import { CarouselComponent } from '../../shared/common/carousel/carousel.component';
import { BANNER_SERVICE, MOVIE_SERVICE } from '../../../constants/injection/injection.constant';
import { IMovieService } from '../../../services/movie/movie-service.interface';
import { MovieModel } from '../../../models/movie/movie.model';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { IBannerService } from '../../../services/banner/banner-service.interface';

@Component({
  selector: 'app-home',
  imports: [CarouselComponent, RouterLink, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  public nowPlayingMovies: MovieModel[] = [];
  public comingSoonMovies: MovieModel[] = [];

  constructor(
    @Inject(MOVIE_SERVICE) private readonly movieService: IMovieService,
  ) {}

  ngOnInit(): void {
    this.movieService.getNowPlayingMovies().subscribe((response) => {
      this.nowPlayingMovies = response.slice(0, 4);
    });

    this.movieService.getCommingSoonMovies().subscribe((response) => {
      this.comingSoonMovies = response.slice(0, 4);
    });
  }

  formatMinuteToHour(minute: number): string {
    const hours = Math.floor(minute / 60);
    const minutes = minute % 60;
    return `${hours}h ${minutes}m`;
  }

  generateArray(n: number): number[] {
    return Array.from({ length: n }, (_, i) => i);
  }

  public formatDate(date: Date): string {
    const newDate = new Date(date);
    return `${newDate.getDate().toString().padStart(2, '0')}/${(
      newDate.getMonth() + 1
    )
      .toString()
      .padStart(2, '0')}/${newDate.getFullYear()}`;
  }
}
