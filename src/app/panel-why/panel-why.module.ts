import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PanelWhyComponent } from './panel-why.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import { MaterialModule } from '../shared/material/material.module';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { MenuNavComponent } from './side-nav/menu-nav/menu-nav.component';
import { PagosComponent } from './modules/pagos/pagos.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { PuntosComponent } from './modules/puntos/puntos.component';
import { UsuariosComponent } from './modules/usuarios/usuarios.component';



@NgModule({
  declarations: [
    PanelWhyComponent,
    SideNavComponent,
    MenuNavComponent,
    DashboardComponent,
    PagosComponent,
    PuntosComponent,
    UsuariosComponent,
    
  ],
  imports: [
    CommonModule,
    MaterialModule,
    SharedModule,
    RouterModule
  ]
})
export class PanelWhyModule { }
