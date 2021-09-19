import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const COUNTRIES = environment.Parameters_Geography_Countries;
const STATES = environment.Parameters_Geography_States
const CITIES = environment.Parameters_Geography_Cities

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http:HttpClient
  ) { }

  getCountries(){
    return this.http.get(`${COUNTRIES}by_request/active/?skip=0&limit=100&parent_id=22`);
  }

  getStates(id_country){
    return this.http.get(`${STATES}by_request/active/?parent_id=${id_country}`);
  }

  getCities(id_state){
    return this.http.get(`${CITIES}by_request/active/?skip=0&limit=100&parent_id=${id_state}`);
  }
}
