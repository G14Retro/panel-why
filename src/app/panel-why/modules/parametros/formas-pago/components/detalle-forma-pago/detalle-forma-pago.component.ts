import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ParametrosService } from 'src/app/services/parametros.service';
import Utils from 'src/app/Utils/tool.util';

@Component({
  selector: 'app-detalle-forma-pago',
  templateUrl: './detalle-forma-pago.component.html',
  styleUrls: ['./detalle-forma-pago.component.scss']
})
export class DetalleFormaPagoComponent implements OnInit {

  formaPagoForm:FormGroup;
  constructor(
    public formaPagoRef:MatDialogRef<DetalleFormaPagoComponent>,
    @Inject(MAT_DIALOG_DATA) public datos:any,
    private fb:FormBuilder,
    private parametroService:ParametrosService,
  ) { }

  ngOnInit(): void {
    this.createForm();
    this.getFormaPagoById();
    this.validEdit();
  }

  createForm(){
    this.formaPagoForm = this.fb.group({
      description: ['',[Validators.required]],
      code: [{value:'', disabled:true},[Validators.required]],
    })
  }

  updateFormaPago(){
    if (this.formaPagoForm.invalid) {
      return
    }
    this.parametroService.updateFormaPago(this.datos.id_forma_pago,this.formaPagoForm.value).subscribe(()=>{
      Utils.swalSuccess('¡Excelente!','Se ha actulizado la forma de pago con exito.');
      this.formaPagoRef.close();
    });
  }

  validEdit(){
    if (this.datos.edit) {
      this.formaPagoForm.get('description').enable();
    }else{
      this.formaPagoForm.get('description').disable();
    }
  }

  edit(){
    this.datos.edit = !this.datos.edit
    this.validEdit();
  }

  getFormaPagoById(){
    this.parametroService.getFormaPagoById(this.datos.id_forma_pago).subscribe((resp:any)=>{
      this.formaPagoForm.setValue({
        description: resp.description,
        code: resp.code,
      })
    });
  }

}
