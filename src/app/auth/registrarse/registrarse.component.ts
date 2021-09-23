import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth.service';
import Utils from 'src/app/Utils/tool.util';

@Component({
  selector: 'app-registrarse',
  templateUrl: './registrarse.component.html',
  styleUrls: ['./registrarse.component.scss']
})
export class RegistrarseComponent implements OnInit {
  password:boolean = true;
  confirma:boolean = true;
  registerForm:FormGroup;
  countries:any[] = [];
  states:any[] = [];
  cities:any[] = [];
  checkout:boolean = false;
  constructor(
    private fb:FormBuilder,
    private authService:AuthService,
    private registroRef:MatDialogRef<RegistrarseComponent>
  ) { }

  ngOnInit(): void {
    this.createForm();
    this.getCountries();
  }

  createForm(){
    this.registerForm = this.fb.group({
      names:['',Validators.required],
      surnames:['',Validators.required],
      email:['',[Validators.required,Validators.email]],
      pais:['',Validators.required],
      departamento:['',Validators.required],
      geography_city_id:['',Validators.required],
      mobile_number:['',[Validators.required,Validators.pattern('.{10,10}')]],
      password:['',[Validators.required,this.passwordValidate()]],
      confirma:['',[Validators.required,this.passwordValidate(),this.matchValues('password')]],
      encuesta:false,
      termino:false,
      politica:false,
    });
  }

  getCountries(){
    this.authService.getCountries().subscribe((resp:any)=>{
      this.countries = resp
    });
  }

  getStates(){
    this.authService.getStates(this.registerForm.get('pais').value).subscribe((resp:any)=>{
      this.states = resp;
    });
  }

  getCities(){
    console.log(this.registerForm.get('departamento').value);
    this.authService.getCities(this.registerForm.get('departamento').value).subscribe((resp:any)=>{
      this.cities = resp;
    });
  }

  singUp(){
    if (this.registerForm.invalid) {
      return
    }
    this.authService.signUp(this.registerForm.value).subscribe(()=>{
      this.registroRef.close();
      Utils.swalSuccessConfirm('¡Excelente!','Se ha registrado correctamente, por favor verifique su correo para activar su cuenta.');
      this.authService.sendEmailActive(this.registerForm.get('email').value);
    },(err:any)=>{
      if (err.status === 461) {
        Utils.swalError('¡Lo siento!','El usuario ya se encuentra registrado')
      }

    }
    );
  }

  validCheck(){
    if ((this.registerForm.get('encuesta').value && this.registerForm.get('termino').value)&&this.registerForm.get('politica').value) {
      this.checkout = true;
    }else{
      this.checkout = false;
    }
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

  get error():any {return this.registerForm.controls}

}
