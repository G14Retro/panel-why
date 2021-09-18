import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-recordar-pass',
  templateUrl: './recordar-pass.component.html',
  styleUrls: ['./recordar-pass.component.scss']
})
export class RecordarPassComponent implements OnInit {

  email:string = '';
  constructor() { }

  ngOnInit(): void {
  }

}
