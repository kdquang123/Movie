import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faBars,
  faChevronDown,
  faCog,
  faFilm,
  faSignOutAlt,
  faTicketAlt,
  faUser,
  IconDefinition,
} from '@fortawesome/free-solid-svg-icons';
import { AUTH_SERVICE } from '../../../../constants/injection/injection.constant';
import { IAuthService } from '../../../../services/auth/auth-service.interface';
import { UserInformation } from '../../../../models/auth/user-information.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-header',
  imports: [FontAwesomeModule, RouterLink, CommonModule],
  templateUrl: './user-header.component.html',
  styleUrl: './user-header.component.css',
})
export class UserHeaderComponent implements OnInit {
  public faFilm: IconDefinition = faFilm;
  public faBars: IconDefinition = faBars;
  faChevronDown = faChevronDown;
  faUser = faUser;
  faCog = faCog;
  faTicketAlt = faTicketAlt;
  faSignOutAlt = faSignOutAlt;
  public currentUser: UserInformation | null = null;
  public showDropdown = false;

  @Output() openLogin = new EventEmitter<void>();

  constructor(
    @Inject(AUTH_SERVICE) private readonly authService: IAuthService
  ) {}

  ngOnInit(): void {
    this.authService.getUserInformation().subscribe((userInfo) => {
      this.currentUser = userInfo;
    });
  }

  public logout(): void {
    this.authService.logout();
  }
}
