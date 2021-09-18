import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-registrarse',
  templateUrl: './registrarse.component.html',
  styleUrls: ['./registrarse.component.scss']
})
export class RegistrarseComponent implements OnInit {
  password:boolean = true;
  confirma:boolean = true;
  registerForm:FormGroup;
  constructor(
    private fb:FormBuilder,
  ) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm(){
    this.registerForm = this.fb.group({
      nombres:['',Validators.required],
      apellidos:['',Validators.required],
      email:['',Validators.required],
      pais:['',Validators.required],
      departamento:['',Validators.required],
      ciudad:['',Validators.required],
      telefono:['',Validators.required],
      password:['',Validators.required],
      confirma:['',Validators.required],
    });
  }

}
