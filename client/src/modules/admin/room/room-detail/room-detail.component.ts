import { Component, Inject, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { faSave } from '@fortawesome/free-solid-svg-icons';
import { RoomTypeModel } from '../../../../models/room/room-type.model';
import {
  COMMON_SERVICE,
  ROOM_SERVICE,
  SEAT_SERVICE,
} from '../../../../constants/injection/injection.constant';
import { ICommonService } from '../../../../services/common/common-service.interface';
import { IRoomService } from '../../../../services/room/room-service.interface';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SeatModel } from '../../../../models/seat/seat.model';
import { ISeatService } from '../../../../services/seat/seat-service.interface';

@Component({
  selector: 'app-room-detail',
  imports: [CommonModule, ReactiveFormsModule, RouterLink, FontAwesomeModule],
  templateUrl: './room-detail.component.html',
  styleUrl: './room-detail.component.css',
})
export class RoomDetailComponent implements OnInit {
  faSave = faSave;

  public roomForm!: FormGroup;
  public roomTypeList: RoomTypeModel[] = [];
  roomId: string = '';
  isShowSeatMap: boolean = false;
  seatMap: SeatModel[] = [];
  seatRows: number = 0;
  seatColumns: number = 0;
  selectedId: string = '';

  constructor(
    @Inject(COMMON_SERVICE) private readonly commonService: ICommonService,
    @Inject(ROOM_SERVICE) private readonly roomService: IRoomService,
    @Inject(SEAT_SERVICE) private readonly seatService: ISeatService,
    private readonly toastr: ToastrService,
    private readonly route: ActivatedRoute,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.createForm();
    this.commonService.getAllRoomType().subscribe((response) => {
      this.roomTypeList = response;
    });

    this.roomId = this.route.snapshot.paramMap.get('id')!;
    this.roomService.getRoomById(this.roomId).subscribe((response) => {
      this.roomForm.patchValue({
        name: response.name,
        seatQuantity: response.seatQuantity,
        roomTypeId: response.roomType?.id,
        status: response.status,
      });
      this.seatMap = response.seats!;
      this.seatRows = response.totalRows;
      this.seatColumns = response.totalColumns;
      console.log(this.seatMap);
    });
  }

  createForm(): void {
    this.roomForm = new FormGroup({
      name: new FormControl('', Validators.required),
      roomTypeId: new FormControl('', Validators.required),
      seatQuantity: new FormControl(
        { value: null, disabled: true },
        Validators.required
      ),
      status: new FormControl({ value: '', disabled: true }),
    });
  }

  onSubmit(): void {
    if (this.roomForm.invalid) {
      this.toastr.error('Vui lòng điền đầy đủ thông tin!');
      return;
    }

    const roomData = {
      id: this.roomId,
      name: this.roomForm.value.name,
      roomTypeId: this.roomForm.value.roomTypeId,
      seatQuantity: this.roomForm.value.seatQuantity,
      status: this.roomForm.value.status,
    };

    this.roomService.updateRoom(this.roomId, roomData).subscribe({
      next: (response) => {
        if (response) {
          this.toastr.success('Cập nhật thành công!');
          this.router.navigate(['/admin/rooms']);
        } else {
          this.toastr.error('Cập nhật thất bại!');
        }
      },
      error: (error) => {
        this.toastr.error('Cập nhật thất bại!');
      },
    });
  }

  onCancel(): void {
    this.router.navigate(['/admin/rooms']);
  }

  generateArray(n: number): number[] {
    return Array.from({ length: n }, (_, i) => i);
  }

  selectSeat(id: string | undefined): void {
    if (!id) return;
    this.selectedId = id;
  }

  changeSeatType(seatType: number): void {
    if (!this.selectedId) return;
    this.seatService
      .changeSeatType(this.selectedId, seatType)
      .subscribe((response) => {
        if (response) {
          this.toastr.success('Thay đổi thành công!');
          this.seatMap = this.seatMap.map((seat) => {
            if (seat.id === this.selectedId) {
              seat.type =
                seatType === 0 ? 'Normal' : seatType === 1 ? 'Vip' : 'Disabled';
            }
            return seat;
          });
        } else {
          this.toastr.error('Thay đổi thất bại!');
        }
      });
  }
}
