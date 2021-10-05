import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { AdminService } from 'src/app/services/admin.service';
import { DataUserService } from 'src/app/services/data-user.service';
import Utils from 'src/app/Utils/tool.util';

@Component({
  selector: 'app-crear-perfil',
  templateUrl: './crear-perfil.component.html',
  styleUrls: ['./crear-perfil.component.scss']
})
export class CrearPerfilComponent implements OnInit {

  id_user = 0;
  perfilForm:FormGroup;
  tipos_docs = [];
  estratos = [];
  generos = [];
  decisores = [];
  estados = [];
  lvl_academicos = [];
  est_laborales = [];
  lvl_ingresos = [];
  pagos = [];
  usuarios = [];
  filteredOptions: Observable<any>;
  constructor(
    private fb:FormBuilder,
    private dataService:DataUserService,
    private adminService:AdminService,
    public perfilRef:MatDialogRef<CrearPerfilComponent>,
  ) {
  }
  
  ngOnInit(): void {
    this.createForm();
    this.getSelects();
  }

  createForm(){
    this.perfilForm = this.fb.group({
      email:['',[Validators.required]],
      society_nit_type_id:['',Validators.required],
      nit: ['',Validators.required],
      address: ['',Validators.required],
      neighborhood: ['',Validators.required],
      date_birth: ['',Validators.required],
      society_socio_economic_id: ['',Validators.required],
      society_gender_id: ['',Validators.required],
      society_purchase_decision_id: ['',Validators.required],
      society_marital_status_id: ['',Validators.required],
      society_academic_level_id: ['',Validators.required],
      society_employment_status_id: ['',Validators.required],
      society_income_level_id: ['',Validators.required],
      society_way_to_pay_id: ['',Validators.required],
      reference_code: [''],
      nombre: [''],
    });
  }

  getSelects(){
    
    this.dataService.getNitTypes().subscribe((resp:any)=>{
      this.tipos_docs = resp.data;
    });

    this.dataService.getSocioEconomics().subscribe((resp:any)=>{
      this.estratos = resp.data;
    });
    this.dataService.getSocioGenders().subscribe((resp:any)=>{
      this.generos = resp.data;
    });
    this.dataService.getPurchaseDecisions().subscribe((resp:any)=>{
      this.decisores = resp.data
    });
    this.dataService.getMaritalStatuses().subscribe((resp:any)=>{
      this.estados = resp.data;
    });
    this.dataService.getAcademicLevels().subscribe((resp:any)=>{
      this.lvl_academicos = resp.data;
    });
    this.dataService.getEmploymentStatuses().subscribe((resp:any)=>{
      this.est_laborales= resp.data;
    });
    this.dataService.getIncomeLevels().subscribe((resp:any)=>{
      this.lvl_ingresos = resp.data;
    });
    this.dataService.getWayPays().subscribe((resp:any)=>{
      this.pagos = resp.data;
    });
  }

  private _filter(value: any): any[] {
    let valor = '';
    if (value.email) {
      valor = value.email.toLowerCase();
      this.id_user = value.id;
      this.perfilForm.get('nombre').setValue(value.names+' '+value.surnames);
      this.perfilForm.get('nombre').disable();
    }else{
      valor = value.toLowerCase();
      this.perfilForm.get('nombre').setValue('');
      this.perfilForm.get('nombre').disable();
    }
    const filterValue = valor;
    return this.usuarios.filter(option => option.email.toLowerCase().includes(filterValue));
  }

  displayFn(user: any): string {
    return user && user.email ? user.email : '';
  }

  getUsers(){
    const params = {
      "data_filterby": [
        {
          model: "User",
          field: "email",
          type: "like",
          value: `%${this.perfilForm.get('email').value.toLowerCase()}%`,
        }
      ]
    }
    this.adminService.getUserByEmail(params).subscribe((resp:any)=>{
      this.usuarios = [];
      resp.data.forEach(user => {
        this.usuarios.push(user.User)
      });
      this.filteredOptions = this.perfilForm.get('email').valueChanges.pipe(
        startWith(''),
        map(value => this._filter(value))
      );
    });
  }

  createProfile(){
    console.log(this.id_user);
    if (this.perfilForm.invalid) {
      return
    }
    this.perfilForm.addControl('user_type',new FormControl('A'));
    this.perfilForm.addControl('geography_language_id',new FormControl(62));
    this.perfilForm.get('date_birth').setValue(moment(this.perfilForm.get('date_birth').value).format('YYYY-MM-DD'));
    this.adminService.saveProfile(this.id_user,this.perfilForm.value).subscribe(()=>{
      Utils.swalSuccess('¡Excelente!','Se ha creado el perfil con exito.');
    },(err:any)=>{
      if (err.status == 481) {
        Utils.swalErrorConfirm('¡Lo siento!','Este usuario ya cuenta con un perfil.');
      }
    }
    );
  }

}
