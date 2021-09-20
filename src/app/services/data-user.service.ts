import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';

const DATAUSER = environment.Data_User_Profiles;
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
    this.email = JSON.parse(localStorage.getItem('dataSession')).username;
  }
  
  get refresh$(){
    return this._refresh$;
  }

  getProfile(){
    return this.http.get(`${DATAUSER}by_request/${this.email}`,this.httpOptions)
    .pipe(
      map((resp:any)=>{
        this.saveStorage(resp)
        return resp
      })
    );
  }

  private saveStorage(data){
    console.log("Ejecutando Save");
    console.log(data);
    if (data.status == 200) {
      console.log("Codigo 200");
      localStorage.setItem('dataProfile',JSON.stringify(data.body))
    }
    if (data.status == 461) {
      console.log("Codigo 461");
      localStorage.setItem('dataProfile',JSON.stringify(null))
    }
  }

  private readData

  validateProfile():Observable<any>{
    return this.http.get(`${DATAUSER}by_request/${this.email}`,this.httpOptions);
  }

  init(){
    this.httpOptions = {
      headers: new HttpHeaders({
      'Authorization':`Bearer ${this.authService.userToken}`,
      'Content-Type': 'application/json',
      }),
      observe: 'response'
    };
    this.httpOptionsPost = {
      headers: new HttpHeaders({
        'Authorization':`Bearer ${this.authService.userToken}`,
        'Content-Type': 'application/json',
        'method': 'POST',
        })
      };
  }

  getNitTypes(){
    return this.http.get(`${PARAMETERS}society_nit_types/by_request/active/?skip=0&limit=1000`);
  }

  getSocioEconomics(){
    return this.http.get(`${PARAMETERS}society_socio_economics/by_request/active/?skip=0&limit=1000`);
  }

  getSocioGenders(){
    return this.http.get(`${PARAMETERS}society_genders/by_request/active/?skip=0&limit=1000`);
  }

  getPurchaseDecisions(){
    return this.http.get(`${PARAMETERS}society_purchase_decisions/by_request/active/?skip=0&limit=1000`);
  }

  getMaritalStatuses(){
    return this.http.get(`${PARAMETERS}society_marital_statuses/by_request/active/?skip=0&limit=1000`);
  }

  getAcademicLevels(){
    return this.http.get(`${PARAMETERS}society_academic_levels/by_request/active/?skip=0&limit=1000`);
  }

  getEmploymentStatuses(){
    return this.http.get(`${PARAMETERS}society_employment_statuses/by_request/active/?skip=0&limit=1000`);
  }

  getIncomeLevels(){
    return this.http.get(`${PARAMETERS}society_income_levels/by_request/active/?skip=0&limit=1000`);
  }

  getWayPays(){
    return this.http.get(`${PARAMETERS}society_way_to_pays/by_request/active/?skip=0&limit=1000`);
  }


  createProfile(data){
    return this.http.post(`${DATAUSER}by_request/?email=${this.email}`,data,this.httpOptionsPost);
  }
  
  updateProfile(data){
    return this.http.put(`${DATAUSER}by_request/${this.email}`,data,this.httpOptionsPost)
    .pipe(
      tap(()=>{
        this._refresh$.next();
      })
    );
  }

}
