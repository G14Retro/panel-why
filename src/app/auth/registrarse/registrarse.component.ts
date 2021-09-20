import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth.service';
import Utils from 'src/app/Utils/tool.util';

@Component({
  selector: 'app-registrarse',
  templateUrl: './registrarse.component.html',
  styleUrls: ['./registrarse.component.scss']
})
export class RegistrarseComponent implements OnInit {
  password:boolean = true;
  confirma:boolean = true;
  registerForm:FormGroup;
  countries:any[] = [];
  states:any[] = [];
  cities:any[] = [];
  constructor(
    private fb:FormBuilder,
    private authService:AuthService,
    private registroRef:MatDialogRef<RegistrarseComponent>
  ) { }

  ngOnInit(): void {
    this.createForm();
    this.getCountries();
  }

  createForm(){
    this.registerForm = this.fb.group({
      names:['',Validators.required],
      surnames:['',Validators.required],
      email:['',Validators.required],
      pais:['',Validators.required],
      departamento:['',Validators.required],
      geography_city_id:['',Validators.required],
      mobile_number:['',Validators.required],
      password:['',Validators.required],
      confirma:['',Validators.required],
    });
  }

  getCountries(){
    this.authService.getCountries().subscribe((resp:any)=>{
      this.countries = resp
    });
  }

  getStates(){
    this.authService.getStates(this.registerForm.get('pais').value).subscribe((resp:any)=>{
      this.states = resp;
    });
  }

  getCities(){
    console.log(this.registerForm.get('departamento').value);
    this.authService.getCities(this.registerForm.get('departamento').value).subscribe((resp:any)=>{
      this.cities = resp;
    });
  }

  singUp(){
    this.authService.signUp(this.registerForm.value).subscribe(()=>{
      Utils.swalSuccess('¡Excelente!','Se ha registrado correctamente, por favor verifique su correo para activar su cuenta.');
      this.authService.sendEmailActive(this.registerForm.get('username'));
      this.registroRef.close();
    },(err:any)=>{
      if (err.status === 461) {
        Utils.swalError('¡Lo siento!','El usuario ya se encuentra registrado')
      }

    }
    );
  }

}
