import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';


const USERADMIN = environment.User_Admin;
const TRANSACTIONADMIN = environment.Data_Transaction;
const DATAUSER = environment.Data_User_Profiles;
const MYSELF = environment.Auth_Authorization;

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private httpOptions;
  private httpOptionsFile;
  private httpOptionsPost;
  private _refresh$ = new Subject<void>();
  constructor(
    private http:HttpClient,
    private authService:AuthService,
  ) { 
    this.init();
  }

  get refresh$(){
    return this._refresh$;
  }

  downloadUsers(){
    return this.http.post(`${USERADMIN}users/by_file/read/`,null,this.httpOptionsFile);
  }

  updateFile(file:File,type:string){
    const document = new FormData();
    document.append('file',file)
    if (type == 'create') {
      return this.http.post(`${USERADMIN}users/by_file/${type}/`,document,this.httpOptionsFile);
    }
    if (type == 'update') {
      return this.http.put(`${USERADMIN}users/by_file/${type}/`,document,this.httpOptionsFile);
    }
    if (type == 'active') {
      return this.http.patch(`${USERADMIN}users/by_file/${type}/`,document,this.httpOptionsFile);
    }
    return this.http.patch(`${USERADMIN}users/by_file/${type}/`,document,this.httpOptionsFile);
  }

  downloadProfiles(){
    return this.http.post(`${USERADMIN}user_profiles/by_file/read/`,{},this.httpOptionsFile);
  }

  fileProfiles(file:File,type:string){
    const document = new FormData();
    document.append('file',file)
    if (type == 'create') {
      return this.http.post(`${USERADMIN}user_profiles/by_file/${type}/`,document,this.httpOptionsFile);
    }
    return this.http.put(`${USERADMIN}user_profiles/by_file/${type}/`,document,this.httpOptionsFile);
  }

  getAllUsers(params,page,registros){
    return this.http.post(`${USERADMIN}users/by_request/all/?data_page_rows=${registros}&data_page_current=${page}`,params,this.httpOptionsPost);
  }

  getAllProfiles(params,page,registros){
    return this.http.post(`${USERADMIN}user_profiles/by_request/all/?data_page_rows=${registros}&data_page_current=${page}`,params,this.httpOptionsPost);
  }

  filePoints(file:File,type:string){
    const document = new FormData();
    document.append('file',file)
    return this.http.post(`${TRANSACTIONADMIN}transaction_points/by_file/${type}/`,document,this.httpOptionsFile);
  }

  downloadPoints(){
    return this.http.post(`${TRANSACTIONADMIN}transaction_points/by_file/read/`,{},this.httpOptionsFile)
  }

  getAllPoints(params,page,registros){
    return this.http.post(`${TRANSACTIONADMIN}transaction_points/by_request/all/?data_page_rows=${registros}&data_page_current=${page}`,params,this.httpOptionsPost);
  }

  getAllPays(params,page,registros){
    return this.http.post(`${TRANSACTIONADMIN}transaction_payments/by_request/all/?data_page_rows=${registros}&data_page_current=${page}`,params,this.httpOptionsPost);
  }

  filePays(file:File,type:string){
    const document = new FormData();
    document.append('file',file)
    return this.http.post(`${TRANSACTIONADMIN}transaction_payments/by_file/${type}/`,document,this.httpOptionsFile);
  }

  downloadPays(){
    return this.http.post(`${TRANSACTIONADMIN}transaction_payments/by_file/read/`,{},this.httpOptionsFile)
  }

  createUser(data){
    return this.http.post(`${USERADMIN}users/by_request/`,data,this.httpOptionsPost)
    .pipe(
      tap(()=>{
        this._refresh$.next();
      })
    );
  }

  getUserById(id_user){
    return this.http.get(`${USERADMIN}users/by_request/${id_user}`,this.httpOptions);
  }

  updateUserById(id_user,data){
    return this.http.put(`${USERADMIN}users/by_request/${id_user}`,data,this.httpOptionsPost)
    .pipe(
      tap(()=>{
        this._refresh$.next();
      })
    );
  }

  getCityById(id_city){
    return this.http.get(`https://backend-app.panelwhy.com/api/v1/parameters/geography/geography_cities/by_request/${id_city}`,this.httpOptions);
  }

  getStateById(id_state){
    return this.http.get(`https://backend-app.panelwhy.com/api/v1/parameters/geography/geography_states/by_request/${id_state}`,this.httpOptions);
  }

  statusUserById(id_user,type){
    return this.http.patch(`${USERADMIN}users/by_request/${type}/${id_user}`,{},this.httpOptionsPost)
    .pipe(
      tap(()=>{
        this._refresh$.next();
      })
    );
  }

  saveProfile(id_user,data){
    return this.http.post(`${DATAUSER}by_request/?parent_id=${id_user}`,data,this.httpOptionsPost)
    .pipe(
      tap(()=>{
        this._refresh$.next();
      })
    );
  }

  getProfileById(id_profile){
    return this.http.get(`${DATAUSER}by_request/${id_profile}`,this.httpOptions);
  }

  updateProfileById(id_profile,data){
    return this.http.put(`${DATAUSER}by_request/${id_profile}`,data,this.httpOptionsPost)
    .pipe(
      tap(()=>{
        this._refresh$.next();
      })
    );
  }

  getUserByEmail(params){
    return this.http.post(`${USERADMIN}users/by_request/all/`,params,this.httpOptionsPost);
  }

  createPoint(id_user,data){
    return this.http.post(`${TRANSACTIONADMIN}transaction_points/by_request/?parent_id=${id_user}`,data,this.httpOptionsPost)
    .pipe(
      tap(()=>{
        this._refresh$.next();
      })
    );
  }

  createPay(id_user,data){
    return this.http.post(`${TRANSACTIONADMIN}transaction_payments/by_request/?parent_id=${id_user}`,data,this.httpOptionsPost)
    .pipe(
      tap(()=>{
        this._refresh$.next();
      })
    );
  }

  emailActivation(email:string){
    return this.http.post(`${MYSELF}activate-user-send-mail/${email}`,{},this.httpOptionsPost);
  }

  private init(){
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
      this.httpOptionsFile = {
        responseType: 'blob',
        headers: new HttpHeaders({
          'Authorization':`Bearer ${this.authService.user.access_token}`,
          'enctype': 'multipart/form-data, aplication/json',
          'method': 'POST',
          'accept': '*/*'
          })
      };
  }

}
