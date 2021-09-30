import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';


const USERADMIN = environment.User_Admin;

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
    Object.assign(this.httpOptionsPost,{responseType: "blob"})
    return this.http.post(`${USERADMIN}by_file/read/`,null,this.httpOptionsPost);
  }

  updateFile(file:File,type:string){
    const document = new FormData();
    document.append('file',file)
    console.log(document.get('file'));
    return this.http.post(`${USERADMIN}by_file/${type}/`,document,this.httpOptionsFile);
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
        headers: new HttpHeaders({
          'Authorization':`Bearer ${this.authService.user.access_token}`,
          'Content-Type': 'multipart/form-data',
          'method': 'POST',
          })
      };
  }

}
