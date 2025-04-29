import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPlay, faStar, faTicketAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-movie-detail',
  imports: [FontAwesomeModule],
  templateUrl: './movie-detail.component.html',
  styleUrl: './movie-detail.component.css',
})
export class MovieDetailComponent {
  faTicket = faTicketAlt;
  faStar = faStar;
  faPlay = faPlay;
}
