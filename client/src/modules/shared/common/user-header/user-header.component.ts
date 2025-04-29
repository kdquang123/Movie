import { Component, EventEmitter, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faBars,
  faFilm,
  IconDefinition,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-user-header',
  imports: [FontAwesomeModule, RouterLink],
  templateUrl: './user-header.component.html',
  styleUrl: './user-header.component.css',
})
export class UserHeaderComponent {
  public faFilm: IconDefinition = faFilm;
  public faBars: IconDefinition = faBars;

  @Output() openLogin = new EventEmitter<void>();
}
