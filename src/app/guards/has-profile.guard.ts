import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class HasProfileGuard implements CanActivate {
  constructor(
    private authService:AuthService,
  ) {
    
  }

  canActivate(): boolean {
    if (this.authService.validProfile()) {
      window.location.replace('/panel-why/dashboard');
      return false
    }
    return true
  }
}
