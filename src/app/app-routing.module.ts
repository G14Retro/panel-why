import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActiveUserComponent } from './auth/active-user/active-user.component';
import { LoginComponent } from './auth/login/login.component';
import { RecoveryComponent } from './auth/recovery/recovery.component';
import { AuthGuard } from './guards/auth.guard';
import { LoginGuard } from './guards/login.guard';
import { PanelWhyComponent } from './panel-why/panel-why.component';
import { MENU_ROUTES } from './panel-why/routes/panel-why.routes';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent,canActivate:[LoginGuard]},
  { path: 'perfil', component: ProfileComponent},
  { path: 'auth/authentication/password-recover/:token', component: RecoveryComponent},
  { path: 'auth/authentication/activate-user/:token', component: ActiveUserComponent},
  { path: 'panel-why',component: PanelWhyComponent,children:MENU_ROUTES,canActivate:[AuthGuard]},
  { path: '', redirectTo: 'login', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
