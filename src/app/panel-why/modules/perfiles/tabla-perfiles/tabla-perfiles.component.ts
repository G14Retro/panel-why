import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-tabla-perfiles',
  templateUrl: './tabla-perfiles.component.html',
  styleUrls: ['./tabla-perfiles.component.scss']
})
export class TablaPerfilesComponent implements OnInit,AfterViewInit {

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
