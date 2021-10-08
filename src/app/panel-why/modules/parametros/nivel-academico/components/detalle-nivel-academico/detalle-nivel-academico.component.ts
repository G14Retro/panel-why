import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ParametrosService } from 'src/app/services/parametros.service';
import Utils from 'src/app/Utils/tool.util';

@Component({
  selector: 'app-detalle-nivel-academico',
  templateUrl: './detalle-nivel-academico.component.html',
  styleUrls: ['./detalle-nivel-academico.component.scss']
})
export class DetalleNivelAcademicoComponent implements OnInit {

  nivelAcademicoForm:FormGroup;
  constructor(
    public nivelAcademicoRef:MatDialogRef<DetalleNivelAcademicoComponent>,
    @Inject(MAT_DIALOG_DATA) public datos:any,
    private fb:FormBuilder,
    private parametroService:ParametrosService,
  ) { }

  ngOnInit(): void {
    this.createForm();
    this.getNivelAcademicoById();
    this.validEdit();
  }

  createForm(){
    this.nivelAcademicoForm = this.fb.group({
      description: ['',[Validators.required]],
      code: [{value:'', disabled:true},[Validators.required]],
    })
  }

  updateNivelAcademico(){
    if (this.nivelAcademicoForm.invalid) {
      return
    }
    this.parametroService.updateNivelAcademico(this.datos.id_nivel_academico,this.nivelAcademicoForm.value).subscribe(()=>{
      Utils.swalSuccess('¡Excelente!','Se ha actulizado el nivel académico con exito.');
      this.nivelAcademicoRef.close();
    });
  }

  validEdit(){
    if (this.datos.edit) {
      this.nivelAcademicoForm.get('description').enable();
    }else{
      this.nivelAcademicoForm.get('description').disable();
    }
  }

  edit(){
    this.datos.edit = !this.datos.edit
    this.validEdit();
  }

  getNivelAcademicoById(){
    this.parametroService.getNivelAcademicoById(this.datos.id_nivel_academico).subscribe((resp:any)=>{
      this.nivelAcademicoForm.setValue({
        description: resp.description,
        code: resp.code,
      })
    });
  }
}
