import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { ParametrosService } from 'src/app/services/parametros.service';
import Utils from 'src/app/Utils/tool.util';
import Swal from 'sweetalert2';
import { CrearEstadoCivilComponent } from '../crear-estado-civil/crear-estado-civil.component';
import { DetalleEstadoCivilComponent } from '../detalle-estado-civil/detalle-estado-civil.component';

@Component({
  selector: 'app-tabla-estado-civil',
  templateUrl: './tabla-estado-civil.component.html',
  styleUrls: ['./tabla-estado-civil.component.scss']
})
export class TablaEstadoCivilComponent implements OnInit {

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
    this.getAllEstadoCivil(this.page,this.pageSize);
    this.subscription = this.parametroService.refresh$.subscribe(()=>{
      this.getAllEstadoCivil(this.page,this.pageSize);
    });
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  detailEstadoCivil(id,edit:boolean){
    const decisorRef = this.dialog.open(DetalleEstadoCivilComponent,{
      width: '400px',
      disableClose: true,
      data:{id_estado: id, edit: edit},
    })
  }

  statusEstadoCivilById(id,type){
    Swal.fire({
      icon: 'warning',
      title: '¿Desea cambiar el estado de este tipo del estado civil?',
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar',
      showCancelButton: true,
      reverseButtons: true,
      confirmButtonColor: '#C44A5D'
    }).then(result=>{
      if (result.isConfirmed) {
        this.parametroService.statusEstadoCivilById(id,type).subscribe(()=>{
          Utils.swalSuccess('¡Excelente!','Se ha cambiado el estado del estado civil.');
        });
      }
    })
  }

  pageEvent(event:any){
    this.pageSize = event.pageSize;
    this.page = event.pageIndex + 1;
    this.getAllEstadoCivil(this.page,this.pageSize);
  }


  getAllEstadoCivil(page,pageSize){
    this.parametroService.getAllEstadoCivil(page,pageSize).subscribe((resp:any)=>{
      this.dataSource = resp.data;
      this.length = resp.data_total_count;
      this.pageSize = resp.data_page_rows;
    });
  }

  newEstadoCivil(){
    const decisorRef = this.dialog.open(CrearEstadoCivilComponent,{
      width: '400px',
      disableClose: true,
    })
  }

}
