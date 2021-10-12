import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { AdminService } from 'src/app/services/admin.service';
import { DataUserService } from 'src/app/services/data-user.service';
import Utils from 'src/app/Utils/tool.util';

@Component({
  selector: 'app-crear-pago',
  templateUrl: './crear-pago.component.html',
  styleUrls: ['./crear-pago.component.scss']
})
export class CrearPagoComponent implements OnInit {

  pagoForm:FormGroup;
  usuarios = [];
  id_user = 0;
  filteredOptions: Observable<any>;
  pagos = [];
  constructor(
    private fb:FormBuilder,
    private dataService:DataUserService,
    private adminService:AdminService,
    public payRef:MatDialogRef<CrearPagoComponent>,
  ) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm(){
    this.pagoForm = this.fb.group({
      email: ['',[Validators.required]],
      nombre: ['',[Validators.required]],
      mobile_number: ['',[Validators.required,Validators.pattern('.{10,10}')]],
      way_to_pay: ['',[Validators.required]],
      observation: ['',[Validators.required]],
      points: ['',[Validators.required]],
      value: ['',[Validators.required]],
      date_payed: ['',[Validators.required]],
      transaction_type: ['',[Validators.required]]
    })
  }

  private _filter(value: any): any[] {
    let valor = '';
    if (value.email) {
      valor = value.email.toLowerCase();
      this.id_user = value.id;
      this.pagoForm.get('nombre').setValue(value.names+' '+value.surnames);
      this.pagoForm.get('nombre').disable();
    }else{
      valor = value.toLowerCase();
      this.pagoForm.get('nombre').setValue('');
      this.pagoForm.get('nombre').disable();
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
          value: `%${this.pagoForm.get('email').value.toLowerCase()}%`,
        }
      ]
    }
    this.adminService.getUserByEmail(params).subscribe((resp:any)=>{
      this.usuarios = [];
      resp.data.forEach(user => {
        this.usuarios.push(user.User)
      });
      this.filteredOptions = this.pagoForm.get('email').valueChanges.pipe(
        startWith(''),
        map(value => this._filter(value))
      );
    });
  }


  createPay(){
    if (this.pagoForm.invalid) {
      return
    }
    this.pagoForm.get('date_payed').setValue(moment(this.pagoForm.get('date_payed').value).format('YYYY-MM-DD'))
    this.adminService.createPay(this.id_user,this.pagoForm.value).subscribe(()=>{
      Utils.swalSuccess('¡Excelente!','Se ha creado el pago correctamente.');
      this.payRef.close();
    },(err:any)=>{
      console.log(err);
      Utils.swalErrorConfirm('¡Lo siento!',err.error.detail);
    }
    );
  }

}
