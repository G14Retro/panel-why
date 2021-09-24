import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-tabla-puntos-admin',
  templateUrl: './tabla-puntos-admin.component.html',
  styleUrls: ['./tabla-puntos-admin.component.scss']
})
export class TablaPuntosAdminComponent implements OnInit, AfterViewInit {
  displayedColumns:string[] = ['acciones','email','codigo_estudio','estudio','registro','tipo','puntos','observacion','fecha'];
  dataSource = [];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(){
    this.paginator._intl.itemsPerPageLabel="Registros por pagina";
  }

  editUser(id){

  }

  removeUser(id){

  }

}
