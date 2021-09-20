import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {  Router } from '@angular/router';
import * as moment from 'moment';
import { Subscription } from 'rxjs';
import { DataUserService } from '../services/data-user.service';
import Utils from '../Utils/tool.util';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {

  profileForm:FormGroup;

  estratos = [];
  generos = [];
  decisores = [];
  estados = [];
  lvl_academicos = [];
  est_laborales = [];
  lvl_ingresos = [];
  pagos = [];

  showForm:boolean = false;
  showBtns:boolean = false;

  subscription:Subscription;
  constructor(
    private fb:FormBuilder,
    private dataService:DataUserService,
    private router:Router
  ) { 
  }

  ngOnInit(): void {
    this.createForm();
    this.getProfile();
    this.getSelects();
    // this.subscription = this.dataService.refresh$.subscribe(()=>{
    //   this.getProfile();
    // });
  }

  ngOnDestroy(){
    // this.subscription.unsubscribe();
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
      if (this.router.url == "/perfil") {   
        this.showForm = false;
        console.log("Perfil");
        window.location.replace('/panel-why/dashboard');
        return
      }
      this.showForm = true;
      this.showBtns = false;
      this.profileForm.get('society_nit_type_id').setValue(resp.body.society_nit_type_id);
      this.profileForm.get('nit').setValue(resp.body.nit);
      this.profileForm.get('address').setValue(resp.body.address);
      this.profileForm.get('neighborhood').setValue(resp.body.neighborhood);
      this.profileForm.get('date_birth').setValue(moment(resp.body.date_birth).format());
      this.profileForm.get('society_socio_economic_id').setValue(resp.body.society_socio_economic_id);
      this.profileForm.get('society_gender_id').setValue(resp.body.society_gender_id);
      this.profileForm.get('society_purchase_decision_id').setValue(resp.body.society_purchase_decision_id);
      this.profileForm.get('society_marital_status_id').setValue(resp.body.society_marital_status_id);
      this.profileForm.get('society_academic_level_id').setValue(resp.body.society_academic_level_id);
      this.profileForm.get('society_employment_status_id').setValue(resp.body.society_employment_status_id);
      this.profileForm.get('society_income_level_id').setValue(resp.body.society_income_level_id);
      this.profileForm.get('society_way_to_pay_id').setValue(resp.body.society_way_to_pay_id);
    },(err:any)=>{
      if (err.status === 461) {
        Utils.swalWarning('¡Atención!','Debe completar su información para continuar.');
        this.showForm = true;
        this.showBtns = true;
      }
    });
  }

  getSelects(){
    this.dataService.getSocioEconomics().subscribe((resp:any)=>{
      this.estratos = resp;
    });
    this.dataService.getSocioGenders().subscribe((resp:any)=>{
      this.generos = resp;
    });
    this.dataService.getPurchaseDecisions().subscribe((resp:any)=>{
      this.decisores = resp
    });
    this.dataService.getMaritalStatuses().subscribe((resp:any)=>{
      this.estados = resp;
    });
    this.dataService.getAcademicLevels().subscribe((resp:any)=>{
      this.lvl_academicos = resp;
    });
    this.dataService.getEmploymentStatuses().subscribe((resp:any)=>{
      this.est_laborales= resp;
    });
    this.dataService.getIncomeLevels().subscribe((resp:any)=>{
      this.lvl_ingresos = resp;
    });
    this.dataService.getWayPays().subscribe((resp:any)=>{
      this.pagos = resp;
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
    this.profileForm.get('date_birth').setValue(moment(this.profileForm.get('date_birth').value).format('YYYY-MM-DD'))
    this.dataService.createProfile(this.profileForm.value).subscribe((resp:any)=>{
      window.location.replace('/panel-why/dashboard')
    });
  }

  updateProfile(){
    this.profileForm.addControl('user_type',new FormControl('A'));
    this.profileForm.addControl('geography_language_id',new FormControl(62));
    this.profileForm.get('date_birth').setValue(moment(this.profileForm.get('date_birth').value).format('YYYY-MM-DD'));
    this.dataService.updateProfile(this.profileForm.value).subscribe((resp:any)=>{
      this.getProfile();
    })
  }

}
