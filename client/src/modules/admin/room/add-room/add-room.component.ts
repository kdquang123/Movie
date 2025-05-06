import { Component, Inject, OnInit } from '@angular/core';
import {
  COMMON_SERVICE,
  ROOM_SERVICE,
} from '../../../../constants/injection/injection.constant';
import { ICommonService } from '../../../../services/common/common-service.interface';
import { IRoomService } from '../../../../services/room/room-service.interface';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RoomTypeModel } from '../../../../models/room/room-type.model';
import { CommonModule } from '@angular/common';
import { faSave } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-room',
  imports: [ReactiveFormsModule, CommonModule, FontAwesomeModule, RouterLink],
  templateUrl: './add-room.component.html',
  styleUrl: './add-room.component.css',
})
export class AddRoomComponent implements OnInit {
  faSave = faSave;

  roomForm!: FormGroup;
  roomTypeList: RoomTypeModel[] = [];
  constructor(
    @Inject(COMMON_SERVICE) private readonly commonService: ICommonService,
    @Inject(ROOM_SERVICE) private readonly roomService: IRoomService,
    private readonly toastr: ToastrService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.commonService.getAllRoomType().subscribe((response) => {
      this.roomTypeList = response;
    });

    this.createForm();
  }

  createForm(): void {
    this.roomForm = new FormGroup({
      name: new FormControl('', Validators.required),
      roomTypeId: new FormControl('', Validators.required),
      totalRows: new FormControl(null, Validators.required),
      totalColumns: new FormControl(null, Validators.required),
    });
  }

  onSubmit(): void {
    if (this.roomForm.valid) {
      this.roomService.createRoom(this.roomForm.value).subscribe({
        next: () => {
          this.toastr.success('Thêm phòng thành công!', 'Success');
          this.router.navigate(['/admin/rooms']);
        },
        error: (error) => {
          this.toastr.error('Thêm thất bại!', 'Lỗi');
        },
      });
    } else {
      this.toastr.error('Vui lòng điền đầy đủ thông tin!', 'Lỗi');
    }
  }
}
