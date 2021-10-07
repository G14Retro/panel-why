import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ParametrosService } from 'src/app/services/parametros.service';
import Utils from 'src/app/Utils/tool.util';

@Component({
  selector: 'app-detalle-tipo-documento',
  templateUrl: './detalle-tipo-documento.component.html',
  styleUrls: ['./detalle-tipo-documento.component.scss']
})
export class DetalleTipoDocumentoComponent implements OnInit {

  documentForm:FormGroup;
  constructor(
    public documentRef:MatDialogRef<DetalleTipoDocumentoComponent>,
    @Inject(MAT_DIALOG_DATA) public datos:any,
    private fb:FormBuilder,
    private parametroService:ParametrosService,
  ) { }

  ngOnInit(): void {
    this.createForm();
    this.getDocumentById();
    this.validEdit();
  }

  createForm(){
    this.documentForm = this.fb.group({
      description: ['',[Validators.required]],
      code: [{value:'', disabled:true},[Validators.required]],
    })
  }

  validEdit(){
    if (this.datos.edit) {
      this.documentForm.get('description').enable();
    }else{
      this.documentForm.get('description').disable();
    }
  }

  edit(){
    this.datos.edit = !this.datos.edit
    this.validEdit();
  }

  getDocumentById(){
    this.parametroService.getDocumentById(this.datos.id_document).subscribe((resp:any)=>{
      this.documentForm.setValue({
        description: resp.description,
        code: resp.code,
      })
    });
  }

  updateDocument(){
    this.parametroService.updateDocument(this.datos.id_document,this.documentForm.value).subscribe(()=>{
      Utils.swalSuccess('¡Excelente!','Se ha actualizado correctamente.');
      this.documentRef.close();
    });
  }

}
