import { Component } from '@angular/core';
import { MasterDataComponent } from '../../master-data/master-data.component';
import { BookingModel } from '../../../../models/booking/booking.model';
import { TableComponent } from '../../../shared/common/table/table.component';
import { RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-booking-list',
  imports: [TableComponent, RouterLink, FontAwesomeModule],
  templateUrl: './booking-list.component.html',
  styleUrl: './booking-list.component.css',
})
export class BookingListComponent extends MasterDataComponent<BookingModel> {}
