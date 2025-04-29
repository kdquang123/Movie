import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faApple,
  faFacebook,
  faGoogle,
} from '@fortawesome/free-brands-svg-icons';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-login-and-register-modal',
  imports: [FontAwesomeModule, CommonModule],
  templateUrl: './login-and-register-modal.component.html',
  styleUrl: './login-and-register-modal.component.css',
})
export class LoginAndRegisterModalComponent {
  faFacebook = faFacebook;
  faGoogle = faGoogle;
  faApple = faApple;
  faTimes = faTimes;

  public isModalVisible = false;
  public isLoginDisplay = true;

  @Output() public closeLoginModal = new EventEmitter<void>();

  openLogin() {
    this.isLoginDisplay = true;
  }

  openRegister() {
    this.isLoginDisplay = false;
  }
}
