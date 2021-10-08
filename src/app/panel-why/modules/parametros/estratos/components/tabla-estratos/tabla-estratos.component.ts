import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { ParametrosService } from 'src/app/services/parametros.service';
import Utils from 'src/app/Utils/tool.util';
import Swal from 'sweetalert2';
import { CrearEstratoComponent } from '../crear-estrato/crear-estrato.component';
import { DetalleEstratoComponent } from '../detalle-estrato/detalle-estrato.component';

@Component({
  selector: 'app-tabla-estratos',
  templateUrl: './tabla-estratos.component.html',
  styleUrls: ['./tabla-estratos.component.scss']
})
export class TablaEstratosComponent implements OnInit, OnDestroy {

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
    this.getAllEstratos(this.page,this.pageSize);
    this.subscription = this.parametroService.refresh$.subscribe(()=>{
      this.getAllEstratos(this.page,this.pageSize);
    });
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  detailEstrato(id,edit:boolean){
    const documentRef = this.dialog.open(DetalleEstratoComponent,{
      width: '400px',
      disableClose: true,
      data:{id_document: id, edit: edit},
    })
  }

  statusEstratoById(id,type){
    Swal.fire({
      icon: 'warning',
      title: '¿Desea cambiar el estado de este tipo de documento?',
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar',
      showCancelButton: true,
      reverseButtons: true,
      confirmButtonColor: '#C44A5D'
    }).then(result=>{
      if (result.isConfirmed) {
        this.parametroService.statusEstratoById(id,type).subscribe(()=>{
          Utils.swalSuccess('¡Excelente!','Se ha cambiado el estado del tipo de documento.');
        });
      }
    })
  }

  pageEvent(event:any){
    this.pageSize = event.pageSize;
    this.page = event.pageIndex + 1;
    this.getAllEstratos(this.page,this.pageSize);
  }


  getAllEstratos(page,pageSize){
    this.parametroService.getAllEstratos(page,pageSize).subscribe((resp:any)=>{
      this.dataSource = resp.data;
      this.length = resp.data_total_count;
      this.pageSize = resp.data_page_rows;
    });
  }

  newEstrato(){
    const documentRef = this.dialog.open(CrearEstratoComponent,{
      width: '400px',
      disableClose: true,
    })
  }


}
