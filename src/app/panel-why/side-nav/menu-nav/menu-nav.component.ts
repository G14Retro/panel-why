import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { DashboardService } from 'src/app/services/dashboard.service';

@Component({
  selector: 'app-menu-nav',
  templateUrl: './menu-nav.component.html',
  styleUrls: ['./menu-nav.component.scss']
})
export class MenuNavComponent implements OnInit {

  actual = 0;
  profile = '';
  constructor(
    private dashboard:DashboardService,
    private authService:AuthService
  ) { }

  ngOnInit(): void {
    this.getPoints();
    this.getProfile();
  }

  getPoints(){
    this.dashboard.getPoints().subscribe((resp:any)=>{
      this.actual = resp.points_actual;
    });
  }

  getProfile(){
    this.dashboard.getProfile().subscribe((resp:any)=>{
      this.profile = resp.user_type;
    });
  }

  logOut(){
    this.authService.logOut();
  }

}
