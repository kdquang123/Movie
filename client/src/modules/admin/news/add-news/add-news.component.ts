import { CommonModule } from '@angular/common';
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCloudUploadAlt, faSave } from '@fortawesome/free-solid-svg-icons';
import { NgxEditorComponent, NgxEditorMenuComponent, Editor } from 'ngx-editor';
import { NEWS_SERVICE } from '../../../../constants/injection/injection.constant';
import { INewsService } from '../../../../services/news/news-service.interface';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-news',
  imports: [
    FontAwesomeModule,
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    NgxEditorComponent,
    NgxEditorMenuComponent,
  ],
  templateUrl: './add-news.component.html',
  styleUrl: './add-news.component.css',
})
export class AddNewsComponent implements OnInit, OnDestroy {
  faSave = faSave;
  faCloudUploadAlt = faCloudUploadAlt;

  newsForm!: FormGroup;

  editor!: Editor;

  imagePreview: string | ArrayBuffer | null = null;

  constructor(
    @Inject(NEWS_SERVICE) private readonly newsService: INewsService,
    private readonly toastr: ToastrService,
    private readonly router: Router
  ) {}

  ngOnDestroy(): void {
    this.editor.destroy();
  }
  ngOnInit(): void {
    this.editor = new Editor();
    this.createForm();
  }

  createForm() {
    this.newsForm = new FormGroup({
      title: new FormControl('', [Validators.required]),
      content: new FormControl('', [Validators.required]),
      image: new FormControl(null, [Validators.required]),
      category: new FormControl('', [Validators.required]),
    });
  }

  onImageChange(event: Event): void {
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

      this.newsService.create(formData).subscribe({
        next: () => {
          this.toastr.success('Thêm tin tức thành công!', 'Thành công');
          this.router.navigate(['/admin/newss']);
        },
        error: (error) => {
          this.toastr.error(error.error.message, 'Lỗi');
        },
      });
    } else {
      this.toastr.error('Vui lòng điền đầy đủ thông tin!', 'Lỗi');
    }
  }
}
