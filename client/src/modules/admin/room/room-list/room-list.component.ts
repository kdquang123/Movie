import { Component, Inject, OnInit } from '@angular/core';
import { MasterDataComponent } from '../../master-data/master-data.component';
import { RoomModel } from '../../../../models/room/room.model';
import { TableComponent } from '../../../shared/common/table/table.component';
import { Router, RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RoomTypeModel } from '../../../../models/room/room-type.model';
import { TableColumn } from '../../../shared/common/table/table-column.model';
import {
  COMMON_SERVICE,
  ROOM_SERVICE,
} from '../../../../constants/injection/injection.constant';
import { IRoomService } from '../../../../services/room/room-service.interface';
import { ToastrService } from 'ngx-toastr';
import { ICommonService } from '../../../../services/common/common-service.interface';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-room-list',
  imports: [
    TableComponent,
    RouterLink,
    FontAwesomeModule,
    CommonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './room-list.component.html',
  styleUrl: './room-list.component.css',
})
export class RoomListComponent
  extends MasterDataComponent<RoomModel>
  implements OnInit
{
  public statusList: any[] = [];
  public roomTypeList: RoomTypeModel[] = [];

  public override columns: TableColumn[] = [
    { name: 'Tên phòng', value: 'name' },
    {
      name: 'Loại phòng',
      value: 'roomType',
      formatter: this.formatRoomType.bind(this),
    },
    {
      name: 'Tổng số ghế',
      value: 'seatQuantity',
    },
    {
      name: 'Trạng thái',
      value: 'status',
    },
  ];

  constructor(
    @Inject(ROOM_SERVICE) private readonly roomService: IRoomService,
    @Inject(COMMON_SERVICE) private readonly commonService: ICommonService,
    private readonly router: Router,
    private readonly toastr: ToastrService
  ) {
    super();
  }

  public override ngOnInit(): void {
    this.commonService.getAllRoomType().subscribe((response) => {
      this.roomTypeList = response;
    });
    this.createForm();
    this.searchData();
  }

  protected override createForm(): void {
    this.searchForm = new FormGroup({
      keyword: new FormControl(''),
      status: new FormControl(''),
      roomTypeId: new FormControl(''),
    });
  }

  public override searchData(): void {
    this.roomService.search(this.filter).subscribe((res) => {
      this.data = res;
    });
  }

  public detail(id: string): void {
    this.router.navigate(['/admin/rooms', id, 'detail']);
  }

  public delete(id: string): void {
    this.roomService.deleteRoom(id).subscribe({
      next: () => {
        this.toastr.success('Xóa phòng thành công!');
        this.searchData();
      },
      error: () => {
        this.toastr.error('Xóa phòng thất bại!');
      },
    });
  }

  private formatRoomType(room: RoomModel): string {
    return room.roomType?.name ?? 'N/A';
  }
}
