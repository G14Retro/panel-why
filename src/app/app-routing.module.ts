import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RecoveryComponent } from './auth/recovery/recovery.component';
import { PanelWhyComponent } from './panel-why/panel-why.component';
import { PanelWhyModule } from './panel-why/panel-why.module';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full'},
  { path: 'login', component: LoginComponent},
  { path: 'profile', component: ProfileComponent},
  { path: 'auth/authentication/password-recover/:token', component: RecoveryComponent},
  { path: 'panel-why',loadChildren:()=> import('./panel-why/panel-why.module').then(m => m.PanelWhyModule),
  component: PanelWhyComponent,
},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
