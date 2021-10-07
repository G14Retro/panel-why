import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { ParametrosService } from 'src/app/services/parametros.service';
import Utils from 'src/app/Utils/tool.util';
import Swal from 'sweetalert2';
import { CrearGeneroComponent } from '../crear-genero/crear-genero.component';
import { DetalleGeneroComponent } from '../detalle-genero/detalle-genero.component';

@Component({
  selector: 'app-tabla-generos',
  templateUrl: './tabla-generos.component.html',
  styleUrls: ['./tabla-generos.component.scss']
})
export class TablaGenerosComponent implements OnInit, OnDestroy {

  displayedColumns:string[] = ['acciones','nombre','genero','codigo','estado','fecha_creacion','fecha_actualizacion'];
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
    this.getAllGeneros(this.page,this.pageSize);
    this.subscription = this.parametroService.refresh$.subscribe(()=>{
      this.getAllGeneros(this.page,this.pageSize);
    });
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  detailGenero(id,edit:boolean){
    const generoRef = this.dialog.open(DetalleGeneroComponent,{
      width: '400px',
      disableClose: true,
      data:{id_genero: id, edit: edit},
    })
  }

  statusGeneroById(id,type){
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
        this.parametroService.statusGeneroById(id,type).subscribe(()=>{
          Utils.swalSuccess('¡Excelente!','Se ha cambiado el estado del género.');
        });
      }
    })
  }

  pageEvent(event:any){
    this.pageSize = event.pageSize;
    this.page = event.pageIndex + 1;
    this.getAllGeneros(this.page,this.pageSize);
  }


  getAllGeneros(page,pageSize){
    this.parametroService.getAllGeneros(page,pageSize).subscribe((resp:any)=>{
      console.log(resp.data);
      this.dataSource = resp.data;
      this.length = resp.data_total_count;
      this.pageSize = resp.data_page_rows;
    });
  }

  newGenero(){
    const generoRef = this.dialog.open(CrearGeneroComponent,{
      width: '400px',
      disableClose: true,
    })
  }

}
