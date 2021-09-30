import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UserModel } from '../models/user.model';

const COUNTRIES = environment.Parameters_Geography_Countries;
const STATES = environment.Parameters_Geography_States
const CITIES = environment.Parameters_Geography_Cities
const AUTORIZATION = environment.Auth_Authorization
const AUTHENTICATION = environment.Auth_Authentication

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user:UserModel = new UserModel();
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
    return this.http.post(`${COUNTRIES}by_request/all/?parent_id=22`,{});
  }

  getStates(id_country){
    return this.http.post(`${STATES}by_request/all/?parent_id=${id_country}`,{});
  }

  getCities(id_state){
    return this.http.post(`${CITIES}by_request/all/?parent_id=${id_state}`,{});
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
      this.user = JSON.parse(localStorage.getItem('user'))
    }else if (sessionStorage.getItem('user')) {
      this.user = JSON.parse(sessionStorage.getItem('user'))
    }else{
      this.user = new UserModel();
    }
  }

  validProfile():boolean{
    return this.user.has_perfil;
  }

  validToken():boolean{
    return !this.jwhelper.isTokenExpired(this.user.access_token);
  }

  sendEmailActive(email){
   return this.http.post(`${AUTORIZATION}activate-user-send-mail/${email}`,{},{headers:{'method': 'POST'}});
  }

  activeUser(token){
    return this.http.post(`${AUTORIZATION}activate-user-token/${token}`,{},{headers:{'method': 'POST'}})
  }

  logOut(){
    sessionStorage.clear();
    localStorage.clear();
    window.location.replace('/login');
  }
}
