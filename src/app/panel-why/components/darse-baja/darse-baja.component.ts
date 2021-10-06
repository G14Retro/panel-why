import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth.service';
import { DataUserService } from 'src/app/services/data-user.service';

@Component({
  selector: 'app-darse-baja',
  templateUrl: './darse-baja.component.html',
  styleUrls: ['./darse-baja.component.scss']
})
export class DarseBajaComponent implements OnInit {

  comentario = new FormControl();
  constructor(
    public bajaRef:MatDialogRef<DarseBajaComponent>,
    private dataUserService:DataUserService,
    private authService:AuthService,
  ) {
    this.comentario.setValidators(Validators.required);
   }

  ngOnInit(): void {
  }

  confirmar(){
    if (this.comentario.invalid) {
      return
    }
    this.dataUserService.disableCount(this.comentario.value).subscribe((resp:any)=>{
      this.authService.logOut();
    });
  }

}
