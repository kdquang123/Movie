import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faCalendarAlt,
  faClock,
  faEye,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-news',
  imports: [FontAwesomeModule],
  templateUrl: './news.component.html',
  styleUrl: './news.component.css',
})
export class NewsComponent {
  faClock = faClock;
  faEye = faEye;
  faCalendarAlt = faCalendarAlt;
}
