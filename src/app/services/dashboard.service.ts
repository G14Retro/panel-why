import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';

const DATAUSER = environment.Auth_Authorization;


@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private httpOptions;
  private httpOptionsPost;
  private email;
  constructor(
    private authService:AuthService,
    private http:HttpClient
  ) {
    this.init();
   }

   init(){
    this.httpOptions = {
      headers: new HttpHeaders({
      'Authorization':`Bearer ${this.authService.user.access_token}`,
      'Content-Type': 'application/json'
      })
    };
    this.httpOptionsPost = {
      headers: new HttpHeaders({
        'Authorization':`Bearer ${this.authService.user.access_token}`,
        'Content-Type': 'application/json',
        'method': 'POST',
        })
      };
  }
  getPoints(){
    return this.http.get(`${DATAUSER}account-read/`,this.httpOptions);
  }

  getProfile(){
    return this.http.get(`${DATAUSER}profile-read/`,this.httpOptions);
  }

  getUser(){
    return this.http.get(`${DATAUSER}user-read`,this.httpOptions);
  }

}
