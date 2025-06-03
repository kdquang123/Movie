import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faCloudUploadAlt,
  faSave,
  faSearch,
} from '@fortawesome/free-solid-svg-icons';
import {
  BANNER_SERVICE,
  MOVIE_SERVICE,
  NEWS_SERVICE,
} from '../../../../constants/injection/injection.constant';
import { IBannerService } from '../../../../services/banner/banner-service.interface';
import { ToastrService } from 'ngx-toastr';
import { PaginatedResult } from '../../../../models/paginated-result.model';
import { MovieModel } from '../../../../models/movie/movie.model';
import { NewsModel } from '../../../../models/news/news.model';
import { IMovieService } from '../../../../services/movie/movie-service.interface';
import { INewsService } from '../../../../services/news/news-service.interface';
import { OrderDirection, SearchModel } from '../../../../models/search.model';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-add-banner',
  imports: [CommonModule, FontAwesomeModule, RouterLink, ReactiveFormsModule],
  templateUrl: './add-banner.component.html',
  styleUrl: './add-banner.component.css',
})
export class AddBannerComponent implements OnInit {
  faSave = faSave;
  faCloudUploadAlt = faCloudUploadAlt;
  faSearch = faSearch;

  movieData!: PaginatedResult<MovieModel>;
  newsData!: PaginatedResult<NewsModel>;

  bannerForm!: FormGroup;

  searchTimeout: any;

  imagePreview: string | ArrayBuffer | null = null;

  constructor(
    @Inject(BANNER_SERVICE) private readonly bannerService: IBannerService,
    @Inject(MOVIE_SERVICE) private readonly movieService: IMovieService,
    @Inject(NEWS_SERVICE) private readonly newsService: INewsService,
    private readonly toastr: ToastrService,
    private readonly router: Router
  ) {}

  public filter: SearchModel = {
    keyword: '',
    pageNumber: 1,
    pageSize: 4,
    orderBy: '',
    orderDirection: OrderDirection.ASC,
    includeInactive: true,
  };

  public ngOnInit(): void {
    this.createForm();
    this.movieService.search(this.filter).subscribe((data) => {
      this.movieData = data;
    });
    this.newsService.search(this.filter).subscribe((data) => {
      this.newsData = data;
    });
  }

  createForm() {
    this.bannerForm = new FormGroup({
      image: new FormControl(null, Validators.required),
      bannerType: new FormControl('Movie', Validators.required),
      movieId: new FormControl(''),
      newsId: new FormControl(''),
    });
  }

  changeBannerType(type: string) {
    this.filter = {
      keyword: '',
      pageNumber: 1,
      pageSize: 4,
      orderBy: '',
      orderDirection: OrderDirection.ASC,
      includeInactive: true,
    };

    this.bannerForm.patchValue({ movieId: '' });
    this.bannerForm.patchValue({ newsId: '' });

    if (type === 'Movie') {
      this.bannerForm.get('movieId')?.setValidators([Validators.required]);
      this.bannerForm.get('newsId')?.clearValidators();
    } else {
      this.bannerForm.get('newsId')?.setValidators([Validators.required]);
      this.bannerForm.get('movieId')?.clearValidators();
    }
  }

  onSubmit() {
    if (this.bannerForm.valid) {
      const formData = new FormData();
      Object.keys(this.bannerForm.controls).forEach((key) => {
        const value = this.bannerForm.get(key)?.value;
        formData.append(key, value);
      });

      this.bannerService.create(formData).subscribe({
        next: (data) => {
          this.toastr.success('Thêm slide thành công', 'Thành công');
          this.router.navigate(['/admin/banners']);
        },
        error: (err) => {
          this.toastr.error('Thêm slide thất bại', 'Lỗi');
        },
      });
    } else {
      this.toastr.error('Vui lòng điền đầy đủ thông tin!', 'Lỗi');
    }
  }

  onImageChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) {
      this.imagePreview = null;
      return;
    }

    const file = input.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      this.imagePreview = reader.result;
    };

    reader.readAsDataURL(file);
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.bannerForm.patchValue({ image: file });
      this.bannerForm.get('image')?.updateValueAndValidity();
    }
  }

  onMovieInputChange(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    this.filter.keyword = inputElement.value;
    this.filter.pageNumber = 1;
    clearTimeout(this.searchTimeout);
    this.searchTimeout = setTimeout(() => {
      this.searchMovie();
    }, 500);
  }
  searchMovie() {
    this.movieService.search(this.filter).subscribe((data) => {
      this.movieData = data;
    });
  }
  showMoreMovie() {
    this.filter.pageNumber++;
    this.movieService.search(this.filter).subscribe((data) => {
      data.items.forEach((element) => {
        this.movieData.items.push(element);
      });
    });
  }
  selectMovie(id: string) {
    this.bannerForm.patchValue({ movieId: id });
    this.bannerForm.patchValue({ newsId: '' });
  }

  onNewsInputChange(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    this.filter.keyword = inputElement.value;
    this.filter.pageNumber = 1;
    clearTimeout(this.searchTimeout);
    this.searchTimeout = setTimeout(() => {
      this.searchNews();
    }, 500);
  }
  searchNews() {
    this.newsService.search(this.filter).subscribe((data) => {
      this.newsData = data;
    });
  }
  showMoreNews() {
    this.filter.pageNumber++;
    this.newsService.search(this.filter).subscribe((data) => {
      data.items.forEach((element) => {
        this.newsData.items.push(element);
      });
    });
  }
  selectNews(id: string) {
    this.bannerForm.patchValue({ newsId: id });
    this.bannerForm.patchValue({ movieId: '' });
  }

  formatMovieStatus(status: string): string {
    return status === 'NowPlaying'
      ? 'Đang chiếu'
      : status === 'ComingSoon'
      ? 'Sắp chiếu'
      : 'Ngừng chiếu';
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

  formatNewsType(type: string): string {
    return type == 'News'
      ? 'Phim mới'
      : type == 'Event'
      ? 'Sự kiện'
      : 'Khuyến mãi';
  }
}
