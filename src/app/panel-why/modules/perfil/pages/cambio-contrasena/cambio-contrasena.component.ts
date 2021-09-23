import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { DataUserService } from 'src/app/services/data-user.service';
import Utils from 'src/app/Utils/tool.util';

@Component({
  selector: 'app-cambio-contrasena',
  templateUrl: './cambio-contrasena.component.html',
  styleUrls: ['./cambio-contrasena.component.scss']
})
export class CambioContrasenaComponent implements OnInit {

  passwordForm:FormGroup;

  actual:boolean = true;
  nueva:boolean = true;
  confirma:boolean = true;
  constructor(
    private fb:FormBuilder,
    private dataService:DataUserService,
    private passwordRef:MatDialogRef<CambioContrasenaComponent>,
  ) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm(){
    this.passwordForm = this.fb.group({
      password: ['',[Validators.required,this.passwordValidate()]],
      password_new: ['',[Validators.required,this.passwordValidate()]],
      password_new_repeat: ['',[Validators.required,this.passwordValidate(),this.matchValues('password_new')]]
    })
  }

  
  changePassword(){
    if (this.passwordForm.invalid) {
      return
    }
    this.dataService.changePassword(this.passwordForm.value).subscribe(()=>{
      this.passwordRef.close();
      Utils.swalSuccess('Excelente','Se ha actualizado tu contraseña con extio.');
    },(err:any)=>{
      console.log(err);
      if (err.status === 461) {
        Utils.swalError('¡Lo siento!','La contraseña actual no corresponde a la que esta registrada en el sistema.')
      }
    }
    )
  }

  matchValues( matchTo: string ): (AbstractControl) => ValidationErrors | null {
    return (control: AbstractControl): ValidationErrors | null => {
      return !!control.parent &&
        !!control.parent.value &&
        control.value === control.parent.controls[matchTo].value
        ? null
        : { isMatching: false };
    };
  }

  passwordValidate(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (!/[A-Z]/.test(control.value)) {
        return { hasCapitalCase: { value: control.value } };
      }
      else if (!/[a-z]/.test(control.value)) {
        return { hasSmallCase: { value: control.value } };
      }
      else if (!/[!@#$%^&*()_+=[{};':"|,.<>/?/{};':"|,.<>/?-]/.test(control.value)) {
        return { hasSpecialCharacters: { value: control.value } };
      }
      else if (!/\d/.test(control.value)) {
        return { hasNumber: { value: control.value } };
      }
      return null;
    };
  }

  get error():any {return this.passwordForm.controls}

}
