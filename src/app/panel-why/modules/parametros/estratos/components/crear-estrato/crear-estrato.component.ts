import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ParametrosService } from 'src/app/services/parametros.service';
import Utils from 'src/app/Utils/tool.util';

@Component({
  selector: 'app-crear-estrato',
  templateUrl: './crear-estrato.component.html',
  styleUrls: ['./crear-estrato.component.scss']
})
export class CrearEstratoComponent implements OnInit {

  estratoForm:FormGroup;
  constructor(
    public estratoRef:MatDialogRef<CrearEstratoComponent>,
    private fb:FormBuilder,
    private parametroService:ParametrosService,
  ) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm(){
    this.estratoForm = this.fb.group({
      description: ['',[Validators.required]],
      code: ['',[Validators.required]],
    })
  }

  createEstrato(){
    if (this.estratoForm.invalid) {
      return
    }
    this.parametroService.createEstrato(this.estratoForm.value).subscribe(()=>{
      Utils.swalSuccess('¡Excelente!','Se ha creado el tipo de documento con exito.');
      this.estratoRef.close();
    });
  }

}
