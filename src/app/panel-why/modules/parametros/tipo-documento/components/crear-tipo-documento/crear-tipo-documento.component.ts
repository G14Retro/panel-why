import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ParametrosService } from 'src/app/services/parametros.service';
import Utils from 'src/app/Utils/tool.util';

@Component({
  selector: 'app-crear-tipo-documento',
  templateUrl: './crear-tipo-documento.component.html',
  styleUrls: ['./crear-tipo-documento.component.scss']
})
export class CrearTipoDocumentoComponent implements OnInit {

  documentForm:FormGroup;
  constructor(
    public documentRef:MatDialogRef<CrearTipoDocumentoComponent>,
    private fb:FormBuilder,
    private parametroService:ParametrosService,
  ) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm(){
    this.documentForm = this.fb.group({
      description: ['',[Validators.required]],
      code: ['',[Validators.required]],
    })
  }

  createDocumente(){
    if (this.documentForm.invalid) {
      return
    }
    this.parametroService.createDocument(this.documentForm.value).subscribe(()=>{
      Utils.swalSuccess('¡Excelente!','Se ha creado el tipo de documento con exito.');
      this.documentRef.close();
    });
  }

}
