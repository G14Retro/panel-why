import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import * as moment from 'moment';
import { AdminService } from 'src/app/services/admin.service';
import Utils from 'src/app/Utils/tool.util';

@Component({
  selector: 'app-tabla-puntos-admin',
  templateUrl: './tabla-puntos-admin.component.html',
  styleUrls: ['./tabla-puntos-admin.component.scss']
})
export class TablaPuntosAdminComponent implements OnInit, AfterViewInit {
  displayedColumns:string[] = ['email','ciudad','codigo_estudio','estudio','registro','tipo','fecha_puntos','puntos','observacion'];
  dataSource = [];
  selectMasivo;
  nameFile:string;
  length;
  pageSize = 10;
  page = 1;
  pageSizeOptions: number[] = [10, 25, 50, 100];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild('download', {static:false}) plantillaBtn:ElementRef<HTMLAnchorElement>;
  @ViewChild('uploadFile',{static:false}) clickInput:ElementRef<HTMLInputElement>;
  constructor(
    private adminService:AdminService,
  ) { }

  ngOnInit(): void {
    this.getAllPoints(this.page,this.pageSize);
  }

  ngAfterViewInit(){
    this.paginator._intl.itemsPerPageLabel="Registros por pagina";
  }

  editUser(id){

  }

  removeUser(id){

  }

  btnPlantilla(){
    const anchorRef = this.plantillaBtn.nativeElement
    anchorRef.click();
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
    this.adminService.filePoints(file,this.selectMasivo).subscribe((resp:any)=>{
      console.log(resp);
      if (this.selectMasivo == 'create') {
        this.nameFile = 'User-Create-'+moment(new Date).format('yyyy-MM-DD_hh-mm-ss');
      }
      Utils.downloadFile(resp,this.nameFile);
      Utils.swalSuccess('¡Excelente!','Se ha cargado el archivo con exito, verifica los resultados.')
    },(err:any)=>{
      if (err.status == 415) {
        Utils.swalErrorConfirm('¡Lo siento!',err.error.detail);
      }
    })
  }

  downloadPoints(){
    this.adminService.downloadPoints().subscribe((resp:any)=>{
      Utils.downloadFile(resp,'TransactionPoint-'+moment(new Date).format('yyyy-MM-DD_hh-mm-ss'));
    })
  }

  getAllPoints(page,pageSize){
    const params = {};
    this.adminService.getAllPoints(params,page,pageSize).subscribe((resp:any)=>{
      this.dataSource = resp.data;
      this.length = resp.data_total_count;
      this.pageSize = resp.data_page_rows;
    });
  }

  pageEvent(event:any){
    this.pageSize = event.pageSize;
    this.page = event.pageIndex + 1;
    this.getAllPoints(this.page,this.pageSize);
  }

}
