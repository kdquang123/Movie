import { Component } from '@angular/core';
import { MasterDataComponent } from '../../master-data/master-data.component';
import { RoomModel } from '../../../../models/room/room.model';
import { TableComponent } from '../../../shared/common/table/table.component';
import { RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-room-list',
  imports: [TableComponent, RouterLink, FontAwesomeModule],
  templateUrl: './room-list.component.html',
  styleUrl: './room-list.component.css',
})
export class RoomListComponent extends MasterDataComponent<RoomModel> {}
