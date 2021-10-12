import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ParametrosService } from 'src/app/services/parametros.service';
import Utils from 'src/app/Utils/tool.util';

@Component({
  selector: 'app-crear-nivel-academico',
  templateUrl: './crear-nivel-academico.component.html',
  styleUrls: ['./crear-nivel-academico.component.scss']
})
export class CrearNivelAcademicoComponent implements OnInit {

  nivelAcademicoForm:FormGroup;
  constructor(
    public nivelAcademicoRef:MatDialogRef<CrearNivelAcademicoComponent>,
    private fb:FormBuilder,
    private parametroService:ParametrosService,
  ) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm(){
    this.nivelAcademicoForm = this.fb.group({
      description: ['',[Validators.required]],
      code: ['',[Validators.required]],
    })
  }

  createNivelAcademico(){
    if (this.nivelAcademicoForm.invalid) {
      return
    }
    this.parametroService.createNivelAcademico(this.nivelAcademicoForm.value).subscribe(()=>{
      Utils.swalSuccess('¡Excelente!','Se ha creado el nivel académico con exito.');
      this.nivelAcademicoRef.close();
    });
  }
}
