import { Component } from '@angular/core';
import { faFilm, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import {
  faFacebook,
  faInstagram,
  faTwitter,
  faYoutube,
} from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-user-footer',
  imports: [FontAwesomeModule],
  templateUrl: './user-footer.component.html',
  styleUrl: './user-footer.component.css',
})
export class UserFooterComponent {
  public faFilm: IconDefinition = faFilm;
  public faFacebook: IconDefinition = faFacebook;
  public faTwitter: IconDefinition = faTwitter;
  public faInstagram: IconDefinition = faInstagram;
  public faYoutube: IconDefinition = faYoutube;
}
