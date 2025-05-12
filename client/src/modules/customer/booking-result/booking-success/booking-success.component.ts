import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-booking-success',
  imports: [RouterLink, FontAwesomeModule],
  templateUrl: './booking-success.component.html',
  styleUrl: './booking-success.component.css',
})
export class BookingSuccessComponent {
  faCheckCircle = faCheckCircle;
}
