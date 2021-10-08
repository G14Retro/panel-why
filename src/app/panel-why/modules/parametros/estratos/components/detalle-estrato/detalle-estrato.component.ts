import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ParametrosService } from 'src/app/services/parametros.service';
import Utils from 'src/app/Utils/tool.util';

@Component({
  selector: 'app-detalle-estrato',
  templateUrl: './detalle-estrato.component.html',
  styleUrls: ['./detalle-estrato.component.scss']
})
export class DetalleEstratoComponent implements OnInit {
  
  estratoForm:FormGroup;
  constructor(
    public estratoRef:MatDialogRef<DetalleEstratoComponent>,
    @Inject(MAT_DIALOG_DATA) public datos:any,
    private fb:FormBuilder,
    private parametroService:ParametrosService,
  ) { }

  ngOnInit(): void {
    this.createForm();
    this.getEstratoById();
    this.validEdit();
  }

  createForm(){
    this.estratoForm = this.fb.group({
      description: ['',[Validators.required]],
      code: [{value:'', disabled:true},[Validators.required]],
    })
  }

  validEdit(){
    if (this.datos.edit) {
      this.estratoForm.get('description').enable();
    }else{
      this.estratoForm.get('description').disable();
    }
  }

  edit(){
    this.datos.edit = !this.datos.edit
    this.validEdit();
  }

  getEstratoById(){
    this.parametroService.getEstratoById(this.datos.id_document).subscribe((resp:any)=>{
      this.estratoForm.setValue({
        description: resp.description,
        code: resp.code,
      })
    });
  }

  updateEstrato(){
    this.parametroService.updateEstrato(this.datos.id_document,this.estratoForm.value).subscribe(()=>{
      Utils.swalSuccess('¡Excelente!','Se ha actualizado correctamente.');
      this.estratoRef.close();
    });
  }

}
