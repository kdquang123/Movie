import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-booking-failed',
  imports: [RouterLink, FontAwesomeModule],
  templateUrl: './booking-failed.component.html',
  styleUrl: './booking-failed.component.css',
})
export class BookingFailedComponent {
  faTimesCircle = faTimesCircle;
}
