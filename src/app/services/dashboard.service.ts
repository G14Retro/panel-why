import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';


const TRANSACTION = environment.Data_Transaction;

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private email;
  constructor(
    private http:HttpClient
  ) {
    this.email = JSON.parse(localStorage.getItem('dataSession')).username;
   }


  getPoints(){
    return this.http.get(`${TRANSACTION}transaction_accounts/by_request/${this.email}`);
  }

}
