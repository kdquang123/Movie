import { Component } from '@angular/core';
import { MasterDataComponent } from '../../master-data/master-data.component';
import { BannerModel } from '../../../../models/banner/banner.model';
import { TableComponent } from '../../../shared/common/table/table.component';
import { RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-banner-list',
  imports: [TableComponent, RouterLink, FontAwesomeModule],
  templateUrl: './banner-list.component.html',
  styleUrl: './banner-list.component.css',
})
export class BannerListComponent extends MasterDataComponent<BannerModel> {}
