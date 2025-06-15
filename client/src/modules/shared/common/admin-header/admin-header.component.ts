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
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterLink,
} from '@angular/router';
import { filter, map, mergeMap } from 'rxjs';

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

  headerTitle!: string;

  constructor(
    @Inject(AUTH_SERVICE) private readonly authService: IAuthService,
    private readonly router: Router,
    private readonly route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.authService.getUserInformation().subscribe((userInfo) => {
      this.currentUser = userInfo;
    });

    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        map(() => {
          let route = this.route;
          while (route.firstChild) {
            route = route.firstChild;
          }
          return route;
        }),
        mergeMap((route) => route.data)
      )
      .subscribe((data) => {
        this.headerTitle = data['title'] || '';
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
