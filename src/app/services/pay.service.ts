import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';

const AUTHORIZATION = environment.Auth_Authorization;

@Injectable({
  providedIn: 'root'
})
export class PayService {

  private httpOptions;
  private httpOptionsPost;
  private email;
  constructor(
    private http:HttpClient,
    private authService:AuthService
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

  getPays(){
    return this.http.get(`${AUTHORIZATION}payments-read/?&skip=0&limit=1000`,this.httpOptions)
  }
}
