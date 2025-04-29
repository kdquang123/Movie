import { Component } from '@angular/core';
import { TableComponent } from '../../../shared/common/table/table.component';
import { MasterDataComponent } from '../../master-data/master-data.component';
import { ShowtimeModel } from '../../../../models/showtime/showtime.model';
import { RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-showtime-list',
  imports: [TableComponent, RouterLink, FontAwesomeModule],
  templateUrl: './showtime-list.component.html',
  styleUrl: './showtime-list.component.css',
})
export class ShowtimeListComponent extends MasterDataComponent<ShowtimeModel> {}
