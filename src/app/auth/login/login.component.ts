import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Utils from 'src/app/Utils/tool.util';
import { RecordarPassComponent } from '../recordar-pass/recordar-pass.component';
import { RegistrarseComponent } from '../registrarse/registrarse.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm:FormGroup;
  oculto:boolean = true
  constructor(
    private fb:FormBuilder,
    private register:MatDialog,
    private remember:MatDialog,
    private authService:AuthService,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm(){
    this.loginForm = this.fb.group({
      username:['',Validators.required],
      password:['',Validators.required],
      remember:[false,Validators.required],
    });
  }

  openRemember(){
    const rememberRef = this.remember.open(RecordarPassComponent,{
      width: '600px',
    })
  }

  openRegister(){
    const registerRef = this.register.open(RegistrarseComponent,{
      width: '600px',
    })
  }

  login(){
    if (this.loginForm.invalid) {
      return
    }
    this.authService.singIn(this.loginForm.value).subscribe(()=>{
      this.router.navigateByUrl('');
    },
    (err:any)=>{
      console.log(err);
      if (err.status === 400) {
        Utils.swalError('¡Lo siento!','Usuario o contraseña incorrecto.');
      }
      if (err.status === 401) {
        Utils.swalError('¡Lo siento!','El usuario se encuentra ináctivo.');
      }
    });
  }

}
