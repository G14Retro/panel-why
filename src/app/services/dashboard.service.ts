import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';


const TRANSACTION = environment.Data_Transaction;

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
    return this.http.get(`${TRANSACTION}transaction_accounts/by_request/${this.email}`,this.httpOptions);
  }

}
