import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faSave } from '@fortawesome/free-solid-svg-icons';
import { PROMOTION_SERVICE } from '../../../../constants/injection/injection.constant';
import { IPromotionService } from '../../../../services/promotion/promotion-service.interface';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-promotion-detail',
  imports: [FontAwesomeModule, CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './promotion-detail.component.html',
  styleUrl: './promotion-detail.component.css',
})
export class PromotionDetailComponent implements OnInit {
  faSave = faSave;
  promotionId!: string;

  promotionForm!: FormGroup;
  constructor(
    @Inject(PROMOTION_SERVICE)
    private readonly promotionService: IPromotionService,
    private readonly toastr: ToastrService,
    private readonly route: ActivatedRoute,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.promotionId = this.route.snapshot.params['id'];
    this.createForm();
    this.promotionService.getById(this.promotionId).subscribe((response) => {
      this.promotionForm.patchValue({
        name: response.name,
        code: response.code,
        description: response.description,
        startDate: response.startDate
          ? new Date(
              new Date(response.startDate).getTime() + 7 * 60 * 60 * 1000
            )
              .toISOString()
              .split('T')[0]
          : '',
        endDate: response.endDate
          ? new Date(new Date(response.endDate).getTime() + 7 * 60 * 60 * 1000)
              .toISOString()
              .split('T')[0]
          : '',
        discountType: response.discountType,
        discountValue: response.discountValue,
        usageLimit: response.usageLimit,
        minOrderAmount: response.minOrderAmount,
      });
    });
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
      this.promotionService
        .update(this.promotionId, this.promotionForm.value)
        .subscribe({
          next: (response) => {
            this.toastr.success('Sửa khuyến mãi thành công', 'Thành công');
            this.router.navigate(['/admin/promotions']);
          },
          error: (error) => {
            this.toastr.error();
          },
        });
    }
  }
}
