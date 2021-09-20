import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
    private dataService:DataUserService
  ) { }

  ngOnInit(): void {
    this.createForm();
    this.getProfile();
    this.getSelects();
  }

  createForm(){
    this.profileForm = this.fb.group({
      nit: ['',Validators.required],
      address: ['',Validators.required],
      neighborhood: ['',Validators.required],
      date_birth: ['',Validators.required],
      socio_economic_id: ['',Validators.required],
      gender_id: ['',Validators.required],
      purchase_decision_id: ['',Validators.required],
      marital_status_id: ['',Validators.required],
      academic_level_id: ['',Validators.required],
      employment_status_id: ['',Validators.required],
      income_level_id: ['',Validators.required],
      way_to_pay_id: ['',Validators.required],
    });
  }

  getProfile(){

    this.dataService.getProfile().subscribe((resp:any)=>{
      console.log(resp);
    },(err:any)=>{
      if (err.status === 461) {
        Utils.swalWarning('¡Atención!','Debe completar su información para continuar.')
      }
    });
  }

  getSelects(){
    this.dataService.getSocioEconomics().subscribe((resp:any)=>{
      console.log(resp);
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

}
