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

  //Movie api
  getAllMovie: ``,
  getMovieById: ``,
  deleteMovie: ``,
  updateMovie: ``,
  createMovie: `${environment.apiUrl}/Movies/add`,
  searchMovie: ``,
};
