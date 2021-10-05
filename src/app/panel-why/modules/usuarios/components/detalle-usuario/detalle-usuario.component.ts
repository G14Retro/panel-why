import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AdminService } from 'src/app/services/admin.service';
import { AuthService } from 'src/app/services/auth.service';
import Utils from 'src/app/Utils/tool.util';

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
    @Inject(MAT_DIALOG_DATA) public datos:any,
    private adminService:AdminService,
  ) { }

  ngOnInit(): void {
    this.createForm();
    this.getUserById();
    this.validEdit();
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

  getUserById(){
    console.log(this.datos);
    this.adminService.getUserById(this.datos.id_user).subscribe((resp:any)=>{
      this.userForm.get('names').setValue(resp.names);
      this.userForm.get('surnames').setValue(resp.surnames);
      this.userForm.get('email').setValue(resp.email);
      this.userForm.get('geography_city_id').setValue(resp.geography_city_id);
      this.userForm.get('mobile_number').setValue(resp.mobile_number);
      this.userForm.get('is_superuser').setValue(resp.is_superuser);
      this.getCityById(this.userForm.get('geography_city_id').value);
    });
  }

  getCityById(id_city){
    this.adminService.getCityById(id_city).subscribe((resp:any)=>{
      this.userForm.get('departamento').setValue(resp.parent_id);
      this.getStateyById(this.userForm.get('departamento').value)
    })
  }

  getStateyById(id_state){
    this.adminService.getStateById(id_state).subscribe((resp:any)=>{
      this.userForm.get('pais').setValue(resp.parent_id);
      this.getCountries();
      this.getStates();
      this.getCities();
    })
  }

  validEdit(){
    if (this.datos.edit) {
      this.userForm.enable();
    }else{
      this.userForm.disable();
    }
  }

  edit(){
    this.datos.edit = !this.datos.edit;
    this.validEdit();
  }

  updateUser(){
    if (this.userForm.invalid) {
      return
    }
    this.adminService.updateUserById(this.datos.id_user,this.userForm.value).subscribe(()=>{
      Utils.swalSuccess('¡Excelente!','Se ha actualizado la información del usuario correctamente.');
      this.userRef.close();
    },(err:any)=>{
      console.log(err);
    }
    )
  }

}
