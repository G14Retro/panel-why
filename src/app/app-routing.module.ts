import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RecoveryComponent } from './auth/recovery/recovery.component';
import { AuthGuard } from './guards/auth.guard';
import { LoginGuard } from './guards/login.guard';
import { PanelWhyComponent } from './panel-why/panel-why.component';
import { MENU_ROUTES } from './panel-why/routes/panel-why.routes';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full'},
  { path: 'login', component: LoginComponent,canActivate:[LoginGuard]},
  { path: 'perfil', component: ProfileComponent},
  { path: 'auth/authentication/password-recover/:token', component: RecoveryComponent},
  { path: 'panel-why',component: PanelWhyComponent,children:MENU_ROUTES,},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
