import { Component } from '@angular/core';
import { MasterDataComponent } from '../../master-data/master-data.component';
import { MovieModel } from '../../../../models/movie/movie.model';
import { TableComponent } from '../../../shared/common/table/table.component';
import { RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-movie-list',
  imports: [TableComponent, RouterLink, FontAwesomeModule],
  templateUrl: './movie-list.component.html',
  styleUrl: './movie-list.component.css',
})
export class MovieListComponent extends MasterDataComponent<MovieModel> {}
