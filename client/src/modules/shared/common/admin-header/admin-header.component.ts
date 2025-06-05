import { Component, Inject, OnInit } from '@angular/core';
import { AUTH_SERVICE } from '../../../../constants/injection/injection.constant';
import { IAuthService } from '../../../../services/auth/auth-service.interface';
import { UserInformation } from '../../../../models/auth/user-information.model';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CommonModule } from '@angular/common';
import {
  faChevronDown,
  faCog,
  faShieldAlt,
  faSignOutAlt,
  faUserCog,
} from '@fortawesome/free-solid-svg-icons';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-admin-header',
  imports: [FontAwesomeModule, CommonModule, RouterLink],
  templateUrl: './admin-header.component.html',
  styleUrl: './admin-header.component.css',
})
export class AdminHeaderComponent implements OnInit {
  public currentUser: UserInformation | null = null;
  faChevronDown = faChevronDown;
  faUserCog = faUserCog;
  faCog = faCog;
  faShieldAlt = faShieldAlt;
  faSignOutAlt = faSignOutAlt;

  isDropdownOpen = false;

  constructor(
    @Inject(AUTH_SERVICE) private readonly authService: IAuthService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.authService.getUserInformation().subscribe((userInfo) => {
      this.currentUser = userInfo;
    });
  }

  public logout(): void {
    this.authService.logout();
    this.router.navigate(['home']);
  }

  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
  }
}
