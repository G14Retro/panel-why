import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { AdminService } from 'src/app/services/admin.service';
import { AuthService } from 'src/app/services/auth.service';
import { DataUserService } from 'src/app/services/data-user.service';
import Utils from 'src/app/Utils/tool.util';

@Component({
  selector: 'app-usuario-propio',
  templateUrl: './usuario-propio.component.html',
  styleUrls: ['./usuario-propio.component.scss']
})
export class UsuarioPropioComponent implements OnInit {

  usuarioForm:FormGroup;
  countries = [];
  states = [];
  cities = [];
  constructor(
    private dataUserService:DataUserService,
    private fb:FormBuilder,
    private authService:AuthService,
    private usuarioRef:MatDialogRef<UsuarioPropioComponent>
  ) { }

  ngOnInit(): void {
    this.createForm();
    this.getMyUser();
  }

  createForm(){
    this.usuarioForm = this.fb.group({
      names:['',Validators.required],
      surnames:['',Validators.required],
      email:[{value:'',disabled:true},[Validators.required,Validators.email]],
      pais:[{value:'',disabled:true},Validators.required],
      departamento:[{value:'',disabled:true},Validators.required],
      geography_city_id:[{value:'',disabled:true},Validators.required],
      mobile_number:['',[Validators.required,Validators.pattern('.{10,10}')]],
    })
  }

  getMyUser(){
    this.dataUserService.getMyUser().subscribe((resp:any)=>{
      this.usuarioForm.get('names').setValue(resp.names);
      this.usuarioForm.get('surnames').setValue(resp.surnames);
      this.usuarioForm.get('email').setValue(resp.email);
      this.usuarioForm.get('geography_city_id').setValue(resp.geography_city_id);
      this.usuarioForm.get('mobile_number').setValue(resp.mobile_number);
      this.getCityById(this.usuarioForm.get('geography_city_id').value);
    });
  }

  getCountries(){
    this.authService.getCountries().subscribe((resp:any)=>{
      this.countries = resp.data
    });
  }

  getStates(){
    this.authService.getStates(this.usuarioForm.get('pais').value).subscribe((resp:any)=>{
      this.states = resp.data;
    });
  }

  getCities(){
    this.authService.getCities(this.usuarioForm.get('departamento').value).subscribe((resp:any)=>{
      this.cities = resp.data;
    });
  }

  getCityById(id_city){
    this.dataUserService.getCityById(id_city).subscribe((resp:any)=>{
      this.usuarioForm.get('departamento').setValue(resp.parent_id);
      this.getStateyById(this.usuarioForm.get('departamento').value)
    })
  }

  getStateyById(id_state){
    this.dataUserService.getStateById(id_state).subscribe((resp:any)=>{
      this.usuarioForm.get('pais').setValue(resp.parent_id);
      this.getCountries();
      this.getStates();
      this.getCities();
    })
  }

  updateUser(){
    this.usuarioForm.enable();
    this.dataUserService.updateMyUser(this.usuarioForm.value).subscribe((resp)=>{
      this.usuarioForm.disable();
      Utils.swalSuccess('¡Excelente!','Se ha actualizado su usuario correctamente.');
      this.usuarioRef.close();
    });
  }

}
