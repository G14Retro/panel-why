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
import { DarseBajaComponent } from './components/darse-baja/darse-baja.component';
import { DecisoresComponent } from './modules/parametros/decisores/decisores.component';
import { TipoDocumentoComponent } from './modules/parametros/tipo-documento/tipo-documento.component';
import { EstadoCivilComponent } from './modules/parametros/estado-civil/estado-civil.component';
import { EstadoLaboralComponent } from './modules/parametros/estado-laboral/estado-laboral.component';
import { EstratosComponent } from './modules/parametros/estratos/estratos.component';
import { FormasPagoComponent } from './modules/parametros/formas-pago/formas-pago.component';
import { GenerosComponent } from './modules/parametros/generos/generos.component';
import { NivelAcademicoComponent } from './modules/parametros/nivel-academico/nivel-academico.component';
import { NivelIngresoComponent } from './modules/parametros/nivel-ingreso/nivel-ingreso.component';
import { TablaTipoDocumentoComponent } from './modules/parametros/tipo-documento/components/tabla-tipo-documento/tabla-tipo-documento.component';
import { CrearTipoDocumentoComponent } from './modules/parametros/tipo-documento/components/crear-tipo-documento/crear-tipo-documento.component';
import { DetalleTipoDocumentoComponent } from './modules/parametros/tipo-documento/components/detalle-tipo-documento/detalle-tipo-documento.component';
import { TablaEstratosComponent } from './modules/parametros/estratos/components/tabla-estratos/tabla-estratos.component';
import { CrearEstratoComponent } from './modules/parametros/estratos/components/crear-estrato/crear-estrato.component';
import { DetalleEstratoComponent } from './modules/parametros/estratos/components/detalle-estrato/detalle-estrato.component';
import { TablaGenerosComponent } from './modules/parametros/generos/components/tabla-generos/tabla-generos.component';
import { CrearGeneroComponent } from './modules/parametros/generos/components/crear-genero/crear-genero.component';
import { DetalleGeneroComponent } from './modules/parametros/generos/components/detalle-genero/detalle-genero.component';
import { TablaDecisoresComponent } from './modules/parametros/decisores/components/tabla-decisores/tabla-decisores.component';
import { CrearDecisorComponent } from './modules/parametros/decisores/components/crear-decisor/crear-decisor.component';
import { DetalleDecisorComponent } from './modules/parametros/decisores/components/detalle-decisor/detalle-decisor.component';
import { TablaEstadoCivilComponent } from './modules/parametros/estado-civil/components/tabla-estado-civil/tabla-estado-civil.component';
import { CrearEstadoCivilComponent } from './modules/parametros/estado-civil/components/crear-estado-civil/crear-estado-civil.component';
import { DetalleEstadoCivilComponent } from './modules/parametros/estado-civil/components/detalle-estado-civil/detalle-estado-civil.component';
import { TablaNivelAcademicoComponent } from './modules/parametros/nivel-academico/components/tabla-nivel-academico/tabla-nivel-academico.component';
import { CrearNivelAcademicoComponent } from './modules/parametros/nivel-academico/components/crear-nivel-academico/crear-nivel-academico.component';
import { DetalleNivelAcademicoComponent } from './modules/parametros/nivel-academico/components/detalle-nivel-academico/detalle-nivel-academico.component';
import { DetalleEstadoLaboralComponent } from './modules/parametros/estado-laboral/components/detalle-estado-laboral/detalle-estado-laboral.component';
import { TablaEstadoLaboralComponent } from './modules/parametros/estado-laboral/components/tabla-estado-laboral/tabla-estado-laboral.component';
import { CrearEstadoLaboralComponent } from './modules/parametros/estado-laboral/components/crear-estado-laboral/crear-estado-laboral.component';
import { TablaNivelIngresosComponent } from './modules/parametros/nivel-ingreso/components/tabla-nivel-ingresos/tabla-nivel-ingresos.component';
import { CrearNivelIngresoComponent } from './modules/parametros/nivel-ingreso/components/crear-nivel-ingreso/crear-nivel-ingreso.component';
import { DetalleNivelIngresoComponent } from './modules/parametros/nivel-ingreso/components/detalle-nivel-ingreso/detalle-nivel-ingreso.component';
import { TablaFormasPagoComponent } from './modules/parametros/formas-pago/components/tabla-formas-pago/tabla-formas-pago.component';
import { CrearFormaPagoComponent } from './modules/parametros/formas-pago/components/crear-forma-pago/crear-forma-pago.component';
import { DetalleFormaPagoComponent } from './modules/parametros/formas-pago/components/detalle-forma-pago/detalle-forma-pago.component';



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
    DarseBajaComponent,
    DecisoresComponent,
    TipoDocumentoComponent,
    EstadoCivilComponent,
    EstadoLaboralComponent,
    EstratosComponent,
    FormasPagoComponent,
    GenerosComponent,
    NivelAcademicoComponent,
    NivelIngresoComponent,
    TablaTipoDocumentoComponent,
    CrearTipoDocumentoComponent,
    DetalleTipoDocumentoComponent,
    TablaEstratosComponent,
    CrearEstratoComponent,
    DetalleEstratoComponent,
    TablaGenerosComponent,
    CrearGeneroComponent,
    DetalleGeneroComponent,
    TablaDecisoresComponent,
    CrearDecisorComponent,
    DetalleDecisorComponent,
    TablaEstadoCivilComponent,
    CrearEstadoCivilComponent,
    DetalleEstadoCivilComponent,
    TablaNivelAcademicoComponent,
    CrearNivelAcademicoComponent,
    DetalleNivelAcademicoComponent,
    DetalleEstadoLaboralComponent,
    TablaEstadoLaboralComponent,
    CrearEstadoLaboralComponent,
    TablaNivelIngresosComponent,
    CrearNivelIngresoComponent,
    DetalleNivelIngresoComponent,
    TablaFormasPagoComponent,
    CrearFormaPagoComponent,
    DetalleFormaPagoComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    SharedModule,
    RouterModule
  ]
})
export class PanelWhyModule { }
