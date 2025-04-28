import { Component } from '@angular/core';
import { AdminSidebarComponent } from '../../common/admin-sidebar/admin-sidebar.component';
import { AdminHeaderComponent } from '../../common/admin-header/admin-header.component';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AdminBreadcrumbComponent } from "../../common/admin-breadcrumb/admin-breadcrumb.component";

@Component({
  selector: 'app-admin-layout',
  imports: [
    AdminSidebarComponent,
    AdminHeaderComponent,
    RouterOutlet,
    CommonModule,
    AdminBreadcrumbComponent
],
  templateUrl: './admin-layout.component.html',
  styleUrl: './admin-layout.component.css',
})
export class AdminLayoutComponent {
  public isSidebarToggle = false;
  public toggleSidebar() {
    this.isSidebarToggle = !this.isSidebarToggle;
  }
}
