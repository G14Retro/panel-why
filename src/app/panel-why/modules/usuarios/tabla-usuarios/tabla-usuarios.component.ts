import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-tabla-usuarios',
  templateUrl: './tabla-usuarios.component.html',
  styleUrls: ['./tabla-usuarios.component.scss']
})
export class TablaUsuariosComponent implements OnInit, AfterViewInit {

  displayedColumns:string[] = ['acciones','nombres','apellidos','email','estado','tipo_usuario'];
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
