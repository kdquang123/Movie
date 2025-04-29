import { Component } from '@angular/core';
import { MasterDataComponent } from '../../master-data/master-data.component';
import { PromotionModel } from '../../../../models/promotion/promotion.model';
import { TableComponent } from '../../../shared/common/table/table.component';
import { RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-promotion-list',
  imports: [TableComponent, RouterLink, FontAwesomeModule],
  templateUrl: './promotion-list.component.html',
  styleUrl: './promotion-list.component.css',
})
export class PromotionListComponent extends MasterDataComponent<PromotionModel> {}
