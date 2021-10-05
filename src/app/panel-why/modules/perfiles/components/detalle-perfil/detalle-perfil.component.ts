import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as moment from 'moment';
import { AdminService } from 'src/app/services/admin.service';
import { DataUserService } from 'src/app/services/data-user.service';
import Utils from 'src/app/Utils/tool.util';

@Component({
  selector: 'app-detalle-perfil',
  templateUrl: './detalle-perfil.component.html',
  styleUrls: ['./detalle-perfil.component.scss']
})
export class DetallePerfilComponent implements OnInit {

  nombre:string = '';
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
  constructor(
    public profileRef:MatDialogRef<DetallePerfilComponent>,
    @Inject(MAT_DIALOG_DATA) public datos:any,
    private fb:FormBuilder,
    private dataService:DataUserService,
    private adminService:AdminService,
  ) { }

  ngOnInit(): void {
    this.createForm();
    this.getSelects();
    this.getProfileById();
    this.validEdit();
    this.nombre = this.datos.profile.User.names + ' ' + this.datos.profile.User.surnames
  }

  createForm(){
    this.perfilForm = this.fb.group({
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
  validEdit(){
    if (this.datos.edit) {
      this.perfilForm.enable();
    }else{
      this.perfilForm.disable();
    }
  }

  edit(){
    this.datos.edit = !this.datos.edit;
    this.validEdit();
  }

  getProfileById(){
    this.adminService.getProfileById(this.datos.profile.UserProfile.id).subscribe((resp:any)=>{
      console.log(resp);
      this.perfilForm.setValue({
        society_nit_type_id: resp.society_nit_type_id,
        nit: resp.nit,
        address: resp.address,
        neighborhood: resp.neighborhood,
        date_birth: moment(resp.date_birth).format(),
        society_socio_economic_id: resp.society_socio_economic_id,
        society_gender_id: resp.society_gender_id,
        society_purchase_decision_id: resp.society_purchase_decision_id,
        society_marital_status_id: resp.society_marital_status_id,
        society_academic_level_id: resp.society_academic_level_id,
        society_employment_status_id: resp.society_employment_status_id,
        society_income_level_id: resp.society_income_level_id,
        society_way_to_pay_id: resp.society_way_to_pay_id,
        reference_code: resp.reference_code,
      });
    })
  }

  updateProfile(){
    if (this.perfilForm.invalid) {
      return
    }
    this.perfilForm.addControl('user_type',new FormControl('A'));
    this.perfilForm.addControl('geography_language_id',new FormControl(62));
    this.perfilForm.get('date_birth').setValue(moment(this.perfilForm.get('date_birth').value).format('YYYY-MM-DD'));
    this.adminService.updateProfileById(this.datos.profile.UserProfile.id,this.perfilForm.value).subscribe(()=>{
      Utils.swalSuccess('¡Excelente!','Se ha actualizado el perfil correctamente');
      this.profileRef.close();
    },(err:any)=>{
      Utils.swalErrorConfirm('¡Lo siento!','Se ha presentado un error por favor contacte al administrador.')
    }
    )
  }

}
