import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MovieListComponent } from './movie/movie-list/movie-list.component';
import { NewsListComponent } from './news/news-list/news-list.component';
import { UserListComponent } from './user/user-list/user-list.component';
import { EmployeeListComponent } from './employee/employee-list/employee-list.component';
import { ShowtimeListComponent } from './showtime/showtime-list/showtime-list.component';
import { PromotionListComponent } from './promotion/promotion-list/promotion-list.component';
import { BookingListComponent } from './booking/booking-list/booking-list.component';
import { RoomListComponent } from './room/room-list/room-list.component';
import { AddMovieComponent } from './movie/add-movie/add-movie.component';
import { NewsDetailComponent } from './news/news-detail/news-detail.component';
import { AddNewsComponent } from './news/add-news/add-news.component';
import { UserDetailComponent } from './user/user-detail/user-detail.component';
import { AddUserComponent } from './user/add-user/add-user.component';
import { AddEmployeeComponent } from './employee/add-employee/add-employee.component';
import { EmployeeDetailComponent } from './employee/employee-detail/employee-detail.component';
import { ShowtimeDetailComponent } from './showtime/showtime-detail/showtime-detail.component';
import { AddShowtimeComponent } from './showtime/add-showtime/add-showtime.component';
import { RoomDetailComponent } from './room/room-detail/room-detail.component';
import { AddRoomComponent } from './room/add-room/add-room.component';
import { PromotionDetailComponent } from './promotion/promotion-detail/promotion-detail.component';
import { AddPromotionComponent } from './promotion/add-promotion/add-promotion.component';
import { ProductDetailComponent } from './product/product-detail/product-detail.component';
import { AddProductComponent } from './product/add-product/add-product.component';
import { ProductListComponent } from './product/product-list/product-list.component';
import { BannerDetailComponent } from './banner/banner-detail/banner-detail.component';
import { AddBannerComponent } from './banner/add-banner/add-banner.component';
import { BannerListComponent } from './banner/banner-list/banner-list.component';
import { CreateBookingComponent } from './booking/create-booking/create-booking.component';
import { BookingDetailComponent } from './booking/booking-detail/booking-detail.component';
import { MovieDetailComponent } from './movie/movie-detail/movie-detail.component';

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'movies/:id/detail', component: MovieDetailComponent },
  { path: 'movies/add', component: AddMovieComponent },
  { path: 'movies', component: MovieListComponent },
  { path: 'news/:id/detail', component: NewsDetailComponent },
  { path: 'news/add', component: AddNewsComponent },
  { path: 'news', component: NewsListComponent },
  { path: 'members/:id/detail', component: UserDetailComponent },
  { path: 'members/add', component: AddUserComponent },
  { path: 'members', component: UserListComponent },
  { path: 'employees/:id/detail', component: EmployeeDetailComponent },
  { path: 'employees/add', component: AddEmployeeComponent },
  { path: 'employees', component: EmployeeListComponent },
  { path: 'showtimes/:id/detail', component: ShowtimeDetailComponent },
  { path: 'showtimes/add', component: AddShowtimeComponent },
  { path: 'showtimes', component: ShowtimeListComponent },
  { path: 'rooms/:id/detail', component: RoomDetailComponent },
  { path: 'rooms/add', component: AddRoomComponent },
  { path: 'rooms', component: RoomListComponent },
  { path: 'promotions/:id/detail', component: PromotionDetailComponent },
  { path: 'promotions/add', component: AddPromotionComponent },
  { path: 'promotions', component: PromotionListComponent },
  { path: 'products/:id/detail', component: ProductDetailComponent },
  { path: 'products/add', component: AddProductComponent },
  { path: 'products', component: ProductListComponent },
  { path: 'bookings', component: BookingListComponent },
  { path: 'bookings/:id/detail', component: BookingDetailComponent },
  { path: 'bookings/create', component: CreateBookingComponent },
  { path: 'banners/:id/detail', component: BannerDetailComponent },
  { path: 'banners/add', component: AddBannerComponent },
  { path: 'banners', component: BannerListComponent },
  { path: '**', redirectTo: 'dashboard' },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class AdminModule {}
