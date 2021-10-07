import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ParametrosService } from 'src/app/services/parametros.service';
import Utils from 'src/app/Utils/tool.util';

@Component({
  selector: 'app-crear-estado-laboral',
  templateUrl: './crear-estado-laboral.component.html',
  styleUrls: ['./crear-estado-laboral.component.scss']
})
export class CrearEstadoLaboralComponent implements OnInit {

  estadoLaboralForm:FormGroup;
  constructor(
    public estadoLaboralRef:MatDialogRef<CrearEstadoLaboralComponent>,
    private fb:FormBuilder,
    private parametroService:ParametrosService,
  ) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm(){
    this.estadoLaboralForm = this.fb.group({
      description: ['',[Validators.required]],
      code: ['',[Validators.required]],
    })
  }

  createEstadoLaboral(){
    if (this.estadoLaboralForm.invalid) {
      return
    }
    this.parametroService.createEstadoLaboral(this.estadoLaboralForm.value).subscribe(()=>{
      Utils.swalSuccess('¡Excelente!','Se ha creado el estado laboral con exito.');
      this.estadoLaboralRef.close();
    });
  }

}
