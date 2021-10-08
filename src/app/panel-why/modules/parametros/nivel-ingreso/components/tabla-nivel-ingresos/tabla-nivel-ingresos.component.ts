import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { ParametrosService } from 'src/app/services/parametros.service';
import Utils from 'src/app/Utils/tool.util';
import Swal from 'sweetalert2';
import { CrearNivelIngresoComponent } from '../crear-nivel-ingreso/crear-nivel-ingreso.component';
import { DetalleNivelIngresoComponent } from '../detalle-nivel-ingreso/detalle-nivel-ingreso.component';

@Component({
  selector: 'app-tabla-nivel-ingresos',
  templateUrl: './tabla-nivel-ingresos.component.html',
  styleUrls: ['./tabla-nivel-ingresos.component.scss']
})
export class TablaNivelIngresosComponent implements OnInit {

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
    this.getAllNivelIngreso(this.page,this.pageSize);
    this.subscription = this.parametroService.refresh$.subscribe(()=>{
      this.getAllNivelIngreso(this.page,this.pageSize);
    });
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  detailNivelIngreso(id,edit:boolean){
    const nivelIngresoRef = this.dialog.open(DetalleNivelIngresoComponent,{
      width: '400px',
      disableClose: true,
      data:{id_nivel_academico: id, edit: edit},
    })
  }

  statusNivelIngresoById(id,type){
    Swal.fire({
      icon: 'warning',
      title: '¿Desea cambiar el estado de este nivel de ingreso?',
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar',
      showCancelButton: true,
      reverseButtons: true,
      confirmButtonColor: '#C44A5D'
    }).then(result=>{
      if (result.isConfirmed) {
        this.parametroService.statusNivelIngresoById(id,type).subscribe(()=>{
          Utils.swalSuccess('¡Excelente!','Se ha cambiado el estado del nivel de ingreso.');
        });
      }
    })
  }

  pageEvent(event:any){
    this.pageSize = event.pageSize;
    this.page = event.pageIndex + 1;
    this.getAllNivelIngreso(this.page,this.pageSize);
  }


  getAllNivelIngreso(page,pageSize){
    this.parametroService.getAllNivelIngreso(page,pageSize).subscribe((resp:any)=>{
      this.dataSource = resp.data;
      this.length = resp.data_total_count;
      this.pageSize = resp.data_page_rows;
    });
  }

  newNivelIngreso(){
    const nivelIngresoRef = this.dialog.open(CrearNivelIngresoComponent,{
      width: '400px',
      disableClose: true,
    })
  }

}
