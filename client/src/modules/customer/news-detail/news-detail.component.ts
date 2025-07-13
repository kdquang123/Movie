import { Component, Inject, OnInit } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faFacebookF,
  faLinkedinIn,
  faTwitter,
} from '@fortawesome/free-brands-svg-icons';
import { faClock, faEye } from '@fortawesome/free-solid-svg-icons';
import { NewsModel } from '../../../models/news/news.model';
import { NEWS_SERVICE } from '../../../constants/injection/injection.constant';
import { INewsService } from '../../../services/news/news-service.interface';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-news-detail',
  imports: [FontAwesomeModule],
  templateUrl: './news-detail.component.html',
  styleUrl: './news-detail.component.css',
})
export class NewsDetailComponent implements OnInit {
  faClock = faClock;
  farEye = faEye;
  faFacebookF = faFacebookF;
  faTwitter = faTwitter;
  faLinkedinIn = faLinkedinIn;

  newsId!: string;

  news!: NewsModel;

  constructor(
    @Inject(NEWS_SERVICE) private readonly newsService: INewsService,
    private readonly route: ActivatedRoute
  ) {}

  public ngOnInit(): void {
    this.newsId = this.route.snapshot.params['id'];
    this.newsService.getById(this.newsId).subscribe((news) => {
      this.news = news;
    });
  }

  formatDate(dateInput: string | Date): string {
    const date = new Date(dateInput);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) {
      return 'Vừa xong';
    }

    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) {
      return `${diffInMinutes} phút trước`;
    }

    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) {
      return `${diffInHours} giờ trước`;
    }

    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays === 1) {
      return 'Hôm qua';
    }

    if (diffInDays < 7) {
      return `${diffInDays} ngày trước`;
    }

    return date.toLocaleDateString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  }
}
