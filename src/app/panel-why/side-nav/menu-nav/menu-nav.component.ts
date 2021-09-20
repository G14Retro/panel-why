import { Component, OnInit } from '@angular/core';
import { DashboardService } from 'src/app/services/dashboard.service';

@Component({
  selector: 'app-menu-nav',
  templateUrl: './menu-nav.component.html',
  styleUrls: ['./menu-nav.component.scss']
})
export class MenuNavComponent implements OnInit {

  actual = 0;
  constructor(
    private dashboard:DashboardService
  ) { }

  ngOnInit(): void {
  }

  getPoints(){
    this.dashboard.getPoints().subscribe((resp:any)=>{
      this.actual = resp.points_actual;
    });
  }

}
