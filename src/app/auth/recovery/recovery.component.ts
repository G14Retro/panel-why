import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Utils from 'src/app/Utils/tool.util';

@Component({
  selector: 'app-recovery',
  templateUrl: './recovery.component.html',
  styleUrls: ['./recovery.component.scss']
})
export class RecoveryComponent implements OnInit {

  nueva:boolean = true;
  confirma:boolean = true;
  recoveryForm:FormGroup;
  token:string = '';
  constructor(
    private fb:FormBuilder,
    private route:ActivatedRoute,
    private authService:AuthService,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.createForm();
    this.route.paramMap.subscribe(params=>{
      this.token = params.get('token')
    });
  }


  createForm(){
    this.recoveryForm = this.fb.group({
      new_password:['',Validators.required,this.passwordValidate()],
      confirma:['',[Validators.required,this.passwordValidate(),this.matchValues('new_password')]]
    });
  }

  sendPassword(){
    if (this.recoveryForm.invalid) {
      return
    }
    const data = {
      new_password: this.recoveryForm.get('new_password').value,
      token: this.token
    }
    this.authService.newPassword(data).subscribe(()=>{
      Utils.swalSuccess('¡Excelente!','¡Se ha restablecido la contraseña satisfactoriamente!')
      this.router.navigateByUrl('/login');
    },(err:any)=>{
      console.log(err);
    }
    );
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

  get error():any {return this.recoveryForm.controls}

}
