import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faFilm,
  faTicketAlt,
  faUser,
  faUsers,
  faWallet,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-dashboard',
  imports: [FontAwesomeModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  faWallet = faWallet;
  faTicketAlt = faTicketAlt;
  faFilm = faFilm;
  faUsers = faUsers;
}
