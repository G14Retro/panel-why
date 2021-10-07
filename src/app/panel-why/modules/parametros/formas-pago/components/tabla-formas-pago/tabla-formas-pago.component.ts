import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { ParametrosService } from 'src/app/services/parametros.service';
import Utils from 'src/app/Utils/tool.util';
import Swal from 'sweetalert2';
import { CrearFormaPagoComponent } from '../crear-forma-pago/crear-forma-pago.component';
import { DetalleFormaPagoComponent } from '../detalle-forma-pago/detalle-forma-pago.component';

@Component({
  selector: 'app-tabla-formas-pago',
  templateUrl: './tabla-formas-pago.component.html',
  styleUrls: ['./tabla-formas-pago.component.scss']
})
export class TablaFormasPagoComponent implements OnInit {

  displayedColumns:string[] = ['acciones','nombre','codigo','estado','fecha_creacion','fecha_actualizacion'];
  dataSource = [];
  length;
  pageSize = 10;
  page = 1;
  pageSizeOptions: number[] = [10, 25, 50, 100];
  //Observable para los cambios de la tabla
  subscription:Subscription;
  constructor(
    private parametroService:ParametrosService,
    private dialog:MatDialog,
  ) { }

  ngOnInit(): void {
    this.getAllFormaPago(this.page,this.pageSize);
    this.subscription = this.parametroService.refresh$.subscribe(()=>{
      this.getAllFormaPago(this.page,this.pageSize);
    });
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  detailFormaPago(id,edit:boolean){
    const formPagoRef = this.dialog.open(DetalleFormaPagoComponent,{
      width: '400px',
      disableClose: true,
      data:{id_forma_pago: id, edit: edit},
    })
  }

  statusFormaPagoById(id,type){
    Swal.fire({
      icon: 'warning',
      title: '¿Desea cambiar el estado de esta forma de pago?',
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar',
      showCancelButton: true,
      reverseButtons: true,
      confirmButtonColor: '#C44A5D'
    }).then(result=>{
      if (result.isConfirmed) {
        this.parametroService.statusFormaPagoById(id,type).subscribe(()=>{
          Utils.swalSuccess('¡Excelente!','Se ha cambiado el estado de la forma de pago.');
        });
      }
    })
  }

  pageEvent(event:any){
    this.pageSize = event.pageSize;
    this.page = event.pageIndex + 1;
    this.getAllFormaPago(this.page,this.pageSize);
  }


  getAllFormaPago(page,pageSize){
    this.parametroService.getAllFormaPago(page,pageSize).subscribe((resp:any)=>{
      this.dataSource = resp.data;
      this.length = resp.data_total_count;
      this.pageSize = resp.data_page_rows;
    });
  }

  newFormaPago(){
    const formPagoRef = this.dialog.open(CrearFormaPagoComponent,{
      width: '400px',
      disableClose: true,
    })
  }

}
