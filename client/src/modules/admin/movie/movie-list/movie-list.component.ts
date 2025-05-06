import { Component, Inject, OnInit } from '@angular/core';
import { MasterDataComponent } from '../../master-data/master-data.component';
import { MovieModel } from '../../../../models/movie/movie.model';
import { TableComponent } from '../../../shared/common/table/table.component';
import { Router, RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CommonModule } from '@angular/common';
import { IMovieService } from '../../../../services/movie/movie-service.interface';
import {
  COMMON_SERVICE,
  MOVIE_SERVICE,
} from '../../../../constants/injection/injection.constant';
import { TableColumn } from '../../../shared/common/table/table-column.model';
import { ICommonService } from '../../../../services/common/common-service.interface';
import { CategoryModel } from '../../../../models/category/category.model';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-movie-list',
  imports: [
    TableComponent,
    RouterLink,
    FontAwesomeModule,
    CommonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './movie-list.component.html',
  styleUrl: './movie-list.component.css',
})
export class MovieListComponent
  extends MasterDataComponent<MovieModel>
  implements OnInit
{
  public statusList: any[] = [];
  public categoryList: CategoryModel[] = [];

  public override columns: TableColumn[] = [
    { name: 'Phim', value: 'name' },
    {
      name: 'Thể loại',
      value: 'categories',
      formatter: this.formatCategories.bind(this),
    },
    {
      name: 'Thời lượng',
      value: 'duration',
      formatter: (movie: MovieModel) => `${movie.duration} phút`,
    },
    {
      name: 'Ngày khởi chiếu',
      value: 'releaseDate',
      formatter: this.formatDate.bind(this),
    },
    {
      name: 'Trạng thái',
      value: 'status',
      formatter: (movie: MovieModel) =>
        movie.status === 'NowPlaying'
          ? 'Đang chiếu'
          : movie.status === 'ComingSoon'
          ? 'Sắp chiếu'
          : 'Ngừng chiếu',
    },
  ];

  constructor(
    @Inject(MOVIE_SERVICE) private readonly movieService: IMovieService,
    @Inject(COMMON_SERVICE) private readonly commonService: ICommonService,
    private readonly router: Router,
    private readonly toastr: ToastrService
  ) {
    super();
  }

  public override ngOnInit(): void {
    this.commonService.getAllCategory().subscribe((response) => {
      this.categoryList = response;
    });
    this.commonService.getAllMovieStatus().subscribe((response) => {
      this.statusList = response;
    });
    this.createForm();
    this.searchData();
  }

  protected override createForm(): void {
    this.searchForm = new FormGroup({
      keyword: new FormControl(''),
      status: new FormControl(''),
      categoryId: new FormControl(''),
    });
  }

  public override searchData(): void {
    this.movieService.search(this.filter).subscribe((res) => {
      this.data = res;
    });
  }

  private formatCategories(movie: MovieModel): string {
    return movie.categories?.map((c) => c.name).join(', ') ?? 'N/A';
  }

  private formatDate(movie: MovieModel, column: TableColumn): string {
    const dateValue = movie[column.value as keyof MovieModel];
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

  public detail(id: string): void {
    this.router.navigate(['/admin/movies', id, 'detail']);
  }

  public delete(id: string): void {
    this.movieService.deleteMovie(id).subscribe({
      next: () => {
        this.toastr.success('Xóa phim thành công!');
        this.searchData();
      },
      error: () => {
        this.toastr.error('Xóa phim thất bại!');
      },
    });
  }
}
