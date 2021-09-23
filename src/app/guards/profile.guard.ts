import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { DataUserService } from '../services/data-user.service';

@Injectable({
  providedIn: 'root'
})
export class ProfileGuard implements CanActivate {

  constructor(
    private authService:AuthService,
  ) {
    
  }

  canActivate(): boolean {
    if (!this.authService.validProfile()) {
      window.location.replace('/perfil');
      return false
    }
    return true
  }
  
}
