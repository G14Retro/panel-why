import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService:AuthService
  ) {
    
  }

  canActivate(): boolean {
    if (!this.authService.validToken()) {
      console.log("Validando token");
      this.authService.logOut();
      window.location.replace('/login');
      return false
    }else{
      return true
    }
  }
  
}
