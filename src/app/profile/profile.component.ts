import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {  Router } from '@angular/router';
import * as moment from 'moment';
import { AuthService } from '../services/auth.service';
import { DataUserService } from '../services/data-user.service';
import Utils from '../Utils/tool.util';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

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
  validCode:boolean = false;
  invalidCode:boolean = false;

  constructor(
    private fb:FormBuilder,
    private dataService:DataUserService,
    private authService:AuthService,
    private router:Router
  ) { 
  }

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
      reference_code: [''],
    });
  }

  coodeReference(){
    if (this.profileForm.get('reference_code').value.length <= 10) {
      console.log("Validando codigo");
      this.dataService.coodeReference(this.profileForm.get('reference_code').value).subscribe((resp:any)=>{
        if (resp) {
          this.validCode = true;
          this.invalidCode = false;
        }else if (!resp) {
          this.invalidCode = true;
          this.validCode = false;
        }
      })
    }else{
      this.invalidCode = false;
      this.validCode = false;
    }
  }

  getProfile(){
    if (!this.authService.validProfile()) {
      Utils.swalWarning('¡Atención!','Debe completar su información para continuar.');
    }
  }

  getSelects(){
    
    this.dataService.getNitTypes().subscribe((resp:any)=>{
      console.log(resp);
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

  cancel(){
    localStorage.clear();
    sessionStorage.clear();
    window.location.replace('/login')
  }

  continue(){
    if (this.profileForm.invalid) {
      return
    }
    this.profileForm.addControl('user_type',new FormControl('A'));
    this.profileForm.addControl('geography_language_id',new FormControl(62));
    if (this.profileForm.get('reference_code').value.length != 10) {
      this.profileForm.get('reference_code').setValue('');
    }
    if (!this.validCode) {
      this.profileForm.get('reference_code').setValue('');
    }
    this.profileForm.get('date_birth').setValue(moment(this.profileForm.get('date_birth').value).format('YYYY-MM-DD'))
    this.dataService.createProfile(this.profileForm.value).subscribe((resp:any)=>{
      window.location.replace('/panel-why/dashboard')
    });
  }


}
