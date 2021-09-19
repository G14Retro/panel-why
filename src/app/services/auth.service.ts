import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

const COUNTRIES = environment.Parameters_Geography_Countries;
const STATES = environment.Parameters_Geography_States
const CITIES = environment.Parameters_Geography_Cities
const AUTORIZATION = environment.Auth_Authorization
const AUTHENTICATION = environment.Auth_Authentication

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  httoptions = {
    headers: new HttpHeaders({
    'method': 'POST'
    }),
  }
  constructor(
    private http:HttpClient
  ) { }

  getCountries(){
    return this.http.get(`${COUNTRIES}by_request/active/?skip=0&limit=100&parent_id=22`);
  }

  getStates(id_country){
    return this.http.get(`${STATES}by_request/active/?skip=0&limit=1000&parent_id=${id_country}`);
  }

  getCities(id_state){
    return this.http.get(`${CITIES}by_request/active/?skip=0&limit=10000&parent_id=${id_state}`);
  }

  signUp(data){
    return this.http.post(`${AUTORIZATION}user-create`,data,this.httoptions);
  }

  singIn(data){
    const datos = new FormData();
    datos.append('username',data.username);
    datos.append('password',data.password);
    return this.http.post(`${AUTHENTICATION}login/access-token`,datos,this.httoptions)
    .pipe(
      map((resp:any)=>{
        this.saveStorage(data.remember,resp);
        return resp;
      })
    );
  }

  private saveStorage(remember,resp){
    if (remember == true) {
      localStorage.setItem('user',resp);
    }else{
      sessionStorage.setItem('user',resp);
    }
  }
}
