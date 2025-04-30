import { environment } from '../../environments/environment';

export const ApiEndpoints = {
  login: `${environment.apiUrl}/Auth/login`,
  register: `${environment.apiUrl}/Auth/register`,
  logout: `${environment.apiUrl}/Auth/logout`,
  resetPassword: `${environment.apiUrl}/Auth/reset-password`,
  forgotPassword: `${environment.apiUrl}/Auth/forgot-password`,
};
