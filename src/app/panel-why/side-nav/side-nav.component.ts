import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit {

  opened:boolean = true;
  showbutton:boolean = false;
  constructor() { }

  ngOnInit(): void {
    console.log(window.screen.width);
    if (window.screen.width < 576) {
      this.showbutton = true;
    }else{
      this.showbutton = false;
    }
  }

}
