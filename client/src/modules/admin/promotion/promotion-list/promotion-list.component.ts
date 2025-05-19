import { Component, Inject, OnInit } from '@angular/core';
import { MasterDataComponent } from '../../master-data/master-data.component';
import { PromotionModel } from '../../../../models/promotion/promotion.model';
import { TableComponent } from '../../../shared/common/table/table.component';
import { Router, RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PROMOTION_SERVICE } from '../../../../constants/injection/injection.constant';
import { IPromotionService } from '../../../../services/promotion/promotion-service.interface';
import { ToastrService } from 'ngx-toastr';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TableColumn } from '../../../shared/common/table/table-column.model';

@Component({
  selector: 'app-promotion-list',
  imports: [TableComponent, RouterLink, FontAwesomeModule, ReactiveFormsModule],
  templateUrl: './promotion-list.component.html',
  styleUrl: './promotion-list.component.css',
})
export class PromotionListComponent
  extends MasterDataComponent<PromotionModel>
  implements OnInit
{
  public override columns: TableColumn[] = [
    { name: 'Tiêu đề', value: 'name' },
    {
      name: 'Mã khuyến mãi',
      value: 'code',
    },
    {
      name: 'Loại khuyến mãi',
      value: 'discountType',
    },
    {
      name: 'Giá trị khuyến mãi',
      value: 'discountValue',
    },
    {
      name: 'Trạng thái',
      value: 'startDate',
      formatter: (promotion: PromotionModel) =>
        new Date(promotion.startDate) > new Date()
          ? 'Chưa diễn ra'
          : new Date(promotion.startDate) <= new Date() &&
            new Date() <= new Date(promotion.endDate)
          ? 'Đang diễn ra'
          : 'Đã kết thúc',
    },
  ];

  constructor(
    @Inject(PROMOTION_SERVICE)
    private readonly promotionService: IPromotionService,
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
      status: new FormControl(''),
      discountType: new FormControl(''),
    });
  }

  public override searchData(): void {
    this.promotionService.search(this.filter).subscribe((res) => {
      this.data = res;
    });
  }

  public detail(id: string): void {
    this.router.navigate(['/admin/promotions', id, 'detail']);
  }

  public delete(id: string): void {
    this.promotionService.delete(id).subscribe({
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
