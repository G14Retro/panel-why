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
  selector: 'app-crear-punto',
  templateUrl: './crear-punto.component.html',
  styleUrls: ['./crear-punto.component.scss']
})
export class CrearPuntoComponent implements OnInit {
  id_user = 0;
  pointForm:FormGroup;
  usuarios = [];
  filteredOptions: Observable<any>;
  constructor(
    private fb:FormBuilder,
    private dataService:DataUserService,
    private adminService:AdminService,
    public pointRef:MatDialogRef<CrearPuntoComponent>,
  ) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm(){
    this.pointForm = this.fb.group({
      email: ['',[Validators.required]],
      nombre: ['',[Validators.required]],
      study_code: ['',[Validators.required]],
      study_name: ['',[Validators.required]],
      registry: ['',[Validators.required]],
      observation: ['',[Validators.required]],
      transaction_type: ['',[Validators.required]],
      points: ['',[Validators.required]],
      date_points: ['',[Validators.required]],
    });
  }

  private _filter(value: any): any[] {
    let valor = '';
    if (value.email) {
      valor = value.email.toLowerCase();
      this.id_user = value.id;
      this.pointForm.get('nombre').setValue(value.names+' '+value.surnames);
      this.pointForm.get('nombre').disable();
    }else{
      valor = value.toLowerCase();
      this.pointForm.get('nombre').setValue('');
      this.pointForm.get('nombre').disable();
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
          value: `%${this.pointForm.get('email').value.toLowerCase()}%`,
        }
      ]
    }
    this.adminService.getUserByEmail(params).subscribe((resp:any)=>{
      this.usuarios = [];
      resp.data.forEach(user => {
        this.usuarios.push(user.User)
      });
      this.filteredOptions = this.pointForm.get('email').valueChanges.pipe(
        startWith(''),
        map(value => this._filter(value))
      );
    });
  }

  createPoint(){
    if (this.pointForm.invalid) {
      return
    }
    this.pointForm.get('date_points').setValue(moment(this.pointForm.get('date_points').value).format('YYYY-MM-DD'));
    this.adminService.createPoint(this.id_user,this.pointForm.value).subscribe(()=>{
      Utils.swalSuccess('¡Excelente!','Se ha creado el punto correctamente.');
      this.pointRef.close();
    },(err:any)=>{
      if (err.status == 463) {
        Utils.swalErrorConfirm('¡Lo siento!','Este usuario se encuentra inactivo.');
      }
      if (err.status == 486) {
        Utils.swalErrorConfirm('¡Lo siento!','No hay puntos suficientes para realizar el reverso.');
      }
    }
    );
  }

}
