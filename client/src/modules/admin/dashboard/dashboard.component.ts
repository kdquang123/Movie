import { Component, Inject, OnInit } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faFilm,
  faTicketAlt,
  faUsers,
  faWallet,
} from '@fortawesome/free-solid-svg-icons';
import {
  BOOKING_SERVICE,
  MEMBER_SERVICE,
  MOVIE_SERVICE,
  TICKET_SERVICE,
} from '../../../constants/injection/injection.constant';
import { IMovieService } from '../../../services/movie/movie-service.interface';
import { ITicketService } from '../../../services/ticket/ticket-service.interface';
import { IMemberService } from '../../../services/member/member-service.interface';
import { IBookingService } from '../../../services/booking/booking-service.interface';

@Component({
  selector: 'app-dashboard',
  imports: [FontAwesomeModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  faWallet = faWallet;
  faTicketAlt = faTicketAlt;
  faFilm = faFilm;
  faUsers = faUsers;

  numOfNowShowingMovies: number = 0;
  currentMonthTickets: number = 0;
  currentMonthRevenue: number = 0;
  newMembers: number = 0;

  constructor(
    @Inject(MOVIE_SERVICE) private readonly movieService: IMovieService,
    @Inject(TICKET_SERVICE) private readonly ticketService: ITicketService,
    @Inject(BOOKING_SERVICE) private readonly bookingService: IBookingService,
    @Inject(MEMBER_SERVICE) private readonly memberService: IMemberService
  ) {}

  ngOnInit(): void {
    this.movieService.getNowPlayingMovies().subscribe((movies) => {
      this.numOfNowShowingMovies = movies.length;
    });

    this.ticketService.getCurrentMonthTickets().subscribe((tickets) => {
      this.currentMonthTickets = tickets.length;
    });

    this.memberService.getNewMembers().subscribe((members) => {
      this.newMembers = members.length;
    });

    this.bookingService.getCurrentMonthBookings().subscribe((bookings) => {
      this.currentMonthRevenue = bookings.reduce(
        (total, booking) => total + booking.totalPrice,
        0
      );
    });
  }

  convertThousandToMillion(amountInThousand: number): string {
    return (amountInThousand / 1000000).toFixed(3);
  }
}
