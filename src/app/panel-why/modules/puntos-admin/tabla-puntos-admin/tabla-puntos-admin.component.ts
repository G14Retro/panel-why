import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import * as moment from 'moment';
import { Subscription } from 'rxjs';
import { AdminService } from 'src/app/services/admin.service';
import Utils from 'src/app/Utils/tool.util';
import { CrearPuntoComponent } from '../components/crear-punto/crear-punto.component';

@Component({
  selector: 'app-tabla-puntos-admin',
  templateUrl: './tabla-puntos-admin.component.html',
  styleUrls: ['./tabla-puntos-admin.component.scss']
})
export class TablaPuntosAdminComponent implements OnInit, AfterViewInit, OnDestroy {
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
    //Observable para los cambios de la matriz
    subscription:Subscription;
  constructor(
    private adminService:AdminService,
    public dialog:MatDialog,
  ) { }

  ngOnInit(): void {
    this.getAllPoints(this.page,this.pageSize);
    this.subscription = this.adminService.refresh$.subscribe(()=>{
      this.getAllPoints(this.page,this.pageSize);
    })
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  ngAfterViewInit(){
    this.paginator._intl.itemsPerPageLabel="Registros por pagina";
  }

  newPoints(){
    const pointRef = this.dialog.open(CrearPuntoComponent,{
      width: '850px',
      disableClose: true,
    })
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
