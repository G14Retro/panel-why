import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
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
  chartPuntos;
  chartPagos;
  meses = [];
  puntos = [];
  pagos = [];
  constructor(
    private dashboardService:DashboardService
  ) {
    Chart.register(...registerables);
   }

  ngOnInit(): void {
    this.getPoints();
    this.graphic();
  }

  getPoints(){
    this.dashboardService.getPoints().subscribe((resp:any)=>{
      this.total = resp.points_total;
      this.actuales = resp.points_actual;
      this.redimir = resp.points_redention;
      this.valor = resp.value;
    });
  }

  graphic(){
    this.dashboardService.getDataPlot().subscribe((resp:any)=>{
      console.log(resp);
      this.meses = resp.months;
      this.puntos =resp.data_points;
      this.pagos = resp.data_payments;
      this.chartPuntos = new Chart('puntos',{
        type: 'line',
        data: {
          labels: resp.months.reverse(),
          datasets: [
            {
              label: 'Puntos',
              data: resp.data_points.reverse(),
              borderWidth: 1,
              backgroundColor: '#05A208',
              borderColor: '#05A208',
            },
          ]
        },
        options:{
          devicePixelRatio: 2,
        }
      });
      this.chartPagos = new Chart('pagos',{
        type: 'line',
        data: {
          labels: resp.months,
          datasets: [
            {
              label: 'Pagos',
              data: resp.data_payments.reverse(),
              borderWidth: 1,
              backgroundColor: '#EA841D',
              borderColor: '#EA841D',
            },
          ]
        }
      });
    });
  }

}
