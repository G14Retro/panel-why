import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import * as moment from 'moment';
import { AdminService } from 'src/app/services/admin.service';
import Utils from 'src/app/Utils/tool.util';
import { CrearPerfilComponent } from '../components/crear-perfil/crear-perfil.component';
import { DetallePerfilComponent } from '../components/detalle-perfil/detalle-perfil.component';

@Component({
  selector: 'app-tabla-perfiles',
  templateUrl: './tabla-perfiles.component.html',
  styleUrls: ['./tabla-perfiles.component.scss']
})
export class TablaPerfilesComponent implements OnInit,AfterViewInit {

  selectMasivo = '';
  nameFile:string;
  displayedColumns:string[] = ['acciones','nombres','apellidos','email','ciudad','tipo_usuario','puntos_actuales','puntos_totales','puntos_redimidos','puntos_pagos'];
  dataSource = [];
  length;
  pageSize = 10;
  page = 1;
  pageSizeOptions: number[] = [10, 25, 50, 100];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild('download', {static:false}) plantillaBtn:ElementRef<HTMLAnchorElement>;
  @ViewChild('uploadFile',{static:false}) clickInput:ElementRef<HTMLInputElement>;
  constructor(
    private adminService:AdminService,
    private dialog:MatDialog
  ) { }

  ngOnInit(): void {
    this.getAllProfiles(this.page,this.pageSize);
  }

  ngAfterViewInit(){
    this.paginator._intl.itemsPerPageLabel="Registros por pagina";
  }

  editUser(id){

  }

  removeUser(id){

  }
  
  inputFile(){
    const fileUpload = this.clickInput.nativeElement;
    fileUpload.onchange = () => {
      for (let index = 0; index < fileUpload.files.length; index++) {
        this.uploadPlantilla(fileUpload.files[index])
      }
    }
    fileUpload.click();
  }

  uploadPlantilla(file){
    this.adminService.fileProfiles(file,this.selectMasivo).subscribe((resp:any)=>{
      console.log(resp);
      if (this.selectMasivo == 'create') {
        this.nameFile = 'UserProfile-Create-'+moment(new Date).format('yyyy-MM-DD_hh-mm-ss');
      }
      if (this.selectMasivo == 'update') {
        this.nameFile = 'UserProfile-Update-'+moment(new Date).format('yyyy-MM-DD_hh-mm-ss');
      }
      Utils.downloadFile(resp,this.nameFile);
      Utils.swalSuccess('¡Excelente!','Se ha cargado el archivo con exito, verifica los resultados.')
    },(err:any)=>{
      console.log(err);
      if (err.status == 415) {
        Utils.swalErrorConfirm('¡Lo siento!',err.error.detail)
      }
    })
  }

  btnPlantilla(){
    const anchorRef = this.plantillaBtn.nativeElement
    anchorRef.click();
  }

  getAllProfiles(page,pageSize){
    const params = {};
    this.adminService.getAllProfiles(params,page,pageSize).subscribe((resp:any)=>{
      this.dataSource = resp.data;
      this.length = resp.data_total_count;
      this.pageSize = resp.data_page_rows;
    })
  }

  pageEvent(event:any){
    this.pageSize = event.pageSize;
    this.page = event.pageIndex + 1;
    this.getAllProfiles(this.page,this.pageSize);
  }

  downloadProfiles(){
    this.adminService.downloadProfiles().subscribe((resp:any)=>{
      console.log(resp);
      Utils.downloadFile(resp,'UserProfile-'+moment(new Date).format('yyyy-MM-DD_hh-mm-ss'));
    })
  }

  newProfile(){
    const perfilRef = this.dialog.open(CrearPerfilComponent,{
      width: '850px',
      disableClose: true,
    })
  }

  detailProfile(profile,edit:boolean){
    const profileRef = this.dialog.open(DetallePerfilComponent,{
      width: '850px',
      disableClose: true,
      data: {profile: profile, edit: edit}
    })
  }

}
