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

  //Seat hold
  seatHubUrl: `http://localhost:5095/seathub`,

  //Booking api
  createBooking: `${environment.apiUrl}/Bookings/create`,
  getBookingByUserId: `${environment.apiUrl}/Bookings/user/`,

  //Product api
  getAllProduct: `${environment.apiUrl}/Products`,
  getProductById: `${environment.apiUrl}/Products`,
  deleteProduct: `${environment.apiUrl}/Products`,
  updateProduct: `${environment.apiUrl}/Products`,
  createProduct: `${environment.apiUrl}/Products/add`,
  searchProduct: `${environment.apiUrl}/Products/search`,

  //Ticket api
  getTicketByShowtimeId: `${environment.apiUrl}/Tickets/showtime`,
  getTicketByBookingId: `${environment.apiUrl}/Tickets/booking`,
  getTicketByTicketCode: `${environment.apiUrl}/Tickets/code`,
  approveTicket: `${environment.apiUrl}/Tickets/approve`,

  //Employee api
  getAllEmployee: `${environment.apiUrl}/Employees`,
  getEmployeeById: `${environment.apiUrl}/Employees`,
  deleteEmployee: `${environment.apiUrl}/Employees`,
  updateEmployee: `${environment.apiUrl}/Employees`,
  createEmployee: `${environment.apiUrl}/Employees`,
  searchEmployee: `${environment.apiUrl}/Employees/search`,

  //Member api
  getAllMember: `${environment.apiUrl}/Members`,
  getMemberById: `${environment.apiUrl}/Members`,
  deleteMember: `${environment.apiUrl}/Members`,
  updateMember: `${environment.apiUrl}/Members`,
  createMember: `${environment.apiUrl}/Members`,
  searchMember: `${environment.apiUrl}/Members/search`,

  //Promotion api
  getAllPromotion: `${environment.apiUrl}/Promotions`,
  getPromotionById: `${environment.apiUrl}/Promotions`,
  deletePromotion: `${environment.apiUrl}/Promotions`,
  updatePromotion: `${environment.apiUrl}/Promotions`,
  createPromotion: `${environment.apiUrl}/Promotions`,
  searchPromotion: `${environment.apiUrl}/Promotions/search`,

  //News api
  getAllNews: `${environment.apiUrl}/News`,
  getNewsById: `${environment.apiUrl}/News`,
  deleteNews: `${environment.apiUrl}/News`,
  updateNews: `${environment.apiUrl}/News`,
  createNews: `${environment.apiUrl}/News`,
  searchNews: `${environment.apiUrl}/News/search`,

  //Movie review api
  getReviewByMovieId: `${environment.apiUrl}/FilmReviews/movie`,
  createReview: `${environment.apiUrl}/FilmReviews`,
  deleteReview: `${environment.apiUrl}/FilmReviews`,

  //Banner api
  getAllBanner: `${environment.apiUrl}/Banners`,
  getBannerById: `${environment.apiUrl}/Banners`,
  createBanner: `${environment.apiUrl}/Banners`,
  deleteBanner: `${environment.apiUrl}/Banners`,
  updateBanner: `${environment.apiUrl}/Banners`,
  searchBanner: `${environment.apiUrl}/Banners/search`,
};
