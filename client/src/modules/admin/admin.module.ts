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
import { adminAuthGuard } from '../../guards/admin-auth.guard';
import { Title } from '@angular/platform-browser';

const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    data: { title: 'Tổng quan hệ thống' },
  },
  {
    path: 'movies/:id/detail',
    component: MovieDetailComponent,
    canActivate: [adminRoleGuard],
    data: { title: 'Quản lý phim' },
  },
  {
    path: 'movies/add',
    component: AddMovieComponent,
    canActivate: [adminRoleGuard],
    data: { title: 'Quản lý phim' },
  },
  {
    path: 'movies',
    component: MovieListComponent,
    canActivate: [adminRoleGuard],
    data: { title: 'Quản lý phim' },
  },
  {
    path: 'news/:id/detail',
    component: NewsDetailComponent,
    canActivate: [adminRoleGuard],
    data: { title: 'Quản lý tin tức' },
  },
  {
    path: 'news/add',
    component: AddNewsComponent,
    canActivate: [adminRoleGuard],
    data: { title: 'Quản lý tin tức' },
  },
  {
    path: 'news',
    component: NewsListComponent,
    canActivate: [adminRoleGuard],
    data: { title: 'Quản lý tin tức' },
  },
  {
    path: 'members/:id/detail',
    component: UserDetailComponent,
    canActivate: [adminAuthGuard],
    data: { title: 'Quản lý thành viên' },
  },
  {
    path: 'members/add',
    component: AddUserComponent,
    canActivate: [adminAuthGuard],
    data: { title: 'Quản lý thành viên' },
  },
  {
    path: 'members',
    component: UserListComponent,
    canActivate: [adminAuthGuard],
    data: { title: 'Quản lý thành viên' },
  },
  {
    path: 'employees/:id/detail',
    component: EmployeeDetailComponent,
    canActivate: [adminRoleGuard],
    data: { title: 'Quản lý nhân viên' },
  },
  {
    path: 'employees/add',
    component: AddEmployeeComponent,
    canActivate: [adminRoleGuard],
    data: { title: 'Quản lý nhân viên' },
  },
  {
    path: 'employees',
    component: EmployeeListComponent,
    canActivate: [adminRoleGuard],
    data: { title: 'Quản lý nhân viên' },
  },
  {
    path: 'showtimes/:id/detail',
    component: ShowtimeDetailComponent,
    canActivate: [adminRoleGuard],
    data: { title: 'Quản lý suất chiếu' },
  },
  {
    path: 'showtimes/add',
    component: AddShowtimeComponent,
    canActivate: [adminRoleGuard],
    data: { title: 'Quản lý suất chiếu' },
  },
  {
    path: 'showtimes',
    component: ShowtimeListComponent,
    canActivate: [adminRoleGuard],
    data: { title: 'Quản lý suất chiếu' },
  },
  {
    path: 'rooms/:id/detail',
    component: RoomDetailComponent,
    canActivate: [adminRoleGuard],
    data: { title: 'Quản lý phòng chiếu' },
  },
  {
    path: 'rooms/add',
    component: AddRoomComponent,
    canActivate: [adminRoleGuard],
    data: { title: 'Quản lý phòng chiếu' },
  },
  {
    path: 'rooms',
    component: RoomListComponent,
    canActivate: [adminRoleGuard],
    data: { title: 'Quản lý phòng chiếu' },
  },
  {
    path: 'promotions/:id/detail',
    component: PromotionDetailComponent,
    canActivate: [adminRoleGuard],
    data: { title: 'Quản lý khuyến mãi' },
  },
  {
    path: 'promotions/add',
    component: AddPromotionComponent,
    canActivate: [adminRoleGuard],
    data: { title: 'Quản lý khuyến mãi' },
  },
  {
    path: 'promotions',
    component: PromotionListComponent,
    canActivate: [adminRoleGuard],
    data: { title: 'Quản lý khuyến mãi' },
  },
  {
    path: 'products/:id/detail',
    component: ProductDetailComponent,
    canActivate: [adminRoleGuard],
    data: { title: 'Quản lý sản phẩm' },
  },
  {
    path: 'products/add',
    component: AddProductComponent,
    canActivate: [adminRoleGuard],
    data: { title: 'Quản lý sản phẩm' },
  },
  {
    path: 'products',
    component: ProductListComponent,
    canActivate: [adminRoleGuard],
    data: { title: 'Quản lý sản phẩm' },
  },
  {
    path: 'bookings',
    component: BookingListComponent,
    canActivate: [adminAuthGuard],
    data: { title: 'Quản lý vé đặt' },
  },
  { path: 'bookings/:id/detail', component: BookingDetailComponent },
  {
    path: 'bookings/create',
    component: CreateBookingComponent,
    canActivate: [adminAuthGuard],
  },
  {
    path: 'banners/:id/detail',
    component: BannerDetailComponent,
    canActivate: [adminRoleGuard],
    data: { title: 'Quản lý banner' },
  },
  {
    path: 'banners/add',
    component: AddBannerComponent,
    canActivate: [adminRoleGuard],
    data: { title: 'Quản lý banner' },
  },
  {
    path: 'banners',
    component: BannerListComponent,
    canActivate: [adminRoleGuard],
    data: { title: 'Quản lý banner' },
  },
  { path: '**', redirectTo: 'dashboard' },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class AdminModule {}
