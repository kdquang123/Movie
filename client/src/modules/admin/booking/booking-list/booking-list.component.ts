import { Component, Inject, OnInit } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  faCheckCircle,
  faPrint,
  faQrcode,
  faSearch,
} from '@fortawesome/free-solid-svg-icons';
import { TicketOfBookingModel } from '../../../../models/ticket/ticket-of-booking.model';
import { TICKET_SERVICE } from '../../../../constants/injection/injection.constant';
import { ITicketService } from '../../../../services/ticket/ticket-service.interface';
import { ToastrService } from 'ngx-toastr';
import { BookingModel } from '../../../../models/booking/booking.model';

@Component({
  selector: 'app-booking-list',
  imports: [CommonModule, FontAwesomeModule, FormsModule],
  templateUrl: './booking-list.component.html',
  styleUrl: './booking-list.component.css',
})
export class BookingListComponent {
  faSearch = faSearch;
  faQrcode = faQrcode;
  faCheckCircle = faCheckCircle;
  faPrint = faPrint;

  ticketCode: string = '';
  ticket!: TicketOfBookingModel;
  notFound: boolean = false;

  constructor(
    @Inject(TICKET_SERVICE) private readonly ticketService: ITicketService,
    private readonly toastr: ToastrService
  ) {}

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
    return `${selectedProduct.slice(0, -2)} (${this.getBoookingStatus(booking)})`;
  }

  getBoookingStatus(booking: BookingModel): string {
    if (booking.bookingStatus == 'CheckedIn') {
      return 'ĐÃ NHẬN';
    } else {
      return 'CHƯA NHẬN';
    }
  }
}
