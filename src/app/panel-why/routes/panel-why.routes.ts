import { Routes } from "@angular/router";
import { ProfileComponent } from "src/app/profile/profile.component";
import { DashboardComponent } from "../modules/dashboard/dashboard.component";
import { PagosComponent } from "../modules/pagos/pagos.component";

export const MENU_ROUTES:Routes = [
    {path:'dashboard',component:DashboardComponent},
    {path:'pagos',component:PagosComponent},
    {path:'puntos',component:PagosComponent},
    {path:'usuarios',component:PagosComponent},
    {path:'perfil',component:ProfileComponent},
]