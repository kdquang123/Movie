import { CommonModule } from '@angular/common';
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Editor, NgxEditorComponent, NgxEditorMenuComponent } from 'ngx-editor';
import { NEWS_SERVICE } from '../../../../constants/injection/injection.constant';
import { faCloudUploadAlt, faSave } from '@fortawesome/free-solid-svg-icons';
import { INewsService } from '../../../../services/news/news-service.interface';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-news-detail',
  imports: [
    FontAwesomeModule,
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    NgxEditorComponent,
    NgxEditorMenuComponent,
  ],
  templateUrl: './news-detail.component.html',
  styleUrl: './news-detail.component.css',
})
export class NewsDetailComponent implements OnInit, OnDestroy {
  faSave = faSave;
  faCloudUploadAlt = faCloudUploadAlt;

  newsForm!: FormGroup;

  editor!: Editor;

  newsId!: string;

  constructor(
    @Inject(NEWS_SERVICE) private readonly newsService: INewsService,
    private readonly toastr: ToastrService,
    private readonly router: Router,
    private readonly route: ActivatedRoute
  ) {}

  ngOnDestroy(): void {
    this.editor.destroy();
  }
  ngOnInit(): void {
    this.newsId = this.route.snapshot.params['id'];
    this.editor = new Editor();
    this.createForm();
    this.newsService.getById(this.newsId).subscribe((response) => {
      this.newsForm.patchValue({
        title: response.title,
        content: response.content,
        category: response.category,
      });
    });
  }

  createForm() {
    this.newsForm = new FormGroup({
      title: new FormControl('', [Validators.required]),
      content: new FormControl('', [Validators.required]),
      image: new FormControl(null),
      category: new FormControl('', [Validators.required]),
    });
  }

  onImageChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.newsForm.patchValue({ image: file });
      this.newsForm.get('poster')?.updateValueAndValidity();
    }
  }

  onSubmit() {
    if (this.newsForm.valid) {
      const formData = new FormData();
      Object.keys(this.newsForm.controls).forEach((key) => {
        const value = this.newsForm.get(key)?.value;
        formData.append(key, value);
      });

      this.newsService.update(this.newsId, formData).subscribe({
        next: () => {
          this.toastr.success('Sửa tức thành công!', 'Success');
          this.router.navigate(['/admin/news']);
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
