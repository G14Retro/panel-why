import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { PointService } from 'src/app/services/point.service';

@Component({
  selector: 'app-tabla-puntos',
  templateUrl: './tabla-puntos.component.html',
  styleUrls: ['./tabla-puntos.component.scss']
})
export class TablaPuntosComponent implements OnInit, AfterViewInit {
  displayedColumns:string[] = ['study_code','study_name','registry','date_points','transaction_type','points','observation'];
  dataSource = new MatTableDataSource();

  length;
  pageSize = 10;
  page = 1;
  pageSizeOptions: number[] = [10, 25, 50, 100];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(
    private pointService:PointService
  ) { }

  ngOnInit(): void {
    this.getPoints(this.page,this.pageSize);
  }

  ngAfterViewInit(){
    this.paginator._intl.itemsPerPageLabel="Registros por pagina"
  }

  getPoints(page:number,pageSize:number){

    const params = {
      page: page,
      pageSize: pageSize
    }

    this.pointService.getPoints(params).subscribe((resp:any)=>{
      this.dataSource.data = resp.data;
      this.length = resp.data_total_count;
      this.pageSize = resp.data_page_rows;
    })
  }

  pageEvent(event:any){
    this.pageSize = event.pageSize;
    this.page = event.pageIndex + 1;
    this.getPoints(this.page,this.pageSize);
  }

}
