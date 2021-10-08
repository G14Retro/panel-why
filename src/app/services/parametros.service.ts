import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';

const PARAMETER = environment.Prameter_Data;

@Injectable({
  providedIn: 'root'
})
export class ParametrosService {
  private httpOptions;
  private httpOptionsFile;
  private httpOptionsPost;
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

  //Tipos de documentos

  getAllTypeDocument(page,registros){
    return this.http.post(`${PARAMETER}society_nit_types/by_request/all/?data_page_rows=${registros}&data_page_current=${page}`,{},this.httpOptions);
  }

  createDocument(data){
    return this.http.post(`${PARAMETER}society_nit_types/by_request/`,data,this.httpOptionsPost)
    .pipe(
      tap(()=>{
        this._refresh$.next();
      })
    );
  }

  getDocumentById(id){
    return this.http.get(`${PARAMETER}society_nit_types/by_request/${id}`,this.httpOptions);
  }

  updateDocument(id,data){
    return this.http.put(`${PARAMETER}society_nit_types/by_request/${id}`,data,this.httpOptionsPost)
    .pipe(
      tap(()=>{
        this._refresh$.next();
      })
    );
  }

  statusTypeNitById(id,type){
    return this.http.patch(`${PARAMETER}society_nit_types/by_request/${type}/${id}`,{},this.httpOptions)
    .pipe(
      tap(()=>{
        this._refresh$.next();
      })
    );
  }

  //Estratos

  getAllEstratos(page,registros){
    return this.http.post(`${PARAMETER}society_socio_economics/by_request/all/?data_page_rows=${registros}&data_page_current=${page}`,{},this.httpOptions);
  }

  createEstrato(data){
    return this.http.post(`${PARAMETER}society_socio_economics/by_request/`,data,this.httpOptionsPost)
    .pipe(
      tap(()=>{
        this._refresh$.next();
      })
    );
  }

  getEstratoById(id){
    return this.http.get(`${PARAMETER}society_socio_economics/by_request/${id}`,this.httpOptions);
  }

  updateEstrato(id,data){
    return this.http.put(`${PARAMETER}society_socio_economics/by_request/${id}`,data,this.httpOptionsPost)
    .pipe(
      tap(()=>{
        this._refresh$.next();
      })
    );
  }

  statusEstratoById(id,type){
    return this.http.patch(`${PARAMETER}society_socio_economics/by_request/${type}/${id}`,{},this.httpOptions)
    .pipe(
      tap(()=>{
        this._refresh$.next();
      })
    );
  }

  //Géneros

  getAllGeneros(page,registros){
    return this.http.post(`${PARAMETER}society_genders/by_request/all/?data_page_rows=${registros}&data_page_current=${page}`,{},this.httpOptions);
  }

  createGenero(data){
    return this.http.post(`${PARAMETER}society_genders/by_request/`,data,this.httpOptionsPost)
    .pipe(
      tap(()=>{
        this._refresh$.next();
      })
    );
  }

  getGeneroById(id){
    return this.http.get(`${PARAMETER}society_genders/by_request/${id}`,this.httpOptions);
  }

  updateGenero(id,data){
    return this.http.put(`${PARAMETER}society_genders/by_request/${id}`,data,this.httpOptionsPost)
    .pipe(
      tap(()=>{
        this._refresh$.next();
      })
    );
  }

  statusGeneroById(id,type){
    return this.http.patch(`${PARAMETER}society_genders/by_request/${type}/${id}`,{},this.httpOptions)
    .pipe(
      tap(()=>{
        this._refresh$.next();
      })
    );
  }

  //Decisores

  getAllDecisores(page,registros){
    return this.http.post(`${PARAMETER}society_purchase_decisions/by_request/all/?data_page_rows=${registros}&data_page_current=${page}`,{},this.httpOptions);
  }

  createDecisor(data){
    return this.http.post(`${PARAMETER}society_purchase_decisions/by_request/`,data,this.httpOptionsPost)
    .pipe(
      tap(()=>{
        this._refresh$.next();
      })
    );
  }

  getDecisorById(id){
    return this.http.get(`${PARAMETER}society_purchase_decisions/by_request/${id}`,this.httpOptions);
  }

  updateDecisor(id,data){
    return this.http.put(`${PARAMETER}society_purchase_decisions/by_request/${id}`,data,this.httpOptionsPost)
    .pipe(
      tap(()=>{
        this._refresh$.next();
      })
    );
  }

  statusDecisorById(id,type){
    return this.http.patch(`${PARAMETER}society_purchase_decisions/by_request/${type}/${id}`,{},this.httpOptions)
    .pipe(
      tap(()=>{
        this._refresh$.next();
      })
    );
  }

  getAllEstadoCivil(page,registros){
    return this.http.post(`${PARAMETER}society_marital_statuses/by_request/all/?data_page_rows=${registros}&data_page_current=${page}`,{},this.httpOptions);
  }

  createEstadoCivil(data){
    return this.http.post(`${PARAMETER}society_marital_statuses/by_request/`,data,this.httpOptionsPost)
    .pipe(
      tap(()=>{
        this._refresh$.next();
      })
    );
  }

  //Estados Civiles

  getEstadoCivilById(id){
    return this.http.get(`${PARAMETER}society_marital_statuses/by_request/${id}`,this.httpOptions);
  }

  updateEstadoCivil(id,data){
    return this.http.put(`${PARAMETER}society_marital_statuses/by_request/${id}`,data,this.httpOptionsPost)
    .pipe(
      tap(()=>{
        this._refresh$.next();
      })
    );
  }

  statusEstadoCivilById(id,type){
    return this.http.patch(`${PARAMETER}society_marital_statuses/by_request/${type}/${id}`,{},this.httpOptions)
    .pipe(
      tap(()=>{
        this._refresh$.next();
      })
    );
  }

  //Nivel academico

  getAllNivelAcademico(page,registros){
    return this.http.post(`${PARAMETER}society_academic_levels/by_request/all/?data_page_rows=${registros}&data_page_current=${page}`,{},this.httpOptions);
  }

  createNivelAcademico(data){
    return this.http.post(`${PARAMETER}society_academic_levels/by_request/`,data,this.httpOptionsPost)
    .pipe(
      tap(()=>{
        this._refresh$.next();
      })
    );
  }

  getNivelAcademicoById(id){
    return this.http.get(`${PARAMETER}society_academic_levels/by_request/${id}`,this.httpOptions);
  }

  updateNivelAcademico(id,data){
    return this.http.put(`${PARAMETER}society_academic_levels/by_request/${id}`,data,this.httpOptionsPost)
    .pipe(
      tap(()=>{
        this._refresh$.next();
      })
    );
  }

  statusNivelAcademicoById(id,type){
    return this.http.patch(`${PARAMETER}society_academic_levels/by_request/${type}/${id}`,{},this.httpOptions)
    .pipe(
      tap(()=>{
        this._refresh$.next();
      })
    );
  }

  //Estado trabajo

  getAllEstadoLaboral(page,registros){
    return this.http.post(`${PARAMETER}society_employment_statuses/by_request/all/?data_page_rows=${registros}&data_page_current=${page}`,{},this.httpOptions);
  }

  createEstadoLaboral(data){
    return this.http.post(`${PARAMETER}society_employment_statuses/by_request/`,data,this.httpOptionsPost)
    .pipe(
      tap(()=>{
        this._refresh$.next();
      })
    );
  }

  getEstadoLaboralById(id){
    return this.http.get(`${PARAMETER}society_employment_statuses/by_request/${id}`,this.httpOptions);
  }

  updateEstadoLaboral(id,data){
    return this.http.put(`${PARAMETER}society_employment_statuses/by_request/${id}`,data,this.httpOptionsPost)
    .pipe(
      tap(()=>{
        this._refresh$.next();
      })
    );
  }

  statusEstadoLaboralById(id,type){
    return this.http.patch(`${PARAMETER}society_employment_statuses/by_request/${type}/${id}`,{},this.httpOptions)
    .pipe(
      tap(()=>{
        this._refresh$.next();
      })
    );
  }

  //Nivel de ingresos

  getAllNivelIngreso(page,registros){
    return this.http.post(`${PARAMETER}society_income_levels/by_request/all/?data_page_rows=${registros}&data_page_current=${page}`,{},this.httpOptions);
  }

  createNivelIngreso(data){
    return this.http.post(`${PARAMETER}society_income_levels/by_request/`,data,this.httpOptionsPost)
    .pipe(
      tap(()=>{
        this._refresh$.next();
      })
    );
  }

  getNivelIngresoById(id){
    return this.http.get(`${PARAMETER}society_income_levels/by_request/${id}`,this.httpOptions);
  }

  updateNivelIngreso(id,data){
    return this.http.put(`${PARAMETER}society_income_levels/by_request/${id}`,data,this.httpOptionsPost)
    .pipe(
      tap(()=>{
        this._refresh$.next();
      })
    );
  }

  statusNivelIngresoById(id,type){
    return this.http.patch(`${PARAMETER}society_income_levels/by_request/${type}/${id}`,{},this.httpOptions)
    .pipe(
      tap(()=>{
        this._refresh$.next();
      })
    );
  }

  //Formas de pago

  getAllFormaPago(page,registros){
    return this.http.post(`${PARAMETER}society_way_to_pays/by_request/all/?data_page_rows=${registros}&data_page_current=${page}`,{},this.httpOptions);
  }

  createFormaPago(data){
    return this.http.post(`${PARAMETER}society_way_to_pays/by_request/`,data,this.httpOptionsPost)
    .pipe(
      tap(()=>{
        this._refresh$.next();
      })
    );
  }

  getFormaPagoById(id){
    return this.http.get(`${PARAMETER}society_way_to_pays/by_request/${id}`,this.httpOptions);
  }

  updateFormaPago(id,data){
    return this.http.put(`${PARAMETER}society_way_to_pays/by_request/${id}`,data,this.httpOptionsPost)
    .pipe(
      tap(()=>{
        this._refresh$.next();
      })
    );
  }

  statusFormaPagoById(id,type){
    return this.http.patch(`${PARAMETER}society_way_to_pays/by_request/${type}/${id}`,{},this.httpOptions)
    .pipe(
      tap(()=>{
        this._refresh$.next();
      })
    );
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
