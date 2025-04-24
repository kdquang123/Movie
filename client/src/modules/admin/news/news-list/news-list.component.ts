import { Component } from '@angular/core';
import { TableComponent } from '../../../shared/common/table/table.component';
import { MasterDataComponent } from '../../master-data/master-data.component';
import { NewsModel } from '../../../../models/news/news.model';
import { RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-news-list',
  imports: [TableComponent, RouterLink, FontAwesomeModule],
  templateUrl: './news-list.component.html',
  styleUrl: './news-list.component.css',
})
export class NewsListComponent extends MasterDataComponent<NewsModel> {}
