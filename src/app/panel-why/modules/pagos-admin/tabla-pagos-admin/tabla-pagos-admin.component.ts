import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-tabla-pagos-admin',
  templateUrl: './tabla-pagos-admin.component.html',
  styleUrls: ['./tabla-pagos-admin.component.scss']
})
export class TablaPagosAdminComponent implements OnInit, AfterViewInit {
  displayedColumns:string[] = ['acciones','email','puntos','valor','cuenta','forma_pago','tipo','observacion','fecha'];
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
