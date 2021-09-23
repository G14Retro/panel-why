import { Routes } from "@angular/router";
import { ProfileComponent } from "src/app/profile/profile.component";
import { DashboardComponent } from "../modules/dashboard/dashboard.component";
import { PagosAdminComponent } from "../modules/pagos-admin/pagos-admin.component";
import { PagosComponent } from "../modules/pagos/pagos.component";
import { PerfilesComponent } from "../modules/perfiles/perfiles.component";
import { PuntosAdminComponent } from "../modules/puntos-admin/puntos-admin.component";
import { PuntosComponent } from "../modules/puntos/puntos.component";
import { UsuariosComponent } from "../modules/usuarios/usuarios.component";
import { COMPLETAR_PERFIL_ROUTES } from "./completar-perfil.routes";
import { PERFIL_ROUTES } from "./perfil.routes";

export const MENU_ROUTES:Routes = [
    {path:'dashboard',component:DashboardComponent},
    {path:'perfil',children:PERFIL_ROUTES},
    {path: 'completar-perfil',children:COMPLETAR_PERFIL_ROUTES},
    {path:'pagos',component:PagosComponent},
    {path:'puntos',component:PuntosComponent},
    {path:'usuarios',component:UsuariosComponent},
    {path:'perfiles',component:PerfilesComponent},
    {path:'puntos-admin',component:PuntosAdminComponent},
    {path:'pagos-admin',component:PagosAdminComponent},
]