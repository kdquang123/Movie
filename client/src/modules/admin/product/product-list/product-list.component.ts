import { Component, Inject } from '@angular/core';
import { MasterDataComponent } from '../../master-data/master-data.component';
import { ProductModel } from '../../../../models/product/product.model';
import { TableComponent } from '../../../shared/common/table/table.component';
import { Router, RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TableColumn } from '../../../shared/common/table/table-column.model';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { PRODUCT_SERVICE } from '../../../../constants/injection/injection.constant';
import { IProductService } from '../../../../services/product/product-service.interface';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-list',
  imports: [TableComponent, RouterLink, FontAwesomeModule, ReactiveFormsModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css',
})
export class ProductListComponent extends MasterDataComponent<ProductModel> {
  public override columns: TableColumn[] = [
    { name: 'Tên sản phẩm', value: 'name' },
    { name: 'Giá', value: 'price' },
    { name: 'Số lượng tồn kho', value: 'quantity' },
    {
      name: 'Trạng thái',
      value: 'isActive',
      formatter: this.formatProducStatus.bind(this),
    },
  ];

  constructor(
    @Inject(PRODUCT_SERVICE) private readonly productService: IProductService,
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
    });
  }

  public override searchData(): void {
    this.productService.searchProduct(this.filter).subscribe((res) => {
      this.data = res;
    });
  }

  public detail(id: string): void {
    this.router.navigate(['/admin/products', id, 'detail']);
  }

  public delete(id: string): void {
    this.productService.deleteProduct(id).subscribe({
      next: () => {
        this.toastr.success('Xóa sản phẩm thành công!');
        this.searchData();
      },
      error: () => {
        this.toastr.error('Xóa sản phẩmF thất bại!');
      },
    });
  }

  formatProducStatus(productModel: ProductModel): string {
    if (!productModel.isActive) return 'Ngừng kinh doanh';
    return productModel.quantity ? 'Còn hàng' : 'Hết hàng';
  }
}
