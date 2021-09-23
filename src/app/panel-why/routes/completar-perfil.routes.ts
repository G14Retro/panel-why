import { Routes } from "@angular/router";
import { AficionesComponent } from "../modules/completar-perfil/pages/aficiones/aficiones.component";
import { AmbitosComponent } from "../modules/completar-perfil/pages/ambitos/ambitos.component";
import { EducacionComponent } from "../modules/completar-perfil/pages/educacion/educacion.component";
import { HogarComponent } from "../modules/completar-perfil/pages/hogar/hogar.component";
import { OcupacionComponent } from "../modules/completar-perfil/pages/ocupacion/ocupacion.component";


export const COMPLETAR_PERFIL_ROUTES:Routes = [
    {path: 'hogar',component:HogarComponent},
    {path: 'educacion',component:EducacionComponent},
    {path: 'ocupacion-trabajo',component:OcupacionComponent},
    {path: 'ambitos',component:AmbitosComponent},
    {path: 'aficiones',component:AficionesComponent},
]