import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { ParametrosService } from 'src/app/services/parametros.service';
import Utils from 'src/app/Utils/tool.util';
import Swal from 'sweetalert2';
import { CrearDecisorComponent } from '../crear-decisor/crear-decisor.component';
import { DetalleDecisorComponent } from '../detalle-decisor/detalle-decisor.component';

@Component({
  selector: 'app-tabla-decisores',
  templateUrl: './tabla-decisores.component.html',
  styleUrls: ['./tabla-decisores.component.scss']
})
export class TablaDecisoresComponent implements OnInit, OnDestroy {

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
    this.getAllDecisores(this.page,this.pageSize);
    this.subscription = this.parametroService.refresh$.subscribe(()=>{
      this.getAllDecisores(this.page,this.pageSize);
    });
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  detailDecisor(id,edit:boolean){
    const decisorRef = this.dialog.open(DetalleDecisorComponent,{
      width: '400px',
      disableClose: true,
      data:{id_decisor: id, edit: edit},
    })
  }

  statusDecisorById(id,type){
    Swal.fire({
      icon: 'warning',
      title: '¿Desea cambiar el estado de este tipo de género?',
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar',
      showCancelButton: true,
      reverseButtons: true,
      confirmButtonColor: '#C44A5D'
    }).then(result=>{
      if (result.isConfirmed) {
        this.parametroService.statusDecisorById(id,type).subscribe(()=>{
          Utils.swalSuccess('¡Excelente!','Se ha cambiado el estado del género.');
        });
      }
    })
  }

  pageEvent(event:any){
    this.pageSize = event.pageSize;
    this.page = event.pageIndex + 1;
    this.getAllDecisores(this.page,this.pageSize);
  }


  getAllDecisores(page,pageSize){
    this.parametroService.getAllDecisores(page,pageSize).subscribe((resp:any)=>{
      this.dataSource = resp.data;
      this.length = resp.data_total_count;
      this.pageSize = resp.data_page_rows;
    });
  }

  newDecisor(){
    const decisorRef = this.dialog.open(CrearDecisorComponent,{
      width: '400px',
      disableClose: true,
    })
  }
}
