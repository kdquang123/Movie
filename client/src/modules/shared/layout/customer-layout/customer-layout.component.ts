import { Component } from '@angular/core';
import { UserHeaderComponent } from '../../common/user-header/user-header.component';
import { UserFooterComponent } from '../../common/user-footer/user-footer.component';
import { RouterOutlet } from '@angular/router';
import { LoginAndRegisterModalComponent } from '../../../auth/login-and-register-modal/login-and-register-modal.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-customer-layout',
  imports: [
    UserHeaderComponent,
    UserFooterComponent,
    RouterOutlet,
    LoginAndRegisterModalComponent,
    CommonModule,
  ],
  templateUrl: './customer-layout.component.html',
  styleUrl: './customer-layout.component.css',
})
export class CustomerLayoutComponent {
  public isModalOpen = false;

  public openLoginModal(): void {
    this.isModalOpen = true;
  }

  public closeLoginModal(): void {
    this.isModalOpen = false;
  }
}
