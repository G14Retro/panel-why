import { Component, OnInit } from '@angular/core';
import { DashboardService } from 'src/app/services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  total=0;
  actuales=0;
  redimir=0;
  valor=0;
  constructor(
    private dashboardService:DashboardService
  ) { }

  ngOnInit(): void {
    this.getPoints();
  }

  getPoints(){
    this.dashboardService.getPoints().subscribe((resp:any)=>{
      this.total = resp.points_total;
      this.actuales = resp.points_actual;
      this.redimir = resp.points_redention;
      this.valor = resp.value;
    });
  }

}
