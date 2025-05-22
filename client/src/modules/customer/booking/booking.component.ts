import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import {
  AUTH_SERVICE,
  BOOKING_SERVICE,
  PRODUCT_SERVICE,
  SEAT_HOLD_SERVICE,
  SEAT_SERVICE,
  SHOWTIME_SERVICE,
  TICKET_SERVICE,
} from '../../../constants/injection/injection.constant';
import { IShowtimeService } from '../../../services/showtime/showtime-service.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { ISeatService } from '../../../services/seat/seat-service.interface';
import { ShowtimeModel } from '../../../models/showtime/showtime.model';
import { SeatModel } from '../../../models/seat/seat.model';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { ISeatHoldService } from '../../../services/seat-hold/seathold-service.interface';
import { IAuthService } from '../../../services/auth/auth-service.interface';
import { SeatHoldModel } from '../../../models/seat/seathold.model';
import { ToastrService } from 'ngx-toastr';
import { IBookingService } from '../../../services/booking/booking-service.interface';
import { ITicketService } from '../../../services/ticket/ticket-service.interface';
import { IProductService } from '../../../services/product/product-service.interface';
import { ProductModel } from '../../../models/product/product.model';
import { BookingDetailModel } from '../../../models/booking/booking-detail.model';

@Component({
  selector: 'app-booking',
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './booking.component.html',
  styleUrl: './booking.component.css',
})
export class BookingComponent implements OnInit, OnDestroy {
  faArrowLeft = faArrowLeft;
  faArrowRight = faArrowRight;

  showtimeId: string = '';
  showtime!: ShowtimeModel;
  seatList: SeatModel[] = [];
  seatRows: number = 0;
  seatColumns: number = 0;
  seatIdSelected: string = '';
  userId!: string;
  heldSeats: SeatHoldModel[] = [];
  bookedSeats: SeatModel[] = [];
  myListSeats: SeatModel[] = [];

  productList: ProductModel[] = [];
  bookingDetailList: BookingDetailModel[] = [];

  isShowPayment: boolean = false;
  paymentMethod: string = '';

  isCountdownStarted: boolean = false;
  countdownTime: number = 15 * 60;
  countdownInterval: any;

  constructor(
    @Inject(SHOWTIME_SERVICE)
    private readonly showtimeService: IShowtimeService,
    @Inject(BOOKING_SERVICE)
    private readonly bookingService: IBookingService,
    @Inject(SEAT_HOLD_SERVICE)
    private readonly seatHoldService: ISeatHoldService,
    @Inject(AUTH_SERVICE) private readonly authService: IAuthService,
    @Inject(TICKET_SERVICE) private readonly ticketService: ITicketService,
    @Inject(PRODUCT_SERVICE) private readonly productService: IProductService,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.showtimeId = this.route.snapshot.paramMap.get('id')!;
    this.authService.getUserInformation().subscribe((response) => {
      this.userId = response!.id;
    });
    this.showtimeService
      .getShowtimeById(this.showtimeId)
      .subscribe((response) => {
        this.showtime = response;
        this.seatList = this.showtime.room?.seats || [];
        this.seatRows = this.showtime.room?.totalRows ?? 0;
        this.seatColumns = this.showtime.room?.totalColumns ?? 0;
      });

    this.ticketService
      .getByShowtimeId(this.showtimeId)
      .subscribe((response) => {
        this.bookedSeats = response.map((ticket) => {
          return ticket.seat;
        });
      });

    this.productService.getAllProduct().subscribe((response) => {
      this.productList = response;
      this.bookingDetailList = this.productList.map((product) => {
        return {
          product: product,
          quantity: 0,
        };
      });
    });

    this.seatHoldService.connect(this.showtimeId).then(() => {
      this.seatHoldService
        .getHubConnection()
        .on('ReceiveHeldSeats', (heldSeats: SeatHoldModel[]) => {
          this.heldSeats = heldSeats;
          if (this.showtime.room?.seats) {
            this.myListSeats = this.showtime.room.seats.filter((seat) =>
              this.getMyListHoldSeatId().includes(seat.id)
            );
          }
        });
    });
  }

  ngOnDestroy(): void {
    this.seatHoldService.disconnect(this.showtimeId);
    if (this.countdownInterval) {
      clearInterval(this.countdownInterval);
    }
  }

  generateArray(n: number): number[] {
    return Array.from({ length: n }, (_, i) => i);
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

  public getYearOfDate(date: Date) {
    return new Date(date).getFullYear();
  }

  onSeatClick(seatId: string) {
    if (this.checkSoldSeat(seatId)) {
      this.toastr.error('Ghế đã được đặt', 'Thông báo');
      return;
    }
    if (this.checkMySeat(seatId)) {
      this.seatHoldService.releaseSeat(this.showtimeId, seatId, this.userId);
      return;
    }

    if (!this.checkAvailableSeat(seatId)) {
      this.toastr.error('Ghế đã được đặt', 'Thông báo');
      return;
    }

    this.seatHoldService.holdSeats(this.showtimeId, seatId, this.userId);
    if (!this.isCountdownStarted) {
      this.isCountdownStarted = true;

      this.countdownInterval = setInterval(() => {
        if (this.countdownTime > 0) {
          this.countdownTime--;
        } else {
          clearInterval(this.countdownInterval);
          this.toastr.error('Hết giờ', 'Thông báo');
          this.router.navigate(['/movies', this.showtime.movie?.id]);
        }
      }, 1000);
    }
  }

  updateProductSelect(productId: string, isAdd: boolean): void {
    for (let bookingDetail of this.bookingDetailList) {
      if (bookingDetail.product.id == productId) {
        if (isAdd) {
          bookingDetail.quantity++;
        } else if (bookingDetail.quantity > 0) {
          bookingDetail.quantity--;
        }
      }
    }
  }

  showSeletedProduct(): string {
    let selectedProduct = '';
    for (let bookingDetail of this.bookingDetailList) {
      if (bookingDetail.quantity > 0) {
        selectedProduct += `${bookingDetail.product.name} x ${bookingDetail.quantity}, `;
      }
    }
    return selectedProduct.slice(0, -2);
  }

  getTotalProductPrice(): number {
    let totalPrice = 0;
    for (let bookingDetail of this.bookingDetailList) {
      totalPrice += bookingDetail.product.price * bookingDetail.quantity;
    }
    return totalPrice;
  }

  getQuantity(productId: string): number | null {
    const item = this.bookingDetailList.find(
      (item) => item.product.id === productId
    );
    return item ? item.quantity : null;
  }

  getMyListHoldSeatId(): string[] {
    return this.heldSeats
      .filter((seat) => seat.userId === this.userId)
      .map((seat) => seat.seatId);
  }

  getMySeatNameList(): string {
    return this.myListSeats.map((seat) => seat.seatName).join(', ');
  }

  checkAvailableSeat(seatId: string): boolean {
    for (let heldSeat of this.heldSeats) {
      if (heldSeat.seatId === seatId && heldSeat.userId !== this.userId) {
        return false;
      }
    }
    return true;
  }

  checkSoldSeat(seatId: string): boolean {
    for (let bookedSeat of this.bookedSeats) {
      if (bookedSeat.id === seatId) {
        return true;
      }
    }
    return false;
  }

  checkMySeat(seatId: string): boolean {
    for (let heldSeat of this.heldSeats) {
      if (heldSeat.seatId === seatId && heldSeat.userId === this.userId) {
        return true;
      }
    }
    return false;
  }

  getTotalSeatPrice(): number {
    let seatTotalPrice = 0;
    if (
      new Date(this.showtime.startTime).getDay() != 0 &&
      new Date(this.showtime.startTime).getDay() != 6
    ) {
      seatTotalPrice = this.myListSeats.reduce((total, seat) => {
        if (seat.type == 'Vip') {
          return (
            total +
            this.showtime.basePrice +
            (this.showtime.room?.roomType?.extraPrice ?? 0)
          );
        } else {
          return total + this.showtime.basePrice;
        }
      }, 0);
    } else {
      seatTotalPrice = this.myListSeats.reduce((total, seat) => {
        if (seat.type == 'Vip') {
          return (
            total +
            this.showtime.weekendPrice +
            (this.showtime.room?.roomType?.extraPrice ?? 0)
          );
        } else {
          return total + this.showtime.weekendPrice;
        }
      }, 0);
    }
    return seatTotalPrice;
  }

  handleGoBack(): void {
    if (this.isShowPayment) {
      this.isShowPayment = false;
    } else {
      this.router.navigate(['/movies', this.showtime.movie?.id]);
    }
  }

  handleContinue(): void {
    if (this.isShowPayment == true && this.paymentMethod !== '') {
      this.bookingService
        .createBooking({
          userId: this.userId,
          showtime: this.showtime,
          seatList: this.myListSeats,
          productList: this.bookingDetailList.filter(
            (item) => item.quantity > 0
          ),
          paymentMethod: this.paymentMethod,
          promotionCode: '',
        })
        .subscribe({
          next: (response) => {
            window.location.href = response.paymentUrl;
          },
          error: (error) => {
            console.log(error);
          },
        });
    } else if (this.isShowPayment == true && this.paymentMethod == '') {
      this.toastr.error('Chưa chọn hình thức thanh toán', 'Thông báo');
    }

    if (this.myListSeats.length > 0) {
      this.isShowPayment = true;
    } else {
      this.toastr.error('Chưa chọn ghế nào', 'Thông báo');
    }
  }

  selectPaymentMethod(method: string) {
    this.paymentMethod = method;
  }

  formatCountDownTime(seconds: number): string {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${min.toString().padStart(2, '0')}:${sec
      .toString()
      .padStart(2, '0')}`;
  }
}
