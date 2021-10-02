import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { AdminService } from 'src/app/services/admin.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-detalle-usuario',
  templateUrl: './detalle-usuario.component.html',
  styleUrls: ['./detalle-usuario.component.scss']
})
export class DetalleUsuarioComponent implements OnInit {

  userForm:FormGroup;
  countries:any[] = [];
  states:any[] = [];
  cities:any[] = [];
  constructor(
    private fb:FormBuilder,
    private authService:AuthService,
    public userRef:MatDialogRef<DetalleUsuarioComponent>,
    private adminService:AdminService,
  ) { }

  ngOnInit(): void {
    this.createForm();
    this.getCountries();
  }

  createForm(){
    this.userForm = this.fb.group({
      names:['',Validators.required],
      surnames:['',Validators.required],
      email:['',[Validators.required,Validators.email]],
      pais:['',Validators.required],
      departamento:['',Validators.required],
      geography_city_id:['',Validators.required],
      mobile_number:['',[Validators.required,Validators.pattern('.{10,10}')]],
      is_superuser: [true,Validators.required],
    })
  }

  getCountries(){
    this.authService.getCountries().subscribe((resp:any)=>{
      this.countries = resp.data
    });
  }

  getStates(){
    this.authService.getStates(this.userForm.get('pais').value).subscribe((resp:any)=>{
      this.states = resp.data;
    });
  }

  getCities(){
    this.authService.getCities(this.userForm.get('departamento').value).subscribe((resp:any)=>{
      this.cities = resp.data;
    });
  }

  updateteUser(){
    
  }

}
