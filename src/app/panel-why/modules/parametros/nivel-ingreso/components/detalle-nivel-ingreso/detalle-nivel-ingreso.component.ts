import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ParametrosService } from 'src/app/services/parametros.service';
import Utils from 'src/app/Utils/tool.util';

@Component({
  selector: 'app-detalle-nivel-ingreso',
  templateUrl: './detalle-nivel-ingreso.component.html',
  styleUrls: ['./detalle-nivel-ingreso.component.scss']
})
export class DetalleNivelIngresoComponent implements OnInit {

  nivelIngresoForm:FormGroup;
  constructor(
    public nivelIngresoRef:MatDialogRef<DetalleNivelIngresoComponent>,
    @Inject(MAT_DIALOG_DATA) public datos:any,
    private fb:FormBuilder,
    private parametroService:ParametrosService,
  ) { }

  ngOnInit(): void {
    this.createForm();
    this.getNivelIngresoById();
    this.validEdit();
  }

  createForm(){
    this.nivelIngresoForm = this.fb.group({
      description: ['',[Validators.required]],
      code: [{value:'', disabled:true},[Validators.required]],
    })
  }

  updateNivelIngreso(){
    if (this.nivelIngresoForm.invalid) {
      return
    }
    this.parametroService.updateNivelIngreso(this.datos.id_nivel_academico,this.nivelIngresoForm.value).subscribe(()=>{
      Utils.swalSuccess('¡Excelente!','Se ha actualizado el nivel ingreso con exito.');
      this.nivelIngresoRef.close();
    });
  }

  validEdit(){
    if (this.datos.edit) {
      this.nivelIngresoForm.get('description').enable();
    }else{
      this.nivelIngresoForm.get('description').disable();
    }
  }

  edit(){
    this.datos.edit = !this.datos.edit
    this.validEdit();
  }

  getNivelIngresoById(){
    this.parametroService.getNivelIngresoById(this.datos.id_nivel_academico).subscribe((resp:any)=>{
      this.nivelIngresoForm.setValue({
        description: resp.description,
        code: resp.code,
      })
    });
  }
}
