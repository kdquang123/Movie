import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCalendarAlt, faClock, faCommentAlt, faDownload, faEdit, faHistory, faMapMarkerAlt, faPrint, faRedoAlt, faShareAlt, faStar, faTicketAlt, faUndoAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-my-ticket',
  imports: [FontAwesomeModule],
  templateUrl: './my-ticket.component.html',
  styleUrl: './my-ticket.component.css',
})
export class MyTicketComponent {
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
}
