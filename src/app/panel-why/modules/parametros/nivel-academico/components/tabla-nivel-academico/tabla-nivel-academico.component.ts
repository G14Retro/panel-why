import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { ParametrosService } from 'src/app/services/parametros.service';
import Utils from 'src/app/Utils/tool.util';
import Swal from 'sweetalert2';
import { CrearNivelAcademicoComponent } from '../crear-nivel-academico/crear-nivel-academico.component';
import { DetalleNivelAcademicoComponent } from '../detalle-nivel-academico/detalle-nivel-academico.component';

@Component({
  selector: 'app-tabla-nivel-academico',
  templateUrl: './tabla-nivel-academico.component.html',
  styleUrls: ['./tabla-nivel-academico.component.scss']
})
export class TablaNivelAcademicoComponent implements OnInit {

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
    this.getAllNivelAcademico(this.page,this.pageSize);
    this.subscription = this.parametroService.refresh$.subscribe(()=>{
      this.getAllNivelAcademico(this.page,this.pageSize);
    });
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  detailNivelAcademico(id,edit:boolean){
    const nivelAcademicoRef = this.dialog.open(DetalleNivelAcademicoComponent,{
      width: '400px',
      disableClose: true,
      data:{id_nivel_academico: id, edit: edit},
    })
  }

  statusNivelAcademicoById(id,type){
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
        this.parametroService.statusNivelAcademicoById(id,type).subscribe(()=>{
          Utils.swalSuccess('¡Excelente!','Se ha cambiado el estado del nivel académico.');
        });
      }
    })
  }

  pageEvent(event:any){
    this.pageSize = event.pageSize;
    this.page = event.pageIndex + 1;
    this.getAllNivelAcademico(this.page,this.pageSize);
  }


  getAllNivelAcademico(page,pageSize){
    this.parametroService.getAllNivelAcademico(page,pageSize).subscribe((resp:any)=>{
      this.dataSource = resp.data;
      this.length = resp.data_total_count;
      this.pageSize = resp.data_page_rows;
    });
  }

  newNivelAcademico(){
    const nivelAcademicoRef = this.dialog.open(CrearNivelAcademicoComponent,{
      width: '400px',
      disableClose: true,
    })
  }

}
