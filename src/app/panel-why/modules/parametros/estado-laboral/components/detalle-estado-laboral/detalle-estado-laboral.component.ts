import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ParametrosService } from 'src/app/services/parametros.service';
import Utils from 'src/app/Utils/tool.util';

@Component({
  selector: 'app-detalle-estado-laboral',
  templateUrl: './detalle-estado-laboral.component.html',
  styleUrls: ['./detalle-estado-laboral.component.scss']
})
export class DetalleEstadoLaboralComponent implements OnInit {

  estadoLaboralForm:FormGroup;
  constructor(
    public estadoLaboralRef:MatDialogRef<DetalleEstadoLaboralComponent>,
    @Inject(MAT_DIALOG_DATA) public datos:any,
    private fb:FormBuilder,
    private parametroService:ParametrosService,
  ) { }

  ngOnInit(): void {
    this.createForm();
    this.getEstadoLaboralById();
    this.validEdit();
  }

  createForm(){
    this.estadoLaboralForm = this.fb.group({
      description: ['',[Validators.required]],
      code: [{value:'', disabled:true},[Validators.required]],
    })
  }

  updateEstadoLaboral(){
    if (this.estadoLaboralForm.invalid) {
      return
    }
    this.parametroService.updateEstadoLaboral(this.datos.id_estado_laboral,this.estadoLaboralForm.value).subscribe(()=>{
      Utils.swalSuccess('¡Excelente!','Se ha actualizado el estado laboral con exito.');
      this.estadoLaboralRef.close();
    });
  }

  validEdit(){
    if (this.datos.edit) {
      this.estadoLaboralForm.get('description').enable();
    }else{
      this.estadoLaboralForm.get('description').disable();
    }
  }

  edit(){
    this.datos.edit = !this.datos.edit
    this.validEdit();
  }

  getEstadoLaboralById(){
    this.parametroService.getEstadoLaboralById(this.datos.id_estado_laboral).subscribe((resp:any)=>{
      this.estadoLaboralForm.setValue({
        description: resp.description,
        code: resp.code,
      })
    });
  }

}
