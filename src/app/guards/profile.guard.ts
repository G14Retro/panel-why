import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { DataUserService } from '../services/data-user.service';

@Injectable({
  providedIn: 'root'
})
export class ProfileGuard implements CanActivate {

  valid:boolean;
  constructor(
    private authService:AuthService,
    private dataService:DataUserService
  ) {
    
  }

  canActivate(): boolean {
    this.dataService.validateProfile()
    return true
  }
  
}
