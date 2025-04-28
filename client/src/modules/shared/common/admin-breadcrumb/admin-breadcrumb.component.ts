import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterLink,
  RouterLinkActive,
} from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faChevronRight, faHome } from '@fortawesome/free-solid-svg-icons';
import { filter } from 'rxjs';

@Component({
  selector: 'app-admin-breadcrumb',
  imports: [FontAwesomeModule, CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './admin-breadcrumb.component.html',
  styleUrl: './admin-breadcrumb.component.css',
})
export class AdminBreadcrumbComponent implements OnInit {
  faHome = faHome;
  faChevronRight = faChevronRight;
  breadcrumbs: { label: string; url: string }[] = [];

  constructor(
    private readonly router: Router,
    private readonly route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.createBreadcrumbs();
      });
    this.createBreadcrumbs();
  }

  private createBreadcrumbs(): void {
    this.breadcrumbs = [];
    let currentRoute = this.route.root;
    let url = '';
    console.log('currentRoute:' + currentRoute);

    while (currentRoute.children.length) {
      let child = currentRoute.children[0];
      console.log(child);

      let routeURL = child.snapshot.url.map((seg) => seg.path).join('/');
      if (routeURL) {
        url += `/${routeURL}`;
      }

      const label = 'test';
      if (label) {
        this.breadcrumbs.push({ label, url });
      }

      currentRoute = child;
    }
    console.log(this.breadcrumbs);
  }
}
