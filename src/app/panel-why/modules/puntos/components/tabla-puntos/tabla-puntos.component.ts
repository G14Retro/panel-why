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
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(
    private pointService:PointService
  ) { }

  ngOnInit(): void {
    this.getPoints();
  }

  ngAfterViewInit(){
    this.dataSource.paginator = this.paginator;
    this.paginator._intl.itemsPerPageLabel="Registros por pagina"
  }

  getPoints(){
    this.pointService.getPoints().subscribe((resp:any)=>{
      console.log(resp);
      this.dataSource.data = resp.data;
    })
  }

}
