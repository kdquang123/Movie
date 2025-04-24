import { Component } from '@angular/core';
import { MasterDataComponent } from '../../master-data/master-data.component';
import { ProductModel } from '../../../../models/product/product.model';
import { TableComponent } from '../../../shared/common/table/table.component';
import { RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-product-list',
  imports: [TableComponent, RouterLink, FontAwesomeModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css',
})
export class ProductListComponent extends MasterDataComponent<ProductModel> {}
