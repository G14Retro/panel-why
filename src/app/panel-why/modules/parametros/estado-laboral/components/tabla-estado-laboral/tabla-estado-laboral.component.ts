import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { ParametrosService } from 'src/app/services/parametros.service';
import Utils from 'src/app/Utils/tool.util';
import Swal from 'sweetalert2';
import { CrearEstadoLaboralComponent } from '../crear-estado-laboral/crear-estado-laboral.component';
import { DetalleEstadoLaboralComponent } from '../detalle-estado-laboral/detalle-estado-laboral.component';

@Component({
  selector: 'app-tabla-estado-laboral',
  templateUrl: './tabla-estado-laboral.component.html',
  styleUrls: ['./tabla-estado-laboral.component.scss']
})
export class TablaEstadoLaboralComponent implements OnInit {

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
    this.getAllEstadoLaboral(this.page,this.pageSize);
    this.subscription = this.parametroService.refresh$.subscribe(()=>{
      this.getAllEstadoLaboral(this.page,this.pageSize);
    });
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  detailEstadoLaboral(id,edit:boolean){
    const estadoLaboralRef = this.dialog.open(DetalleEstadoLaboralComponent,{
      width: '400px',
      disableClose: true,
      data:{id_estado_laboral: id, edit: edit},
    })
  }

  statusEstadoLaboralById(id,type){
    Swal.fire({
      icon: 'warning',
      title: '¿Desea cambiar el estado de este nivel académico?',
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar',
      showCancelButton: true,
      reverseButtons: true,
      confirmButtonColor: '#C44A5D'
    }).then(result=>{
      if (result.isConfirmed) {
        this.parametroService.statusEstadoLaboralById(id,type).subscribe(()=>{
          Utils.swalSuccess('¡Excelente!','Se ha cambiado el estado del nivel académico.');
        });
      }
    })
  }

  pageEvent(event:any){
    this.pageSize = event.pageSize;
    this.page = event.pageIndex + 1;
    this.getAllEstadoLaboral(this.page,this.pageSize);
  }


  getAllEstadoLaboral(page,pageSize){
    this.parametroService.getAllEstadoLaboral(page,pageSize).subscribe((resp:any)=>{
      this.dataSource = resp.data;
      this.length = resp.data_total_count;
      this.pageSize = resp.data_page_rows;
    });
  }

  newEstadoLaboral(){
    const estadoLaboralRef = this.dialog.open(CrearEstadoLaboralComponent,{
      width: '400px',
      disableClose: true,
    })
  }
}
