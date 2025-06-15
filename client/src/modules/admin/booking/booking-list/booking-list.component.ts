import { Component, Inject, OnInit } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import {
  faCheckCircle,
  faPrint,
  faQrcode,
} from '@fortawesome/free-solid-svg-icons';
import { TicketOfBookingModel } from '../../../../models/ticket/ticket-of-booking.model';
import {
  BOOKING_SERVICE,
  TICKET_SERVICE,
} from '../../../../constants/injection/injection.constant';
import { ITicketService } from '../../../../services/ticket/ticket-service.interface';
import { ToastrService } from 'ngx-toastr';
import { BookingModel } from '../../../../models/booking/booking.model';
import { MasterDataComponent } from '../../master-data/master-data.component';
import { TableComponent } from '../../../shared/common/table/table.component';
import { TableColumn } from '../../../shared/common/table/table-column.model';
import { TicketModel } from '../../../../models/ticket/ticket.model';
import { IBookingService } from '../../../../services/booking/booking-service.interface';
import { OrderDirection } from '../../../../models/search.model';

@Component({
  selector: 'app-booking-list',
  imports: [
    CommonModule,
    FontAwesomeModule,
    FormsModule,
    TableComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './booking-list.component.html',
  styleUrl: './booking-list.component.css',
})
export class BookingListComponent extends MasterDataComponent<BookingModel> {
  faQrcode = faQrcode;
  faCheckCircle = faCheckCircle;
  faPrint = faPrint;

  ticketCode: string = '';
  ticket!: TicketOfBookingModel;
  notFound: boolean = false;

  constructor(
    @Inject(TICKET_SERVICE) private readonly ticketService: ITicketService,
    @Inject(BOOKING_SERVICE) private readonly bookingService: IBookingService,
    private readonly toastr: ToastrService
  ) {
    super();
  }

  public override columns: TableColumn[] = [
    { name: 'Mã đơn', value: 'bookingCode' },
    {
      name: 'Người đặt',
      value: 'user',
      formatter: (b) => b.user.fullName,
    },
    {
      name: 'Phim',
      value: 'showtime',
      formatter: (b) => b.showtime.movie.name,
    },
    {
      name: 'Ghế',
      value: 'tickets',
      formatter: this.getSeatList.bind(this),
    },
    {
      name: 'Trạng thái',
      value: 'bookingStatus',
      formatter: this.getBoookingStatus.bind(this),
      style: this.getStatusStyle.bind(this),
    },
  ];

  override ngOnInit(): void {
    this.createForm();
    this.searchData();
  }

  protected override searchData(): void {
    this.bookingService.search(this.filter).subscribe((res) => {
      this.data = res;
    });
  }

  protected override createForm(): void {
    this.searchForm = new FormGroup({
      keyword: new FormControl(''),
      status: new FormControl(''),
    });
  }

  searchTicket() {
    if (!this.ticketCode) return;
    this.ticketService.getTicketByTicketCode(this.ticketCode).subscribe({
      next: (response) => {
        this.ticket = response;
        this.notFound = false;
      },
      error: (error) => {
        if (error.error.message) {
          this.toastr.error(error.error.message, 'Lỗi');
        }
        this.notFound = true;
      },
    });
  }

  scanQR() {
    alert('Chức năng quét QR code sẽ được triển khai sau');
  }

  approveTicket() {
    this.ticketService.approveTicket(this.ticket.ticketCode).subscribe({
      next: (response) => {
        if (response) {
          this.ticket.isUsed = true;
          this.toastr.success('Đã duyệt vé!', 'Success');
        } else {
          this.toastr.error('Đã có lỗi xảy ra!', 'Error');
        }
      },
      error: () => {
        this.toastr.error('Đã có lỗi xảy ra!', 'Error');
      },
    });
  }

  public formatDate(date: Date): string {
    const newDate = new Date(date);
    return `${newDate.getDate().toString().padStart(2, '0')}/${(
      newDate.getMonth() + 1
    )
      .toString()
      .padStart(2, '0')}/${newDate.getFullYear()}`;
  }

  getStartTimeOfShowTime(dateTime: Date): string {
    const hour = new Date(dateTime).getHours().toString().padStart(2, '0');
    const minute = new Date(dateTime).getMinutes().toString().padStart(2, '0');
    return `${hour}:${minute}`;
  }

  showSeletedProduct(booking: BookingModel): string {
    if (!booking.bookingDetails || booking.bookingDetails.length === 0) {
      return 'Không có sản phẩm';
    }
    let selectedProduct = '';
    for (let bookingDetail of booking.bookingDetails) {
      if (bookingDetail.quantity > 0) {
        selectedProduct += `${bookingDetail.product.name} x ${bookingDetail.quantity}, `;
      }
    }
    return `${selectedProduct.slice(0, -2)} (${this.getBoookingStatus(
      booking
    )})`;
  }

  detail(id: string) {}

  delete(id: string) {}

  createBooking(): void {
    alert('Chức năng tạo vé thủ công sẽ được triển khai sau');
  }

  getSeatList(booking: BookingModel): string {
    return booking.tickets.map((t) => t.seat.seatName).join(', ');
  }

  getBoookingStatus(booking: BookingModel): string {
    switch (booking.bookingStatus) {
      case 'Pending':
        return 'CHƯA THANH TOÁN';
      case 'Paid':
        return 'ĐÃ THANH TOÁN';
      case 'CheckedIn':
        return 'ĐÃ CHECK-IN';
      case 'Cancelled':
        return 'ĐÃ HẾT HẠN';
      default:
        return 'CHƯA THANH TOÁN';
    }
  }

  getStatusStyle(booking: BookingModel): string {
    switch (booking.bookingStatus) {
      case 'Pending':
        return 'text-white text-center rounded-full bg-green-500 inline px-2 py-1';
      case 'Paid':
        return 'text-white text-center rounded-full bg-yellow-500 inline px-2 py-1';
      case 'CheckedIn':
        return 'text-white text-center rounded-full bg-green-500 inline px-2 py-1';
      case 'Cancelled':
        return 'text-white text-center rounded-full bg-red-500 inline px-2 py-1';
      default:
        return 'text-white text-center rounded-full bg-green-500 inline px-2 py-1';
    }
  }
}
