import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ParametrosService } from 'src/app/services/parametros.service';
import Utils from 'src/app/Utils/tool.util';

@Component({
  selector: 'app-detalle-decisor',
  templateUrl: './detalle-decisor.component.html',
  styleUrls: ['./detalle-decisor.component.scss']
})
export class DetalleDecisorComponent implements OnInit {

  decisorForm:FormGroup;
  constructor(
    public decisorRef:MatDialogRef<DetalleDecisorComponent>,
    @Inject(MAT_DIALOG_DATA) public datos:any,
    private fb:FormBuilder,
    private parametroService:ParametrosService,
  ) { }

  ngOnInit(): void {
    this.createForm();
    this.getDecisorById();
    this.validEdit();
  }

  createForm(){
    this.decisorForm = this.fb.group({
      description: ['',[Validators.required]],
      code: [{value:'', disabled:true},[Validators.required]],
    })
  }

  updateDecisor(){
    if (this.decisorForm.invalid) {
      return
    }
    this.parametroService.updateDecisor(this.datos.id_decisor,this.decisorForm.value).subscribe(()=>{
      Utils.swalSuccess('¡Excelente!','Se ha actulizado el género con exito.');
      this.decisorRef.close();
    });
  }

  validEdit(){
    if (this.datos.edit) {
      this.decisorForm.get('description').enable();
    }else{
      this.decisorForm.get('description').disable();
    }
  }

  edit(){
    this.datos.edit = !this.datos.edit
    this.validEdit();
  }

  getDecisorById(){
    this.parametroService.getDecisorById(this.datos.id_decisor).subscribe((resp:any)=>{
      this.decisorForm.setValue({
        description: resp.description,
        code: resp.code,
      })
    });
  }

}
