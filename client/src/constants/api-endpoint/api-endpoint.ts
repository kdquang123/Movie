import { environment } from '../../environments/environment';

export const ApiEndpoints = {
  //Auth api
  login: `${environment.apiUrl}/Auth/login`,
  register: `${environment.apiUrl}/Auth/register`,
  logout: `${environment.apiUrl}/Auth/logout`,
  resetPassword: `${environment.apiUrl}/Auth/reset-password`,
  forgotPassword: `${environment.apiUrl}/Auth/forgot-password`,

  //Common api
  getAllCategory: `${environment.apiUrl}/Common/categories`,
  getAllAgeRestriction: `${environment.apiUrl}/Common/age-restrictions`,
  getAllMovieStatus: `${environment.apiUrl}/Common/movie-statuses`,

  //Movie api
  getAllMovie: `${environment.apiUrl}/Movies`,
  getMovieById: `${environment.apiUrl}/Movies`,
  deleteMovie: `${environment.apiUrl}/Movies`,
  updateMovie: `${environment.apiUrl}/Movies`,
  createMovie: `${environment.apiUrl}/Movies/add`,
  searchMovie: `${environment.apiUrl}/Movies/search`,
  getNowPlayingMovies: `${environment.apiUrl}/Movies/now-playing`,
  getCommingSoonMovies: `${environment.apiUrl}/Movies/comming-soon`,
  getAllAvailableMovie: `${environment.apiUrl}/Movies/available`,

  //Room api
  getAllRoom: `${environment.apiUrl}/Rooms`,
  getRoomById: `${environment.apiUrl}/Rooms`,
  deleteRoom: `${environment.apiUrl}/Rooms`,
  updateRoom: `${environment.apiUrl}/Rooms`,
  createRoom: `${environment.apiUrl}/Rooms/add`,
  getRoomByMovieId: `${environment.apiUrl}/Rooms/movie`,
  searchRoom: `${environment.apiUrl}/Rooms/search`,
  getRoomByShowTimeId: `${environment.apiUrl}/Rooms/showtime`,
  getAllRoomType: `${environment.apiUrl}/Common/room-types`,

  //Seat api
  changeSeatType: `${environment.apiUrl}/Seats/change-type`,

  //Showtime api
  getAllShowtime: `${environment.apiUrl}/Showtimes`,
  getShowtimeById: `${environment.apiUrl}/Showtimes`,
  getShowtimeByDate: `${environment.apiUrl}/Showtimes/date`,
  getShowtimeByMovieId: `${environment.apiUrl}/Showtimes/movie`,
  deleteShowtime: `${environment.apiUrl}/Showtimes`,
  updateShowtime: `${environment.apiUrl}/Showtimes`,
  createShowtime: `${environment.apiUrl}/Showtimes/add`,
  searchShowtime: `${environment.apiUrl}/Showtimes/search`,

  //
  seatHubUrl: `http://localhost:5095/seathub`,

  //Booking api
  createBooking: `${environment.apiUrl}/Bookings/create`,

  //Product api
  getAllProduct: `${environment.apiUrl}/Products`,
  getProductById: `${environment.apiUrl}/Products`,
  deleteProduct: `${environment.apiUrl}/Products`,
  updateProduct: `${environment.apiUrl}/Products`,
  createProduct: `${environment.apiUrl}/Products/add`,
  searchProduct: `${environment.apiUrl}/Products/search`,
};
