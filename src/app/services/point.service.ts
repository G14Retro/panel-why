import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';

const TRANSACTION = environment.Data_Transaction;

@Injectable({
  providedIn: 'root'
})
export class PointService {
  private httpOptions;
  private httpOptionsPost;
  private email;
  constructor(
    private http:HttpClient,
    private authService:AuthService
  ) { 
    this.init();
    this.email = JSON.parse(localStorage.getItem('dataSession')).username;
  }
  init(){
    this.httpOptions = {
      headers: new HttpHeaders({
      'Authorization':`Bearer ${this.authService.userToken}`,
      'Content-Type': 'application/json'
      })
    };
    this.httpOptionsPost = {
      headers: new HttpHeaders({
        'Authorization':`Bearer ${this.authService.userToken}`,
        'Content-Type': 'application/json',
        'method': 'POST',
        })
      };
  }

  getPoints(){
    return this.http.get(`${TRANSACTION}transaction_points/by_request/all/?email=${this.email}&skip=0&limit=1000`,this.httpOptions);
  }

}
