import { Injectable } from '@angular/core';
import { IAuthService } from './auth-service.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements IAuthService{

  constructor() { }
}
