import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NewsComponent } from './news/news.component';
import { MovieDetailComponent } from './movie-detail/movie-detail.component';
import { NewsDetailComponent } from './news-detail/news-detail.component';
import { BookingComponent } from './booking/booking.component';
import { MyTicketComponent } from './my-ticket/my-ticket.component';
import { BookingSuccessComponent } from './booking-result/booking-success/booking-success.component';
import { BookingFailedComponent } from './booking-result/booking-failed/booking-failed.component';
import { MovieCommingSoonComponent } from './movie-comming-soon/movie-comming-soon.component';
import { MovieNowShowingComponent } from './movie-now-showing/movie-now-showing.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
  },
  { path: 'movies/coming-soon', component: MovieCommingSoonComponent },
  { path: 'movies/now-showing', component: MovieNowShowingComponent },
  { path: 'movies/:id', component: MovieDetailComponent },
  { path: 'news/:id', component: NewsDetailComponent },
  { path: 'news', component: NewsComponent },
  { path: 'booking/:id', component: BookingComponent },
  { path: 'my-ticket', component: MyTicketComponent },
  { path: 'booking-success', component: BookingSuccessComponent },
  { path: 'booking-failed', component: BookingFailedComponent },
  { path: '**', redirectTo: 'home' },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class CustomerModule {}
