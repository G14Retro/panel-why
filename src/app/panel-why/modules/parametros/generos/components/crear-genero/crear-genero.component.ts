import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ParametrosService } from 'src/app/services/parametros.service';
import Utils from 'src/app/Utils/tool.util';

@Component({
  selector: 'app-crear-genero',
  templateUrl: './crear-genero.component.html',
  styleUrls: ['./crear-genero.component.scss']
})
export class CrearGeneroComponent implements OnInit {

  generoForm:FormGroup;
  constructor(
    public generoRef:MatDialogRef<CrearGeneroComponent>,
    private fb:FormBuilder,
    private parametroService:ParametrosService,
  ) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm(){
    this.generoForm = this.fb.group({
      description: ['',[Validators.required]],
      code: ['',[Validators.required]],
      gender: ['',[Validators.required]],
    })
  }

  createGenero(){
    if (this.generoForm.invalid) {
      return
    }
    this.parametroService.createGenero(this.generoForm.value).subscribe(()=>{
      Utils.swalSuccess('¡Excelente!','Se ha creado el tipo de documento con exito.');
      this.generoRef.close();
    });
  }

}
