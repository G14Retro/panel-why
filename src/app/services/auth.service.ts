import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';

const COUNTRIES = environment.Parameters_Geography_Countries;
const STATES = environment.Parameters_Geography_States
const CITIES = environment.Parameters_Geography_Cities
const AUTORIZATION = environment.Auth_Authorization
const AUTHENTICATION = environment.Auth_Authentication

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userToken = '';
  userData:any;
  httoptions = {
    headers: new HttpHeaders({
    'method': 'POST',
    'Content-Type': 'application/json'
    }),
  }
  constructor(
    private http:HttpClient,
    private jwhelper:JwtHelperService
  ) {
    this.readStorage();
   }

  getCountries(){
    return this.http.get(`${COUNTRIES}by_request/active/?skip=0&limit=100&parent_id=22`);
  }

  getStates(id_country){
    return this.http.get(`${STATES}by_request/active/?skip=0&limit=1000&parent_id=${id_country}`);
  }

  getCities(id_state){
    return this.http.get(`${CITIES}by_request/active/?skip=0&limit=10000&parent_id=${id_state}`);
  }

  recovery(email:string){
    return this.http.post(`${AUTORIZATION}password-recover-send-mail/${email}`,'',this.httoptions);
  }

  newPassword(data){
    return this.http.post(`${AUTORIZATION}password-recover-token/`,data,this.httoptions);
  }

  signUp(data){
    return this.http.post(`${AUTORIZATION}user-create`,data,this.httoptions);
  }

  singIn(data){
    const datos = new FormData();
    datos.append('username',data.username);
    datos.append('password',data.password);
    return this.http.post(`${AUTHENTICATION}login/access-token`,datos,{headers:{
      'method': 'POST',
    }})
    .pipe(
      map((resp:any)=>{
        this.saveStorage(data.remember,resp);
        return resp;
      })
    );
  }

  private saveStorage(remember,resp){
    if (remember == true) {
      localStorage.setItem('user',JSON.stringify(resp));
    }else{
      sessionStorage.setItem('user',JSON.stringify(resp));
    }
  }

  private readStorage(){
    if (localStorage.getItem('user')) {
      this.userToken = JSON.parse(localStorage.getItem('user')).access_token
    }else if (sessionStorage.getItem('user')) {
      this.userToken = JSON.parse(sessionStorage.getItem('user')).access_token
    }else{
      this.userToken = '';
    }
  }

  tokenTest(){
    const headers = new HttpHeaders({
      'Authorization':`Bearer ${this.userToken}`,
      'method': 'POST',
      'Content-Type': 'application/json'
    })
    this.http.post(`${AUTHENTICATION}login/test-token`,{},{headers}).subscribe((resp:any)=>{
      localStorage.setItem('dataUser',JSON.stringify(resp))
    });
  }

  validToken():boolean{
    return !this.jwhelper.isTokenExpired(this.userToken);
  }
}
