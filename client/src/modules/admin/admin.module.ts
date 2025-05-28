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
import { adminRoleGuard } from '../../guards/admin-role.guard';

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  {
    path: 'movies/:id/detail',
    component: MovieDetailComponent,
    canActivate: [adminRoleGuard],
  },
  {
    path: 'movies/add',
    component: AddMovieComponent,
    canActivate: [adminRoleGuard],
  },
  {
    path: 'movies',
    component: MovieListComponent,
    canActivate: [adminRoleGuard],
  },
  {
    path: 'news/:id/detail',
    component: NewsDetailComponent,
    canActivate: [adminRoleGuard],
  },
  {
    path: 'news/add',
    component: AddNewsComponent,
    canActivate: [adminRoleGuard],
  },
  { path: 'news', component: NewsListComponent, canActivate: [adminRoleGuard] },
  {
    path: 'members/:id/detail',
    component: UserDetailComponent,
  },
  {
    path: 'members/add',
    component: AddUserComponent,
  },
  {
    path: 'members',
    component: UserListComponent,
  },
  {
    path: 'employees/:id/detail',
    component: EmployeeDetailComponent,
    canActivate: [adminRoleGuard],
  },
  {
    path: 'employees/add',
    component: AddEmployeeComponent,
    canActivate: [adminRoleGuard],
  },
  {
    path: 'employees',
    component: EmployeeListComponent,
    canActivate: [adminRoleGuard],
  },
  {
    path: 'showtimes/:id/detail',
    component: ShowtimeDetailComponent,
    canActivate: [adminRoleGuard],
  },
  {
    path: 'showtimes/add',
    component: AddShowtimeComponent,
    canActivate: [adminRoleGuard],
  },
  {
    path: 'showtimes',
    component: ShowtimeListComponent,
    canActivate: [adminRoleGuard],
  },
  {
    path: 'rooms/:id/detail',
    component: RoomDetailComponent,
    canActivate: [adminRoleGuard],
  },
  {
    path: 'rooms/add',
    component: AddRoomComponent,
    canActivate: [adminRoleGuard],
  },
  {
    path: 'rooms',
    component: RoomListComponent,
    canActivate: [adminRoleGuard],
  },
  {
    path: 'promotions/:id/detail',
    component: PromotionDetailComponent,
    canActivate: [adminRoleGuard],
  },
  {
    path: 'promotions/add',
    component: AddPromotionComponent,
    canActivate: [adminRoleGuard],
  },
  {
    path: 'promotions',
    component: PromotionListComponent,
    canActivate: [adminRoleGuard],
  },
  {
    path: 'products/:id/detail',
    component: ProductDetailComponent,
    canActivate: [adminRoleGuard],
  },
  {
    path: 'products/add',
    component: AddProductComponent,
    canActivate: [adminRoleGuard],
  },
  {
    path: 'products',
    component: ProductListComponent,
    canActivate: [adminRoleGuard],
  },
  {
    path: 'bookings',
    component: BookingListComponent,
  },
  { path: 'bookings/:id/detail', component: BookingDetailComponent },
  { path: 'bookings/create', component: CreateBookingComponent },
  {
    path: 'banners/:id/detail',
    component: BannerDetailComponent,
    canActivate: [adminRoleGuard],
  },
  {
    path: 'banners/add',
    component: AddBannerComponent,
    canActivate: [adminRoleGuard],
  },
  {
    path: 'banners',
    component: BannerListComponent,
    canActivate: [adminRoleGuard],
  },
  { path: '**', redirectTo: 'dashboard' },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class AdminModule {}
