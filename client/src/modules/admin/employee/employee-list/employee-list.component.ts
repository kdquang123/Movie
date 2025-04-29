import { Component } from '@angular/core';
import { MasterDataComponent } from '../../master-data/master-data.component';
import { EmployeeModel } from '../../../../models/employee/employee.model';
import { TableComponent } from '../../../shared/common/table/table.component';
import { RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-employee-list',
  imports: [TableComponent, RouterLink, FontAwesomeModule],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.css',
})
export class EmployeeListComponent extends MasterDataComponent<EmployeeModel> {}
