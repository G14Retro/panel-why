import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { AdminService } from 'src/app/services/admin.service';
import { AuthService } from 'src/app/services/auth.service';
import Utils from 'src/app/Utils/tool.util';

@Component({
  selector: 'app-crear-usuario',
  templateUrl: './crear-usuario.component.html',
  styleUrls: ['./crear-usuario.component.scss']
})
export class CrearUsuarioComponent implements OnInit {

  userForm:FormGroup;
  countries:any[] = [];
  states:any[] = [];
  cities:any[] = [];
  constructor(
    private fb:FormBuilder,
    private authService:AuthService,
    public userRef:MatDialogRef<CrearUsuarioComponent>,
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

  createUser(){
    if (this.userForm.invalid) {
      return
    }
    this.adminService.createUser(this.userForm.value).subscribe((resp:any)=>{
      Utils.swalSuccess('¡Excelente!','Se ha creado el usuario con exito.');
      this.userRef.close();
    },(err:any)=>{
      console.log(err);
      Utils.swalErrorConfirm('¡Lo siento!',err.error.detail);
    }
    );
  }

  get error():any {return this.userForm.controls}

}
