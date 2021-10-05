import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material/material.module';
import { BooleanPipe } from './pipes/boolean.pipe';



@NgModule({
  declarations: [
    BooleanPipe
  ],
  imports: [
    CommonModule,
    MaterialModule,
  ],
  exports:[
    MaterialModule,
    BooleanPipe
  ]
})
export class SharedModule { }
