import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { ParametrosService } from 'src/app/services/parametros.service';
import Utils from 'src/app/Utils/tool.util';
import Swal from 'sweetalert2';
import { CrearTipoDocumentoComponent } from '../crear-tipo-documento/crear-tipo-documento.component';
import { DetalleTipoDocumentoComponent } from '../detalle-tipo-documento/detalle-tipo-documento.component';

@Component({
  selector: 'app-tabla-tipo-documento',
  templateUrl: './tabla-tipo-documento.component.html',
  styleUrls: ['./tabla-tipo-documento.component.scss']
})
export class TablaTipoDocumentoComponent implements OnInit,OnDestroy {

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
    this.getAllTypeDocuments(this.page,this.pageSize);
    this.subscription = this.parametroService.refresh$.subscribe(()=>{
      this.getAllTypeDocuments(this.page,this.pageSize);
    });
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  detailType(id,edit:boolean){
    const documentRef = this.dialog.open(DetalleTipoDocumentoComponent,{
      width: '400px',
      disableClose: true,
      data:{id_document: id, edit: edit},
    })
  }

  statusTypeNitById(id,type){
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
        this.parametroService.statusTypeNitById(id,type).subscribe(()=>{
          Utils.swalSuccess('¡Excelente!','Se ha cambiado el estado del tipo de documento.');
        });
      }
    })
  }

  pageEvent(event:any){
    this.pageSize = event.pageSize;
    this.page = event.pageIndex + 1;
    this.getAllTypeDocuments(this.page,this.pageSize);
  }


  getAllTypeDocuments(page,pageSize){
    this.parametroService.getAllTypeDocument(page,pageSize).subscribe((resp:any)=>{
      this.dataSource = resp.data;
      this.length = resp.data_total_count;
      this.pageSize = resp.data_page_rows;
    });
  }

  newTypeDocument(){
    const documentRef = this.dialog.open(CrearTipoDocumentoComponent,{
      width: '400px',
      disableClose: true,
    })
  }

}
