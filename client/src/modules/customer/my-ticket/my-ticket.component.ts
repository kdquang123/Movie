import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faCalendarAlt,
  faClock,
  faCommentAlt,
  faDownload,
  faEdit,
  faHistory,
  faMapMarkerAlt,
  faPrint,
  faRedoAlt,
  faShareAlt,
  faStar,
  faTicketAlt,
  faUndoAlt,
} from '@fortawesome/free-solid-svg-icons';
import {
  AUTH_SERVICE,
  BOOKING_SERVICE,
} from '../../../constants/injection/injection.constant';
import { IAuthService } from '../../../services/auth/auth-service.interface';
import { IBookingService } from '../../../services/booking/booking-service.interface';
import { BookingModel } from '../../../models/booking/booking.model';

@Component({
  selector: 'app-my-ticket',
  imports: [FontAwesomeModule, CommonModule],
  templateUrl: './my-ticket.component.html',
  styleUrl: './my-ticket.component.css',
})
export class MyTicketComponent implements OnInit {
  faTicketAlt = faTicketAlt;
  faCalendarAlt = faCalendarAlt;
  faClock = faClock;
  faMapMarkerAlt = faMapMarkerAlt;
  faDownload = faDownload;
  faPrint = faPrint;
  faShareAlt = faShareAlt;
  faUndoAlt = faUndoAlt;
  faRedoAlt = faRedoAlt;
  faCommentAlt = faCommentAlt;
  faEdit = faEdit;
  faHistory = faHistory;
  faStar = faStar;

  userId!: string;
  bookingList: BookingModel[] = [];
  showingBookingList: BookingModel[] = [];

  isShowTicketDetail: string[] = [];

  constructor(
    @Inject(AUTH_SERVICE) private readonly authService: IAuthService,
    @Inject(BOOKING_SERVICE) private readonly bookingService: IBookingService
  ) {}

  ngOnInit(): void {
    this.authService.getUserInformation().subscribe((response) => {
      this.userId = response!.id;
      this.bookingService
        .getBookingByUserId(this.userId)
        .subscribe((response) => {
          this.bookingList = response;
          this.showingBookingList = this.bookingList;
          console.log('bookingList:', this.bookingList);
          console.log('showing:', this.showingBookingList);
        });
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

  getSeatList(booking: BookingModel): string {
    return booking.tickets.map((t) => t.seat.seatName).join(', ');
  }

  showSeletedProduct(booking: BookingModel): string {
    let selectedProduct = '';
    for (let bookingDetail of booking.bookingDetails) {
      if (bookingDetail.quantity > 0) {
        selectedProduct += `${bookingDetail.product.name} x ${bookingDetail.quantity}, `;
      }
    }
    return selectedProduct.slice(0, -2);
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
        return 'ĐÃ HỦY';
      default:
        return 'CHƯA THANH TOÁN';
    }
  }

  showTicketDetail(bookingId: string): void {
    if (this.isShowTicketDetail.includes(bookingId)) {
      this.isShowTicketDetail = this.isShowTicketDetail.filter(
        (id) => id !== bookingId
      );
    } else {
      this.isShowTicketDetail.push(bookingId);
    }
  }

  checkShowTicketDetail(bookingId: string): boolean {
    return this.isShowTicketDetail.includes(bookingId);
  }
}
