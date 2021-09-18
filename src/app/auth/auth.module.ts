import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { MaterialModule } from '../shared/material/material.module';
import { RegistrarseComponent } from './registrarse/registrarse.component';
import { RecordarPassComponent } from './recordar-pass/recordar-pass.component';



@NgModule({
  declarations: [
    LoginComponent,
    RegistrarseComponent,
    RecordarPassComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
  ]
})
export class AuthModule { }
