import { Component, Inject, OnInit } from '@angular/core';
import { TableComponent } from '../../../shared/common/table/table.component';
import { MasterDataComponent } from '../../master-data/master-data.component';
import { NewsModel } from '../../../../models/news/news.model';
import { Router, RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TableColumn } from '../../../shared/common/table/table-column.model';
import { NEWS_SERVICE } from '../../../../constants/injection/injection.constant';
import { INewsService } from '../../../../services/news/news-service.interface';
import { ToastrService } from 'ngx-toastr';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-news-list',
  imports: [TableComponent, RouterLink, FontAwesomeModule, ReactiveFormsModule],
  templateUrl: './news-list.component.html',
  styleUrl: './news-list.component.css',
})
export class NewsListComponent
  extends MasterDataComponent<NewsModel>
  implements OnInit
{
  public override columns: TableColumn[] = [
    { name: 'Tiêu đề', value: 'title' },
    {
      name: 'Danh mục',
      value: 'category',
      style: (news: NewsModel) =>
        news.category === 'Promotion'
          ? 'text-white text-center rounded-full bg-green-500 inline px-2 py-1'
          : news.category === 'Event'
          ? 'text-white text-center rounded-full bg-yellow-500 inline px-2 py-1'
          : 'text-white text-center rounded-full bg-red-500 inline px-2 py-1',
    },
    {
      name: 'Ngày đăng',
      value: 'createdAt',
      formatter: this.formatDate.bind(this),
    },
  ];

  constructor(
    @Inject(NEWS_SERVICE)
    private readonly newsService: INewsService,
    private readonly router: Router,
    private readonly toastr: ToastrService
  ) {
    super();
  }

  public override ngOnInit(): void {
    this.createForm();
    this.searchData();
  }

  protected override createForm(): void {
    this.searchForm = new FormGroup({
      keyword: new FormControl(''),
      category: new FormControl(''),
    });
  }

  public override searchData(): void {
    this.newsService.search(this.filter).subscribe((res) => {
      this.data = res;
    });
  }

  public detail(id: string): void {
    this.router.navigate(['/admin/news', id, 'detail']);
  }

  public delete(id: string): void {
    this.newsService.delete(id).subscribe({
      next: () => {
        this.toastr.success('Xóa tin tức thành công!');
        this.searchData();
      },
      error: () => {
        this.toastr.error('Xóa tin tức thất bại!');
      },
    });
  }

  private formatDate(news: NewsModel, column: TableColumn): string {
    const dateValue = news[column.value as keyof NewsModel];
    if (dateValue) {
      const formatter = new Intl.DateTimeFormat('vi-VN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      });
      const date = new Date(dateValue as string);
      return formatter.format(date);
    }
    return 'Invalid Date';
  }
}
