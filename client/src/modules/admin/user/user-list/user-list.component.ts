import { Component } from '@angular/core';
import { TableComponent } from '../../../shared/common/table/table.component';
import { MasterDataComponent } from '../../master-data/master-data.component';
import { MemberModel } from '../../../../models/member/member.model';
import { RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-user-list',
  imports: [TableComponent, RouterLink, FontAwesomeModule],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css',
})
export class UserListComponent extends MasterDataComponent<MemberModel> {}
