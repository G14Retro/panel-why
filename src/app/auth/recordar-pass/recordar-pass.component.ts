import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth.service';
import Utils from 'src/app/Utils/tool.util';

@Component({
  selector: 'app-recordar-pass',
  templateUrl: './recordar-pass.component.html',
  styleUrls: ['./recordar-pass.component.scss']
})
export class RecordarPassComponent implements OnInit {

  email:string = '';
  constructor(
    private authService:AuthService,
    private recodarRef:MatDialogRef<RecordarPassComponent>,
  ) { }

  ngOnInit(): void {
  }

  recovery(){
    this.authService.recovery(this.email).subscribe(()=>{
      this.recodarRef.close();
      Utils.swalSuccessConfirm('¡Excelente!','Se ha enviado un correo para restablecer tu contraseña');
    },(err:any)=>{
      if (err.status === 401) {
        Utils.swalError('!Lo siento!','El correo no existe.');
      }
      if (err.status === 461) {
        Utils.swalError('!Lo siento!','El usuario se encuentra inactivo.');
      }
    }
    );
  }

}
