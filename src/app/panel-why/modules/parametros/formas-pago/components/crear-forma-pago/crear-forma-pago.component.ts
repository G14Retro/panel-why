import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ParametrosService } from 'src/app/services/parametros.service';
import Utils from 'src/app/Utils/tool.util';

@Component({
  selector: 'app-crear-forma-pago',
  templateUrl: './crear-forma-pago.component.html',
  styleUrls: ['./crear-forma-pago.component.scss']
})
export class CrearFormaPagoComponent implements OnInit {

  formaPagoForm:FormGroup;
  constructor(
    public formaPagoRef:MatDialogRef<CrearFormaPagoComponent>,
    private fb:FormBuilder,
    private parametroService:ParametrosService,
  ) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm(){
    this.formaPagoForm = this.fb.group({
      description: ['',[Validators.required]],
      code: ['',[Validators.required]],
    })
  }

  createFormaPago(){
    if (this.formaPagoForm.invalid) {
      return
    }
    this.parametroService.createFormaPago(this.formaPagoForm.value).subscribe(()=>{
      Utils.swalSuccess('¡Excelente!','Se ha creado la forma de pago con exito.');
      this.formaPagoRef.close();
    });
  }


}
