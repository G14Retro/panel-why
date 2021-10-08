import { Routes } from "@angular/router";
import { DecisoresComponent } from "../modules/parametros/decisores/decisores.component";
import { EstadoCivilComponent } from "../modules/parametros/estado-civil/estado-civil.component";
import { EstadoLaboralComponent } from "../modules/parametros/estado-laboral/estado-laboral.component";
import { EstratosComponent } from "../modules/parametros/estratos/estratos.component";
import { FormasPagoComponent } from "../modules/parametros/formas-pago/formas-pago.component";
import { GenerosComponent } from "../modules/parametros/generos/generos.component";
import { NivelAcademicoComponent } from "../modules/parametros/nivel-academico/nivel-academico.component";
import { NivelIngresoComponent } from "../modules/parametros/nivel-ingreso/nivel-ingreso.component";
import { TipoDocumentoComponent } from "../modules/parametros/tipo-documento/tipo-documento.component";


export const PARAMETROS_ROUTES:Routes = [
    {path: 'decisores', component:DecisoresComponent},
    {path: 'estado-civil', component:EstadoCivilComponent},
    {path: 'estado-laboral', component:EstadoLaboralComponent},
    {path: 'estratos', component:EstratosComponent},
    {path: 'formas-pago', component:FormasPagoComponent},
    {path: 'generos', component:GenerosComponent},
    {path: 'nivel-academico', component:NivelAcademicoComponent},
    {path: 'nivel-ingresos', component:NivelIngresoComponent},
    {path: 'tipo-documento', component:TipoDocumentoComponent},
]