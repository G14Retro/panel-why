import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import * as moment from 'moment';
import { AdminService } from 'src/app/services/admin.service';
import { DataUserService } from 'src/app/services/data-user.service';
import Utils from 'src/app/Utils/tool.util';
import { CrearPagoComponent } from '../components/crear-pago/crear-pago.component';

@Component({
  selector: 'app-tabla-pagos-admin',
  templateUrl: './tabla-pagos-admin.component.html',
  styleUrls: ['./tabla-pagos-admin.component.scss']
})
export class TablaPagosAdminComponent implements OnInit, AfterViewInit {
  displayedColumns:string[] = ['email','ciudad','puntos','valor','cuenta','forma_pago','tipo','observacion'];
  dataSource = [];
  selectMasivo
  nameFile:string;
  length;
  pageSize = 10;
  page = 1;
  pageSizeOptions: number[] = [10, 25, 50, 100];

  //Filtros
  filtroCorreo:string = '';
  filtroCiudad:string = '';
  filtroCuenta:string = '';
  filtroFormaPago:string = '';
  filtroTipoPago:string = '';

  pagos = [];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild('download', {static:false}) plantillaBtn:ElementRef<HTMLAnchorElement>;
  @ViewChild('uploadFile',{static:false}) clickInput:ElementRef<HTMLInputElement>;
  constructor(
    private adminService:AdminService,
    private dialog:MatDialog,
    private dataService:DataUserService,
  ) { }

  ngOnInit(): void {
    this.getAllPays(this.page,this.pageSize);
    this.getSelects();
  }

  
  ngAfterViewInit(){
    this.paginator._intl.itemsPerPageLabel="Registros por pagina";
  }

  newPay(){
    const pagoRef = this.dialog.open(CrearPagoComponent,{
      width: '850px',
      disableClose: true,
    })
  }

  downloadPays(){
    this.adminService.downloadPays().subscribe((resp:any)=>{
      Utils.downloadFile(resp,'TransactionPayment-'+moment(new Date).format('yyyy-MM-DD_hh-mm-ss'));
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
    this.adminService.filePays(file,this.selectMasivo).subscribe((resp:any)=>{
      console.log(resp);
      if (this.selectMasivo == 'create') {
        this.nameFile = 'TransactionPayment-Create-'+moment(new Date).format('yyyy-MM-DD_hh-mm-ss');
      }
      Utils.downloadFile(resp,this.nameFile);
      Utils.swalSuccess('¡Excelente!','Se ha cargado el archivo con exito, verifica los resultados.')
    },(err:any)=>{
      if (err.status == 415) {
        Utils.swalErrorConfirm('¡Lo siento!',err.error.detail);
      }
    })
  }

  getAllPays(page,pageSize){
    const params = {data_filterby:[]};
    if (this.filtroCorreo != '') {
      params.data_filterby.push({
        model: "User",
        field: "email",
        type: "like",
        value: `%${this.filtroCorreo.toLowerCase()}%`
      });
    }
    if (this.filtroCiudad != '') {
      params.data_filterby.push({
        model: "GeographyCity",
        field: "name",
        type: "like",
        value: `%${this.filtroCiudad}%`
      });
    }
    if (this.filtroCuenta != '') {
      params.data_filterby.push({
        model: "TransactionPayment",
        field: "mobile_number",
        type: "like",
        value: `%${this.filtroCuenta}%`
      });
    }
    if (this.filtroFormaPago != null) {
      params.data_filterby.push({
        model: "TransactionPayment",
        field: "way_to_pay",
        type: "like",
        value: `%${this.filtroFormaPago}%`
      });
    }
    if (this.filtroTipoPago != '') {
      params.data_filterby.push({
        model: "TransactionPayment",
        field: "transaction_type",
        type: "like",
        value: `%${this.filtroTipoPago}%`
      });
    }
    this.adminService.getAllPays(params,page,pageSize).subscribe((resp:any)=>{
      this.dataSource = resp.data;
      this.length = resp.data_total_count;
      this.pageSize = resp.data_page_rows;
    })
  }

  pageEvent(event:any){
    this.pageSize = event.pageSize;
    this.page = event.pageIndex + 1;
    this.getAllPays(this.page,this.pageSize);
  }

  filtrar(){
    this.getAllPays(this.page,this.pageSize);
  }

  getSelects(){
    this.dataService.getWayPays().subscribe((resp:any)=>{
      this.pagos = resp.data;
    });
  }

}
