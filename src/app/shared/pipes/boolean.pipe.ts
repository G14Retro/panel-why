import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'boolean'
})
export class BooleanPipe implements PipeTransform {
  estado:string = "";

  transform(value: boolean): string {
    if (value) {
      this.estado = 'Activo'
    }else{
      this.estado = 'Inactivo'
    }

    return this.estado;
  }

}
