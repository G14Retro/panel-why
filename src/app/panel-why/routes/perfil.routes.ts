import { Routes } from "@angular/router";
import { ProfileComponent } from "src/app/profile/profile.component";
import { CambioContrasenaComponent } from "../modules/perfil/pages/cambio-contrasena/cambio-contrasena.component";


export const PERFIL_ROUTES:Routes = [
    {path: 'editar', component:ProfileComponent},
    {path: 'cambio-contrasena', component:CambioContrasenaComponent},
]