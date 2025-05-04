import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  FontAwesomeModule,
  IconDefinition,
} from '@fortawesome/angular-fontawesome';
import { PaginatedResult } from '../../../../models/paginated-result.model';
import { CommonModule } from '@angular/common';
import {
  faChevronLeft,
  faChevronRight,
  faEdit,
  faEye,
  faPlus,
  faRotate,
  faSearch,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { TableColumn } from './table-column.model';
import { FormsModule } from '@angular/forms';
import { ConfirmModalComponent } from '../modals/confirm-modal/confirm-modal.component';

@Component({
  selector: 'app-table',
  imports: [
    FontAwesomeModule,
    CommonModule,
    FormsModule,
    ConfirmModalComponent,
  ],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css',
})
export class TableComponent {
  public faEdit: IconDefinition = faEdit;
  public faTrash: IconDefinition = faTrash;
  public faPlus: IconDefinition = faPlus;
  public faSearch: IconDefinition = faSearch;
  public faRotate: IconDefinition = faRotate;
  public faChevronRight: IconDefinition = faChevronRight;
  public faChevronLeft: IconDefinition = faChevronLeft;
  public faEye: IconDefinition = faEye;

  @Input() columns: TableColumn[] = [];
  @Input() public isShowNumber?: boolean = true;
  @Input() public currentPage: number = 1;
  @Input() public currentPageSize: number = 10;

  @Input() public data!: PaginatedResult<any>;

  @Input() public pageSizeOptions: number[] = [5, 10, 25, 50, 100];

  @Output() public onView: EventEmitter<string> = new EventEmitter<string>();

  @Output() public onDelete: EventEmitter<string> = new EventEmitter<string>();

  @Output() public onPageSizeChange: EventEmitter<any> =
    new EventEmitter<any>();

  @Output() public onPageChange: EventEmitter<number> =
    new EventEmitter<number>();

  public isOpenModal: boolean = false;

  private selectedId: string = '';

  public generatePageItems(): number[] {
    if (!this.data) {
      return [];
    }

    const totalPage = this.data.totalPages;
    return Array.from({ length: totalPage }, (_, i) => i + 1);
  }

  public generatePageInfo(): string {
    if (this.data) {
      return `Page ${this.currentPageSize * (this.data.pageNumber - 1) + 1} -
       ${
         this.currentPageSize * this.data.pageNumber > this.data.totalCount
           ? this.data.totalCount
           : this.currentPageSize * this.data.pageNumber
       } of ${this.data.totalCount}`;
    }

    return '';
  }

  onHandleDetele(): void {
    this.isOpenModal = false;
    this.onDelete.emit(this.selectedId);
  }

  public onCloseModal(): void {
    this.isOpenModal = false;
    this.selectedId = '';
  }

  public openModal(id: string): void {
    this.isOpenModal = true;
    this.selectedId = id;
  }
}
