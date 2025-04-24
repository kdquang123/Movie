import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NewsComponent } from './news/news.component';
import { MovieDetailComponent } from './movie-detail/movie-detail.component';
import { NewsDetailComponent } from './news-detail/news-detail.component';
import { BookingComponent } from './booking/booking.component';
import { MyTicketComponent } from './my-ticket/my-ticket.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
  },
  { path: 'movies/:id', component: MovieDetailComponent },
  { path: 'news/:id', component: NewsDetailComponent },
  { path: 'news', component: NewsComponent },
  { path: 'booking/:id', component: BookingComponent },
  { path: 'my-ticket', component: MyTicketComponent },
  { path: '**', redirectTo: 'home' },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class CustomerModule {}
