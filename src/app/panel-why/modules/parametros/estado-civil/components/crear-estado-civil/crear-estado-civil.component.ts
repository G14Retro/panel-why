import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ParametrosService } from 'src/app/services/parametros.service';
import Utils from 'src/app/Utils/tool.util';

@Component({
  selector: 'app-crear-estado-civil',
  templateUrl: './crear-estado-civil.component.html',
  styleUrls: ['./crear-estado-civil.component.scss']
})
export class CrearEstadoCivilComponent implements OnInit {

  estadoCivilForm:FormGroup;
  constructor(
    public estadoCivilRef:MatDialogRef<CrearEstadoCivilComponent>,
    private fb:FormBuilder,
    private parametroService:ParametrosService,
  ) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm(){
    this.estadoCivilForm = this.fb.group({
      description: ['',[Validators.required]],
      code: ['',[Validators.required]],
    })
  }

  createEstadoCivil(){
    if (this.estadoCivilForm.invalid) {
      return
    }
    this.parametroService.createEstadoCivil(this.estadoCivilForm.value).subscribe(()=>{
      Utils.swalSuccess('¡Excelente!','Se ha creado el tipo de documento con exito.');
      this.estadoCivilRef.close();
    });
  }

}
