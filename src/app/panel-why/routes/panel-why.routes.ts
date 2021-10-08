import { Routes } from "@angular/router";
import { AdminGuard } from "src/app/guards/admin.guard";
import { DashboardComponent } from "../modules/dashboard/dashboard.component";
import { PagosAdminComponent } from "../modules/pagos-admin/pagos-admin.component";
import { PagosComponent } from "../modules/pagos/pagos.component";
import { PerfilesComponent } from "../modules/perfiles/perfiles.component";
import { PuntosAdminComponent } from "../modules/puntos-admin/puntos-admin.component";
import { PuntosComponent } from "../modules/puntos/puntos.component";
import { UsuariosComponent } from "../modules/usuarios/usuarios.component";
import { COMPLETAR_PERFIL_ROUTES } from "./completar-perfil.routes";
import { PARAMETROS_ROUTES } from "./parametros.routes";
import { PERFIL_ROUTES } from "./perfil.routes";

export const MENU_ROUTES:Routes = [
    {path:'dashboard',component:DashboardComponent},
    {path:'perfil',children:PERFIL_ROUTES},
    {path: 'completar-perfil',children:COMPLETAR_PERFIL_ROUTES},
    {path:'pagos',component:PagosComponent},
    {path:'puntos',component:PuntosComponent},
    {path:'usuarios',component:UsuariosComponent,canActivate:[AdminGuard]},
    {path:'perfiles',component:PerfilesComponent,canActivate:[AdminGuard]},
    {path:'puntos-admin',component:PuntosAdminComponent,canActivate:[AdminGuard]},
    {path:'pagos-admin',component:PagosAdminComponent,canActivate:[AdminGuard]},
    {path:'parametros',children:PARAMETROS_ROUTES,canActivate:[AdminGuard]},
]