import { Component, Inject, OnInit } from '@angular/core';
import {
  COMMON_SERVICE,
  MOVIE_SERVICE,
} from '../../../../constants/injection/injection.constant';
import { ICommonService } from '../../../../services/common/common-service.interface';
import { IMovieService } from '../../../../services/movie/movie-service.interface';
import { ToastrService } from 'ngx-toastr';
import {
  FormArray,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CategoryModel } from '../../../../models/category/category.model';
import { AgeRestrictionModel } from '../../../../models/age-restriction/age-restriction.model';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { faCloudUploadAlt, faSave } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-movie-detail',
  imports: [ReactiveFormsModule, CommonModule, FontAwesomeModule],
  templateUrl: './movie-detail.component.html',
  styleUrl: './movie-detail.component.css',
})
export class MovieDetailComponent implements OnInit {
  faSave = faSave;
  faCloudUploadAlt = faCloudUploadAlt;

  public movieForm!: FormGroup;
  public categoryList: CategoryModel[] = [];
  public ageRestrictionList: AgeRestrictionModel[] = [];
  movieId: string = '';

  constructor(
    @Inject(COMMON_SERVICE) private readonly commonService: ICommonService,
    @Inject(MOVIE_SERVICE) private readonly movieService: IMovieService,
    private readonly toastr: ToastrService,
    private readonly route: ActivatedRoute,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.createForm();
    this.commonService.getAllCategory().subscribe((response) => {
      this.categoryList = response;
    });

    this.commonService.getAllAgeRestriction().subscribe((response) => {
      this.ageRestrictionList = response;
    });

    this.movieId = this.route.snapshot.paramMap.get('id')!;
    this.movieService.getMovieById(this.movieId).subscribe((response) => {
      this.movieForm.patchValue({
        name: response.name,
        releaseDate: response.releaseDate
          ? new Date(response.releaseDate).toISOString().split('T')[0]
          : '',
        endDate: response.releaseDate
          ? new Date(response.endDate).toISOString().split('T')[0]
          : '',
        duration: response.duration,
        director: response.director,
        actors: response.actors,
        IMDbScore: response.imDbScore,
        ageRestrictionId: response.ageRestrictionId,
        // poster: response.poster,
        trailerUrl: response.trailerUrl,
        description: response.description,
      });

      this.setCategories(response.categories || []);
    });
  }

  createForm(): void {
    this.movieForm = new FormGroup({
      name: new FormControl('', Validators.required),
      releaseDate: new FormControl('', Validators.required),
      endDate: new FormControl('', Validators.required),
      duration: new FormControl(null, [Validators.required, Validators.min(1)]),
      categories: new FormArray([]),
      director: new FormControl(''),
      actors: new FormControl(''),
      IMDbScore: new FormControl(null, [Validators.min(0), Validators.max(10)]),
      ageRestrictionId: new FormControl(''),
      poster: new FormControl(null),
      trailerUrl: new FormControl(''),
      description: new FormControl('', Validators.required),
    });
  }

  setCategories(categories: CategoryModel[]): void {
    const categoriesFormArray = this.movieForm.get('categories') as FormArray;
    categoriesFormArray.clear();

    categories.forEach((category) => {
      const categoryControl = new FormControl(category.id);
      categoriesFormArray.push(categoryControl);
    });
  }

  onPosterChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.movieForm.patchValue({ poster: file });
      this.movieForm.get('poster')?.updateValueAndValidity();
    }
  }

  onCategoryChange(categoryId: string, event: Event): void {
    const categories = this.movieForm.get('categories') as FormArray;
    const checkbox = event.target as HTMLInputElement;
    const isChecked = checkbox.checked;

    if (isChecked) {
      categories.push(new FormControl(categoryId));
    } else {
      const index = categories.controls.findIndex(
        (control) => control.value === categoryId
      );
      if (index > -1) {
        categories.removeAt(index);
      }
    }
  }

  onSubmit(): void {
    if (this.movieForm.valid) {
      const formData = new FormData();
      Object.keys(this.movieForm.controls).forEach((key) => {
        const value = this.movieForm.get(key)?.value;
        if (key === 'categories') {
          (value as string[]).forEach((categoryId) => {
            formData.append('categories', categoryId);
          });
        } else {
          formData.append(key, value);
        }
      });

      this.movieService.updateMovie(formData, this.movieId).subscribe({
        next: () => {
          this.toastr.success('Sửa thành công!', 'Success');
          this.router.navigate(['/admin/movies']);
        },
        error: (error) => {
          this.toastr.error(error.error.message, 'Error');
        },
      });
    } else {
      this.toastr.error('Vui lòng điền đầy đủ thông tin!', 'Error');
    }
  }

  onCancel(): void {
    this.router.navigate(['/admin/movies']);
  }
}
