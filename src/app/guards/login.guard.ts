import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor(
    private authService:AuthService,
  ){}

  canActivate(): boolean {
    if (this.authService.validToken()) {
      window.location.replace('/panel-why/dashboard');
      return false
    }else{
      return true
    }
  }
}
