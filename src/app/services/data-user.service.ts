import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';

const DATAUSER = environment.Auth_Authorization;
const PARAMETERS = environment.Prameter_Data;

@Injectable({
  providedIn: 'root'
})
export class DataUserService {
  private httpOptions;
  private httpOptionsPost;
  private email;
  private _refresh$ = new Subject<void>();
  constructor(
    private authService:AuthService,
    private http:HttpClient
  ) { 
    this.init();
  }
  
  get refresh$(){
    return this._refresh$;
  }

  getProfile(){
    return this.http.get(`${DATAUSER}profile-read/`,this.httpOptions);
  }

  init(){
    this.httpOptions = {
      headers: new HttpHeaders({
      'Authorization':`Bearer ${this.authService.user.access_token}`,
      'Content-Type': 'application/json',
      }),
    };
    this.httpOptionsPost = {
      headers: new HttpHeaders({
        'Authorization':`Bearer ${this.authService.user.access_token}`,
        'Content-Type': 'application/json',
        'method': 'POST',
        })
      };
  }

  getNitTypes(){
    return this.http.post(`${PARAMETERS}society_nit_types/by_request/all/`,{});
  }

  getSocioEconomics(){
    return this.http.post(`${PARAMETERS}society_socio_economics/by_request/all/`,{});
  }

  getSocioGenders(){
    return this.http.post(`${PARAMETERS}society_genders/by_request/all/`,{});
  }

  getPurchaseDecisions(){
    return this.http.post(`${PARAMETERS}society_purchase_decisions/by_request/all/`,{});
  }

  getMaritalStatuses(){
    return this.http.post(`${PARAMETERS}society_marital_statuses/by_request/all/`,{});
  }

  getAcademicLevels(){
    return this.http.post(`${PARAMETERS}society_academic_levels/by_request/all/`,{});
  }

  getEmploymentStatuses(){
    return this.http.post(`${PARAMETERS}society_employment_statuses/by_request/all/`,{});
  }

  getIncomeLevels(){
    return this.http.post(`${PARAMETERS}society_income_levels/by_request/all/`,{});
  }

  getWayPays(){
    return this.http.post(`${PARAMETERS}society_way_to_pays/by_request/all/`,{});
  }


  createProfile(data){
    return this.http.post(`${DATAUSER}profile-create/`,data,this.httpOptionsPost).pipe(
      map((resp:any)=>{
        this.authService.user.has_perfil = true;
        this.updateStorage(this.authService.user);
        return resp
      })
    );
  }
  
  updateStorage(user){
    if (localStorage.getItem('user')) {
      localStorage.removeItem('user');
      localStorage.setItem('user',JSON.stringify(user));
    }else if (sessionStorage.getItem('user')) {
      sessionStorage.removeItem('user');
      sessionStorage.setItem('user',JSON.stringify(user));
    }
  }

  coodeReference(code:string){
    return this.http.get(`${DATAUSER}profile-read-by-reference-code/${code}`,this.httpOptions)
  }

  updateProfile(data){
    return this.http.put(`${DATAUSER}profile-update/`,data,this.httpOptionsPost)
    .pipe(
      tap(()=>{
        this._refresh$.next();
      })
    );
  }

  changePassword(data){
    return this.http.put(`${DATAUSER}user-update-password`,data,this.httpOptions);
  }

  disableCount(cometario){
    return this.http.put(`${DATAUSER}user-inactive?inactive_reason=${cometario}`,{},this.httpOptionsPost);
  }

}
