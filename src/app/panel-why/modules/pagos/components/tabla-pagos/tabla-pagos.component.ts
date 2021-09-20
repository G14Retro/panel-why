import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { PayService } from 'src/app/services/pay.service';

@Component({
  selector: 'app-tabla-pagos',
  templateUrl: './tabla-pagos.component.html',
  styleUrls: ['./tabla-pagos.component.scss']
})
export class TablaPagosComponent implements OnInit,AfterViewInit {

  displayedColumns:string[] = ['points','value','mobile_number','way_to_pay','date_payed','transaction_type','observation'];
  dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(
    private payService:PayService
  ) { }

  ngOnInit(): void {
    this.getPays();
  }

  ngAfterViewInit(){
    this.dataSource.paginator = this.paginator;
    this.paginator._intl.itemsPerPageLabel="Registros por pagina"
  }

  getPays(){
    this.payService.getPays().subscribe((resp:any)=>{
      this.dataSource.data = resp
    });
  }

}
