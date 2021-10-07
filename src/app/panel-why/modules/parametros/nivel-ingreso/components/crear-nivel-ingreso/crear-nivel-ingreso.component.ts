import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ParametrosService } from 'src/app/services/parametros.service';
import Utils from 'src/app/Utils/tool.util';

@Component({
  selector: 'app-crear-nivel-ingreso',
  templateUrl: './crear-nivel-ingreso.component.html',
  styleUrls: ['./crear-nivel-ingreso.component.scss']
})
export class CrearNivelIngresoComponent implements OnInit {

  nivelIngresoForm:FormGroup;
  constructor(
    public nivelIngresoRef:MatDialogRef<CrearNivelIngresoComponent>,
    private fb:FormBuilder,
    private parametroService:ParametrosService,
  ) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm(){
    this.nivelIngresoForm = this.fb.group({
      description: ['',[Validators.required]],
      code: ['',[Validators.required]],
    })
  }

  createNivelIngreso(){
    if (this.nivelIngresoForm.invalid) {
      return
    }
    this.parametroService.createNivelIngreso(this.nivelIngresoForm.value).subscribe(()=>{
      Utils.swalSuccess('¡Excelente!','Se ha creado el tipo de documento con exito.');
      this.nivelIngresoRef.close();
    });
  }

}
