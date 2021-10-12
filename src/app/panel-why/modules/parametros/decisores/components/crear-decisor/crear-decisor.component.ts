import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ParametrosService } from 'src/app/services/parametros.service';
import Utils from 'src/app/Utils/tool.util';
import { DetalleDecisorComponent } from '../detalle-decisor/detalle-decisor.component';

@Component({
  selector: 'app-crear-decisor',
  templateUrl: './crear-decisor.component.html',
  styleUrls: ['./crear-decisor.component.scss']
})
export class CrearDecisorComponent implements OnInit {

  decisorForm:FormGroup;
  constructor(
    public decisorRef:MatDialogRef<DetalleDecisorComponent>,
    private fb:FormBuilder,
    private parametroService:ParametrosService,
  ) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm(){
    this.decisorForm = this.fb.group({
      description: ['',[Validators.required]],
      code: ['',[Validators.required]],
    })
  }

  createDecisor(){
    if (this.decisorForm.invalid) {
      return
    }
    this.parametroService.createDecisor(this.decisorForm.value).subscribe(()=>{
      Utils.swalSuccess('¡Excelente!','Se ha creado el decisor de compra con exito.');
      this.decisorRef.close();
    },(err)=>{
      Utils.swalSuccessConfirm('¡Lo siento!',err.error.detail);
    }
    );
  }

}
