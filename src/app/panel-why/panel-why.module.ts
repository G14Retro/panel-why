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
import { TablaPagosComponent } from './modules/pagos/components/tabla-pagos/tabla-pagos.component';
import { TablaPuntosComponent } from './modules/puntos/components/tabla-puntos/tabla-puntos.component';
import { HogarComponent } from './modules/completar-perfil/pages/hogar/hogar.component';
import { EducacionComponent } from './modules/completar-perfil/pages/educacion/educacion.component';
import { OcupacionComponent } from './modules/completar-perfil/pages/ocupacion/ocupacion.component';
import { AmbitosComponent } from './modules/completar-perfil/pages/ambitos/ambitos.component';
import { AficionesComponent } from './modules/completar-perfil/pages/aficiones/aficiones.component';
import { PerfilesComponent } from './modules/perfiles/perfiles.component';
import { PuntosAdminComponent } from './modules/puntos-admin/puntos-admin.component';
import { PagosAdminComponent } from './modules/pagos-admin/pagos-admin.component';
import { CambioContrasenaComponent } from './modules/perfil/pages/cambio-contrasena/cambio-contrasena.component';
import { EditarPerfilComponent } from './modules/perfil/pages/editar-perfil/editar-perfil.component';
import { TablaUsuariosComponent } from './modules/usuarios/components/tabla-usuarios/tabla-usuarios.component';
import { TablaPerfilesComponent } from './modules/perfiles/tabla-perfiles/tabla-perfiles.component';
import { TablaPagosAdminComponent } from './modules/pagos-admin/tabla-pagos-admin/tabla-pagos-admin.component';
import { TablaPuntosAdminComponent } from './modules/puntos-admin/tabla-puntos-admin/tabla-puntos-admin.component';
import { CrearUsuarioComponent } from './modules/usuarios/components/crear-usuario/crear-usuario.component';
import { DetalleUsuarioComponent } from './modules/usuarios/components/detalle-usuario/detalle-usuario.component';
import { CrearPerfilComponent } from './modules/perfiles/components/crear-perfil/crear-perfil.component';
import { DetallePerfilComponent } from './modules/perfiles/components/detalle-perfil/detalle-perfil.component';
import { CrearPuntoComponent } from './modules/puntos-admin/components/crear-punto/crear-punto.component';
import { CrearPagoComponent } from './modules/pagos-admin/components/crear-pago/crear-pago.component';



@NgModule({
  declarations: [
    PanelWhyComponent,
    SideNavComponent,
    MenuNavComponent,
    DashboardComponent,
    PagosComponent,
    PuntosComponent,
    UsuariosComponent,
    TablaPagosComponent,
    TablaPuntosComponent,
    HogarComponent,
    EducacionComponent,
    OcupacionComponent,
    AmbitosComponent,
    AficionesComponent,
    PerfilesComponent,
    PuntosAdminComponent,
    PagosAdminComponent,
    CambioContrasenaComponent,
    EditarPerfilComponent,
    TablaUsuariosComponent,
    TablaPerfilesComponent,
    TablaPagosAdminComponent,
    TablaPuntosAdminComponent,
    CrearUsuarioComponent,
    DetalleUsuarioComponent,
    CrearPerfilComponent,
    DetallePerfilComponent,
    CrearPuntoComponent,
    CrearPagoComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    SharedModule,
    RouterModule
  ]
})
export class PanelWhyModule { }
