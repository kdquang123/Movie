import { Component, Inject, OnInit } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faCalendarAlt,
  faClock,
  faEye,
} from '@fortawesome/free-solid-svg-icons';
import { NEWS_SERVICE } from '../../../constants/injection/injection.constant';
import { INewsService } from '../../../services/news/news-service.interface';
import { NewsModel } from '../../../models/news/news.model';
import { OrderDirection, SearchModel } from '../../../models/search.model';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-news',
  imports: [FontAwesomeModule, CommonModule, RouterLink],
  templateUrl: './news.component.html',
  styleUrl: './news.component.css',
})
export class NewsComponent implements OnInit {
  faClock = faClock;
  faEye = faEye;
  faCalendarAlt = faCalendarAlt;

  newsList: NewsModel[] = [];

  public filter: SearchModel = {
    keyword: '',
    pageNumber: 1,
    pageSize: 6,
    orderBy: 'createdAt',
    orderDirection: OrderDirection.DESC,
    includeInactive: true,
  };

  constructor(
    @Inject(NEWS_SERVICE) private readonly newsService: INewsService
  ) {}

  ngOnInit(): void {
    this.searchData();
  }

  searchData() {
    this.newsService.search(this.filter).subscribe((res) => {
      res.items.forEach((item) => {
        this.newsList.push(item);
      });
    });
  }

  showMoreNews() {
    this.filter.pageNumber++;
    this.searchData();
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
