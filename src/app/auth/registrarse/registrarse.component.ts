import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

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
  ) { }

  ngOnInit(): void {
    this.createForm();
    this.getCountries();
  }

  createForm(){
    this.registerForm = this.fb.group({
      nombres:['',Validators.required],
      apellidos:['',Validators.required],
      email:['',Validators.required],
      pais:['',Validators.required],
      departamento:['',Validators.required],
      ciudad:['',Validators.required],
      telefono:['',Validators.required],
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
      console.log(resp);
    });
  }

}
