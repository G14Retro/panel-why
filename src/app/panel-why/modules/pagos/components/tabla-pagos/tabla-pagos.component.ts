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

  length;
  pageSize = 10;
  page = 1;
  pageSizeOptions: number[] = [10, 25, 50, 100];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(
    private payService:PayService
  ) { }

  ngOnInit(): void {
    this.getPays(this.page,this.pageSize);
  }

  ngAfterViewInit(){
    this.paginator._intl.itemsPerPageLabel="Registros por pagina"
  }

  getPays(page:number,pageSize:number){
    const params = {
      page: page,
      pageSize: pageSize
    }
    this.payService.getPays(params).subscribe((resp:any)=>{
      console.log(resp);
      this.dataSource.data = resp.data
      this.length = resp.data_total_count;
      this.pageSize = resp.data_query_count;
    });
  }

  pageEvent(event:any){
    this.pageSize = event.pageSize;
    this.page = event.pageIndex + 1;
    this.getPays(this.page,this.pageSize);
  }

}
