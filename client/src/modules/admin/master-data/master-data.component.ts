import { Component } from '@angular/core';
import { IconDefinition } from '@fortawesome/angular-fontawesome';
import {
  faFilter,
  faPlus,
  faRedoAlt,
  faRotate,
  faSearch,
} from '@fortawesome/free-solid-svg-icons';
import { OrderDirection, SearchModel } from '../../../models/search.model';
import { PaginatedResult } from '../../../models/paginated-result.model';
import { FormGroup } from '@angular/forms';
import { TableColumn } from '../../shared/common/table/table-column.model';

@Component({
  selector: 'app-master-data',
  imports: [],
  templateUrl: './master-data.component.html',
  styleUrl: './master-data.component.css',
})
export class MasterDataComponent<T> {
  //#region Font Awesome icons
  public faPlus: IconDefinition = faPlus;
  public faSearch: IconDefinition = faSearch;
  public faRotate: IconDefinition = faRotate;
  public faRedoAlt: IconDefinition = faRedoAlt;
  public faFilter: IconDefinition = faFilter;

  //#endregion

  public isShowDetail: boolean = false;
  public selectedItem!: T | undefined | null;
  public filter: SearchModel = {
    keyword: '',
    pageNumber: 1,
    pageSize: 5,
    orderBy: 'name',
    orderDirection: OrderDirection.ASC,
    includeInactive: true,
  };
  public currentPage: number = 1;
  public currentPageSize: number = 5;
  public pageSizeOptions: number[] = [5, 10, 20, 50];

  public searchForm!: FormGroup;

  public data!: PaginatedResult<T>;

  public columns: TableColumn[] = [
    { name: 'Name', value: 'name' },
    { name: 'Description', value: 'description' },
  ];

  constructor() {}

  ngOnInit(): void {
    this.createForm();
    this.searchData();
  }

  protected createForm(): void {}

  protected searchData(): void {}

  public onSubmit(): void {
    // Gan gia tri tu form vao filter => Keyword
    Object.assign(this.filter, this.searchForm.value);
    this.searchData();
  }

  public onCloseDetail(): void {
    console.log('Event send from detail');
    this.isShowDetail = false;
    this.searchData();
  }

  public onPageChange(page: number): void {
    this.filter.pageNumber = page;
    if (page < 0 || page > this.data.totalPages || page === this.currentPage) {
      return;
    }

    this.currentPage = page;
    this.searchData();
  }

  public onPageSizeChange(event: any): void {
    this.filter.pageSize = event.target.value;
    this.searchData();
  }
}
