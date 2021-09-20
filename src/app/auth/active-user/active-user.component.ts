import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-active-user',
  templateUrl: './active-user.component.html',
  styleUrls: ['./active-user.component.scss']
})
export class ActiveUserComponent implements OnInit {

  token:string = '';
  mensaje:string = '';
  showBtn:boolean = false;
  constructor(
    private authService:AuthService,
    private aRoute:ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.aRoute.paramMap.subscribe(params=>{
      this.token = params.get('token');
    })
    this.activeUser();
  }

  activeUser(){
    this.authService.activeUser(this.token).subscribe(()=>{
      this.mensaje = 'Gracias por confirmar tu cuenta ya puedes iniciar sesión.';
      this.showBtn = true;
    },()=>{
      this.mensaje = 'Ha sucedido un error al activar tu cuenta.';
      this.showBtn = false;
    }
    );
  }

  login(){
    sessionStorage.clear();
    localStorage.clear();
    window.location.replace('/login');
  }

}
