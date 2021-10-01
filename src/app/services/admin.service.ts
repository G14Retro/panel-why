import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';


const USERADMIN = environment.User_Admin;
const TRANSACTIONADMIN = environment.Data_Transaction;

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private httpOptions;
  private httpOptionsFile;
  private httpOptionsPost;
  constructor(
    private http:HttpClient,
    private authService:AuthService,
  ) { 
    this.init();
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
