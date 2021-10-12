import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ParametrosService } from 'src/app/services/parametros.service';
import Utils from 'src/app/Utils/tool.util';

@Component({
  selector: 'app-detalle-genero',
  templateUrl: './detalle-genero.component.html',
  styleUrls: ['./detalle-genero.component.scss']
})
export class DetalleGeneroComponent implements OnInit {

  generoForm:FormGroup;
  constructor(
    public generoRef:MatDialogRef<DetalleGeneroComponent>,
    @Inject(MAT_DIALOG_DATA) public datos:any,
    private fb:FormBuilder,
    private parametroService:ParametrosService,
  ) { }

  ngOnInit(): void {
    this.createForm();
    this.getGeneroById();
    this.validEdit();
  }

  createForm(){
    this.generoForm = this.fb.group({
      description: ['',[Validators.required]],
      code: [{value:'', disabled:true},[Validators.required]],
      gender: ['',[Validators.required]],
    })
  }

  updateGenero(){
    if (this.generoForm.invalid) {
      return
    }
    this.parametroService.updateGenero(this.datos.id_genero,this.generoForm.value).subscribe(()=>{
      Utils.swalSuccess('¡Excelente!','Se ha actualizado el género con exito.');
      this.generoRef.close();
    });
  }

  validEdit(){
    if (this.datos.edit) {
      this.generoForm.get('description').enable();
      this.generoForm.get('gender').enable();
    }else{
      this.generoForm.get('description').disable();
      this.generoForm.get('gender').disable();
    }
  }

  edit(){
    this.datos.edit = !this.datos.edit
    this.validEdit();
  }

  getGeneroById(){
    this.parametroService.getGeneroById(this.datos.id_genero).subscribe((resp:any)=>{
      this.generoForm.setValue({
        description: resp.description,
        code: resp.code,
        gender: resp.gender,
      })
    });
  }

}
