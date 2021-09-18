import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
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
    private remember:MatDialog
  ) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm(){
    this.loginForm = this.fb.group({
      user:['',Validators.required],
      password:['',Validators.required],
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

}
