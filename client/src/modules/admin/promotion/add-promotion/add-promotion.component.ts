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
import { faSave } from '@fortawesome/free-solid-svg-icons';
import { PROMOTION_SERVICE } from '../../../../constants/injection/injection.constant';
import { IPromotionService } from '../../../../services/promotion/promotion-service.interface';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-promotion',
  imports: [FontAwesomeModule, CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './add-promotion.component.html',
  styleUrl: './add-promotion.component.css',
})
export class AddPromotionComponent implements OnInit {
  faSave = faSave;

  promotionForm!: FormGroup;
  constructor(
    @Inject(PROMOTION_SERVICE)
    private readonly promotionService: IPromotionService,
    private readonly toastr: ToastrService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.promotionForm = new FormGroup({
      name: new FormControl('', Validators.required),
      code: new FormControl('', Validators.required),
      description: new FormControl(''),
      startDate: new FormControl('', Validators.required),
      endDate: new FormControl('', Validators.required),
      discountType: new FormControl('', Validators.required),
      discountValue: new FormControl('', Validators.required),
      usageLimit: new FormControl(null),
      minOrderAmount: new FormControl(null),
    });
  }

  onSubmit() {
    if (this.promotionForm.valid) {
      this.promotionService.create(this.promotionForm.value).subscribe({
        next: (response) => {
          this.toastr.success('Thêm khuyễn mãi thành công', 'Thành công');
          this.router.navigate(['/admin/promotions']);
        },
        error: (error) => {
          this.toastr.error();
        },
      });
    }
  }
}
