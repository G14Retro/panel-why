import { Routes } from "@angular/router";
import { ProfileComponent } from "src/app/profile/profile.component";
import { DashboardComponent } from "../modules/dashboard/dashboard.component";
import { PagosComponent } from "../modules/pagos/pagos.component";
import { PuntosComponent } from "../modules/puntos/puntos.component";

export const MENU_ROUTES:Routes = [
    {path:'dashboard',component:DashboardComponent},
    {path:'pagos',component:PagosComponent},
    {path:'puntos',component:PuntosComponent},
    {path:'usuarios',component:PagosComponent},
    {path:'perfil',component:ProfileComponent},
]