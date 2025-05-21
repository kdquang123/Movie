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

@Component({
  selector: 'app-news',
  imports: [FontAwesomeModule, CommonModule],
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
    orderBy: '',
    orderDirection: OrderDirection.ASC,
    includeInactive: true,
  };

  constructor(
    @Inject(NEWS_SERVICE) private readonly newsService: INewsService
  ) {}

  ngOnInit(): void {
    this.newsService.search(this.filter).subscribe((res) => {
      res.items.forEach((item) => {
        this.newsList.push(item);
      });
    });
  }
}
