import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import * as moment from 'moment';
import { AdminService } from 'src/app/services/admin.service';
import Utils from 'src/app/Utils/tool.util';

@Component({
  selector: 'app-tabla-usuarios',
  templateUrl: './tabla-usuarios.component.html',
  styleUrls: ['./tabla-usuarios.component.scss']
})
export class TablaUsuariosComponent implements OnInit, AfterViewInit {

  selectMasivo = '';
  displayedColumns:string[] = ['acciones','nombres','apellidos','email','estado','telefono','ciudad'];
  dataSource = [];
  length;
  pageSize = 10;
  page = 1;
  pageSizeOptions: number[] = [10, 25, 50, 100];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild('download', {static:false}) plantillaBtn:ElementRef<HTMLAnchorElement>;
  @ViewChild('uploadFile',{static:false}) clickInput:ElementRef<HTMLInputElement>;
  nameFile:string;
  constructor(
    private adminService:AdminService,
  ) { }

  ngOnInit(): void {
    this.getAllUsers(this.page,this.pageSize);
  }

  ngAfterViewInit(){
    this.paginator._intl.itemsPerPageLabel="Registros por pagina";
  }

  editUser(id){

  }

  removeUser(id){

  }

  btnPlantilla():void{
    const anchorRef = this.plantillaBtn.nativeElement
    anchorRef.click();
  }

  downloadUsers(){
    this.adminService.downloadUsers().subscribe((resp:any)=>{
      Utils.downloadFile(resp,'User-'+moment(new Date).format('yyyy-MM-DD_hh-mm-ss'))
    },err=>{
      console.log(err);
    });
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
    this.adminService.updateFile(file,this.selectMasivo).subscribe((resp:any)=>{
      console.log(resp);
      if (this.selectMasivo == 'create') {
        this.nameFile = 'User-Create-'+moment(new Date).format('yyyy-MM-DD_hh-mm-ss');
      }
      if (this.selectMasivo == 'update') {
        this.nameFile = 'User-Update-'+moment(new Date).format('yyyy-MM-DD_hh-mm-ss');
      }
      if (this.selectMasivo == 'active') {
        this.nameFile = 'User-Active-'+moment(new Date).format('yyyy-MM-DD_hh-mm-ss');
      }
      if (this.selectMasivo == 'inactive') {
        this.nameFile = 'User-Inactive-'+moment(new Date).format('yyyy-MM-DD_hh-mm-ss');
      }
      Utils.downloadFile(resp,this.nameFile);
      Utils.swalSuccess('¡Excelente!','Se ha cargado el archivo con exito, verifica los resultados.')
    },(err:any)=>{
      if (err.status == 415) {
        Utils.swalErrorConfirm('¡Lo siento!',err.error.detail);
      }
    })
  }

  getAllUsers(page,pageSize){
    const params = {};
    this.adminService.getAllUsers(params,page,pageSize).subscribe((resp:any)=>{
      this.dataSource = resp.data;
      this.length = resp.data_total_count;
      this.pageSize = resp.data_page_rows;
    });
  }

  pageEvent(event:any){
    this.pageSize = event.pageSize;
    this.page = event.pageIndex + 1;
    this.getAllUsers(this.page,this.pageSize);
  }

}
