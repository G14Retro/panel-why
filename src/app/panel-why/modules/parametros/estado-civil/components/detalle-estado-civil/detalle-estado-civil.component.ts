import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ParametrosService } from 'src/app/services/parametros.service';
import Utils from 'src/app/Utils/tool.util';

@Component({
  selector: 'app-detalle-estado-civil',
  templateUrl: './detalle-estado-civil.component.html',
  styleUrls: ['./detalle-estado-civil.component.scss']
})
export class DetalleEstadoCivilComponent implements OnInit {

  estadoCivilForm:FormGroup;
  constructor(
    public estadoCivilRef:MatDialogRef<DetalleEstadoCivilComponent>,
    @Inject(MAT_DIALOG_DATA) public datos:any,
    private fb:FormBuilder,
    private parametroService:ParametrosService,
  ) { }

  ngOnInit(): void {
    this.createForm();
    this.getEstadoCivilById();
    this.validEdit();
  }

  createForm(){
    this.estadoCivilForm = this.fb.group({
      description: ['',[Validators.required]],
      code: [{value:'', disabled:true},[Validators.required]],
    })
  }

  updateEstadoCivil(){
    if (this.estadoCivilForm.invalid) {
      return
    }
    this.parametroService.updateEstadoCivil(this.datos.id_estado,this.estadoCivilForm.value).subscribe(()=>{
      Utils.swalSuccess('¡Excelente!','Se ha actulizado el género con exito.');
      this.estadoCivilRef.close();
    });
  }

  validEdit(){
    if (this.datos.edit) {
      this.estadoCivilForm.get('description').enable();
    }else{
      this.estadoCivilForm.get('description').disable();
    }
  }

  edit(){
    this.datos.edit = !this.datos.edit
    this.validEdit();
  }

  getEstadoCivilById(){
    this.parametroService.getEstadoCivilById(this.datos.id_estado).subscribe((resp:any)=>{
      this.estadoCivilForm.setValue({
        description: resp.description,
        code: resp.code,
      })
    });
  }


}
