import { Component, Inject, OnInit } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCloudUploadAlt, faSave } from '@fortawesome/free-solid-svg-icons';
import {
  COMMON_SERVICE,
  MOVIE_SERVICE,
} from '../../../../constants/injection/injection.constant';
import { ICommonService } from '../../../../services/common/common-service.interface';
import { IMovieService } from '../../../../services/movie/movie-service.interface';
import { CategoryModel } from '../../../../models/category/category.model';
import { AgeRestrictionModel } from '../../../../models/age-restriction/age-restriction.model';
import { CommonModule } from '@angular/common';
import {
  FormGroup,
  ReactiveFormsModule,
  FormControl,
  Validators,
  FormArray,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-movie',
  imports: [FontAwesomeModule, CommonModule, ReactiveFormsModule],
  templateUrl: './add-movie.component.html',
  styleUrl: './add-movie.component.css',
})
export class AddMovieComponent implements OnInit {
  faSave = faSave;
  faCloudUploadAlt = faCloudUploadAlt;

  categoryList: CategoryModel[] = [];
  ageRestrictionList: AgeRestrictionModel[] = [];

  movieForm!: FormGroup;

  constructor(
    @Inject(COMMON_SERVICE) private readonly commonService: ICommonService,
    @Inject(MOVIE_SERVICE) private readonly movieService: IMovieService,
    private readonly toastr: ToastrService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.commonService.getAllCategory().subscribe((response) => {
      this.categoryList = response;
    });

    this.commonService.getAllAgeRestriction().subscribe((response) => {
      this.ageRestrictionList = response;
    });

    this.createForm();
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

      this.movieService.createMovie(formData).subscribe({
        next: () => {
          this.toastr.success('Thêm phim thành công!', 'Success');
          this.movieForm.reset();
          (this.movieForm.get('categories') as FormArray).clear();
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
}
