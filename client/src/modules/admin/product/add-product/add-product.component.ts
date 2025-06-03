import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCloudUploadAlt, faSave } from '@fortawesome/free-solid-svg-icons';
import { IProductService } from '../../../../services/product/product-service.interface';
import { PRODUCT_SERVICE } from '../../../../constants/injection/injection.constant';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-product',
  imports: [FontAwesomeModule, CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css',
})
export class AddProductComponent implements OnInit {
  faSave = faSave;
  faCloundUploadAlt = faCloudUploadAlt;

  productForm!: FormGroup;

  imagePreview: string | ArrayBuffer | null = null;

  constructor(
    @Inject(PRODUCT_SERVICE) private readonly productService: IProductService,
    private readonly router: Router,
    private readonly toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.productForm = new FormGroup({
      productImage: new FormControl(null, Validators.required), // For the file input
      name: new FormControl('', Validators.required),
      price: new FormControl(null, [Validators.required, Validators.min(0)]),
      description: new FormControl(''),
      quantity: new FormControl(null, Validators.min(0)),
    });
  }

  onFileSelected(event: Event): void {
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
      this.productForm.patchValue({ productImage: file });
      this.productForm.get('productImage')?.updateValueAndValidity();
    }
  }

  onSubmit(): void {
    if (this.productForm.valid) {
      const formData = new FormData();
      Object.keys(this.productForm.controls).forEach((key) => {
        const value = this.productForm.get(key)?.value;

        formData.append(key, value);
      });

      this.productService.createProduct(formData).subscribe({
        next: () => {
          this.toastr.success('Thêm sản phẩm thành công!', 'Thành công');
          this.router.navigate(['/admin/products']);
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
