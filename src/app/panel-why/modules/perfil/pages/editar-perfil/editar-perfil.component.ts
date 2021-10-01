import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import * as moment from 'moment';
import { DataUserService } from 'src/app/services/data-user.service';
import Utils from 'src/app/Utils/tool.util';

@Component({
  selector: 'app-editar-perfil',
  templateUrl: './editar-perfil.component.html',
  styleUrls: ['./editar-perfil.component.scss']
})
export class EditarPerfilComponent implements OnInit {

  profileForm:FormGroup;

  tipos_docs = [];
  estratos = [];
  generos = [];
  decisores = [];
  estados = [];
  lvl_academicos = [];
  est_laborales = [];
  lvl_ingresos = [];
  pagos = [];


  constructor(
    private fb:FormBuilder,
    private dataService:DataUserService,
    private profileRef:MatDialogRef<EditarPerfilComponent>,
  ) { }

  ngOnInit(): void {
    this.createForm();
    this.getProfile();
    this.getSelects();
  }

  createForm(){
    this.profileForm = this.fb.group({
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
    });
  }

  getProfile(){

    this.dataService.getProfile().subscribe((resp:any)=>{
      console.log(resp);
      this.profileForm.get('society_nit_type_id').setValue(resp.society_nit_type_id);
      this.profileForm.get('nit').setValue(resp.nit);
      this.profileForm.get('address').setValue(resp.address);
      this.profileForm.get('neighborhood').setValue(resp.neighborhood);
      this.profileForm.get('date_birth').setValue(moment(resp.date_birth).format());
      this.profileForm.get('society_socio_economic_id').setValue(resp.society_socio_economic_id);
      this.profileForm.get('society_gender_id').setValue(resp.society_gender_id);
      this.profileForm.get('society_purchase_decision_id').setValue(resp.society_purchase_decision_id);
      this.profileForm.get('society_marital_status_id').setValue(resp.society_marital_status_id);
      this.profileForm.get('society_academic_level_id').setValue(resp.society_academic_level_id);
      this.profileForm.get('society_employment_status_id').setValue(resp.society_employment_status_id);
      this.profileForm.get('society_income_level_id').setValue(resp.society_income_level_id);
      this.profileForm.get('society_way_to_pay_id').setValue(resp.society_way_to_pay_id);

      this.profileForm.get('society_nit_type_id').disable();
      this.profileForm.get('nit').disable();
      this.profileForm.get('address').disable();
      this.profileForm.get('neighborhood').disable();
      this.profileForm.get('date_birth').disable();
      this.profileForm.get('society_socio_economic_id').disable();
      this.profileForm.get('society_gender_id').disable();
    },(err:any)=>{
      Utils.swalError('¡Lo siento!','Ah sucedido un error por favor comuniquese con el administrador.');
      
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
      this.decisores = resp.data;
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

  updateProfile(){
    this.profileForm.addControl('user_type',new FormControl('A'));
    this.profileForm.addControl('geography_language_id',new FormControl(62));
    this.profileForm.get('date_birth').setValue(moment(this.profileForm.get('date_birth').value).format('YYYY-MM-DD'));
    this.profileForm.enable();
    this.dataService.updateProfile(this.profileForm.value).subscribe((resp:any)=>{
      Utils.swalSuccess('¡Excelente!','Se ha actualizado la información satisfactoriamente.');
      this.profileRef.close();
    })
  }

}
