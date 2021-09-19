import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
      new_password:['',Validators.required],
      confirma:['',Validators.required]
    });
  }

  sendPassword(){
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

}
