import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faFilm,
  faTachometerAlt,
  faTheaterMasks,
  faCalendarAlt,
  faTags,
  faUsers,
  faUserShield,
  faCog,
  faChevronLeft,
  faChevronRight,
  faNewspaper,
  faSliders,
  faTicketAlt,
  faStore,
  faCouch,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-admin-sidebar',
  imports: [FontAwesomeModule, CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './admin-sidebar.component.html',
  styleUrl: './admin-sidebar.component.css',
})
export class AdminSidebarComponent {
  // Icons
  faFilm = faFilm;
  faTachometerAlt = faTachometerAlt;
  faTheaterMasks = faTheaterMasks;
  faCalendarAlt = faCalendarAlt;
  faTags = faTags;
  faUsers = faUsers;
  faUserShield = faUserShield;
  faCog = faCog;
  faChevronLeft = faChevronLeft;
  faChevronRight = faChevronRight;
  faNewspaper = faNewspaper;
  faSliders = faSliders;
  faTicketAlt = faTicketAlt;
  faStore = faStore;
  faCouch = faCouch;

  @Output() emitToggleSidebar = new EventEmitter<void>();

  collapsed = false;

  toggleSidebar() {
    this.collapsed = !this.collapsed;
    this.emitToggleSidebar.emit();
  }
}
