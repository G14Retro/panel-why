import { FlatTreeControl } from '@angular/cdk/tree';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { DashboardService } from 'src/app/services/dashboard.service';
import { DataUserService } from 'src/app/services/data-user.service';
import Swal from 'sweetalert2';
import { DarseBajaComponent } from '../../components/darse-baja/darse-baja.component';
import { CambioContrasenaComponent } from '../../modules/perfil/pages/cambio-contrasena/cambio-contrasena.component';
import { EditarPerfilComponent } from '../../modules/perfil/pages/editar-perfil/editar-perfil.component';
import { UsuarioPropioComponent } from '../../modules/usuario-propio/usuario-propio.component';


interface MenuNode {
  name: string;
  children?: MenuNode[];
  route?: string;
  parent?: string;
  icon?: string;
}

interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  level: number;
}

const TREE_DATA: MenuNode[] = [
  {
    name:'Asistencia',
    children: [
      {name: 'Problemas Pagos',route:'mailto:redencionpremios@panel-why.odoo.com',parent: '1',},
      {name: 'Problemas Puntos',route:'mailto:puntos@panel-why.odoo.com',parent: '1',},
    ],
  },
]

const TREE_ADMIN: MenuNode[] = [
  {
    name: 'Administración',
    children:[
      {name:'Usuarios',route:'/panel-why/usuarios',parent:'1',icon:'fi-rr-users'},
      {name:'Perfiles',route:'/panel-why/perfiles',parent:'1',icon:'fi-rr-portrait'},
      {name:'Puntos',route:'/panel-why/puntos-admin',parent:'1',icon:'fi-rr-diamond'},
      {name:'Pagos',route:'/panel-why/pagos-admin',parent:'1',icon:'fi-rr-credit-card'},
    ]
  },
  {
    name:'Parámetros',
    children: [
      {name:'Decisores',route:'/panel-why/parametros/decisores',parent:'2',icon:'fi-rr-id-badge'},
      {name:'Estado Civil',route:'/panel-why/parametros/estado-civil',parent:'2',icon:'fi-rr-id-badge'},
      {name:'Estado Laboral',route:'/panel-why/parametros/estado-laboral',parent:'2',icon:'fi-rr-id-badge'},
      {name:'Estratos',route:'/panel-why/parametros/estratos',parent:'2',icon:'fi-rr-id-badge'},
      {name:'Formas de Pago',route:'/panel-why/parametros/formas-pago',parent:'2',icon:'fi-rr-id-badge'},
      {name:'Géneros',route:'/panel-why/parametros/generos',parent:'2',icon:'fi-rr-following'},
      {name:'Nivel Académico',route:'/panel-why/parametros/nivel-academico',parent:'2',icon:'fi-rr-school'},
      {name:'Nivel de Ingresos',route:'/panel-why/parametros/nivel-ingresos',parent:'2',icon:'fi-rr-id-badge'},
      {name:'Tipos de Documento',route:'/panel-why/parametros/tipo-documento',parent:'2',icon:'fi-rr-id-badge'},
    ]
  }
]

@Component({
  selector: 'app-menu-nav',
  templateUrl: './menu-nav.component.html',
  styleUrls: ['./menu-nav.component.scss']
})
export class MenuNavComponent implements OnInit {

  actual = 0;
  profile = '';
  name = '';
  superUser:boolean = false;
  categoria:string = '';
  codigo:string = '';
  subscription:Subscription;
  private _transformer = (node: MenuNode, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      route: node.route,
      level: level,
      parent: node.parent,
      icon: node.icon,
    };
  }

  treeControl = new FlatTreeControl<ExampleFlatNode>(
    node => node.level, node => node.expandable);

treeFlattener = new MatTreeFlattener(
    this._transformer, node => node.level, node => node.expandable, node => node.children);

dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
dataSourceAdmin = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  constructor(
    private dashboard:DashboardService,
    private authService:AuthService,
    private dialog:MatDialog,
    private dataUserService:DataUserService
  ) { 
    this.dataSource.data = TREE_DATA;
    this.dataSourceAdmin.data = TREE_ADMIN;
    this.superUser = authService.user.is_superuser;
  }

  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;

  ngOnInit(): void {
    this.getPoints();
    this.getProfile();
    this.subscription = this.dataUserService.refresh$.subscribe(()=>{
      this.getProfile();
    });
  }

  getPoints(){
    this.dashboard.getPoints().subscribe((resp:any)=>{
      this.actual = resp.points_actual;
    });
  }


  getProfile(){
    this.dashboard.getProfile().subscribe((resp:any)=>{
      this.profile = resp.user_type;
      this.codigo = resp.customer_code;
      if (resp.user_type === "A") {
        this.categoria = 'Bronce';
      }else if (resp.user_type === "B") {
        this.categoria = 'Plata';
      }else if (resp.user_type === "C") {
        this.categoria = 'Diamante';
      }else if (resp.user_type === "D") {
        this.categoria = 'Oro';
      }else{
        this.categoria = 'Bronce';
      }
    });
    this.dashboard.getUser().subscribe((resp:any)=>{
      this.name = resp.names + ' ' + resp.surnames
    });
  }

  logOut(){
    this.authService.logOut();
  }

  miUsuario(){
    const usuarioRef = this.dialog.open(UsuarioPropioComponent,{
      width: '780px'
    })
  }

  perfil(){
    const perfilRef = this.dialog.open(EditarPerfilComponent,{
      width: '780px',
    })
  }

  password(){
    const passwordRef = this.dialog.open(CambioContrasenaComponent,{
      width: '524px',
    })
  }

  darseBaja(){
    Swal.fire({
      icon: 'warning',
      title: '¿Desea desactivar su usuario?',
      text: 'Recuerde que un vez confirme todo el proceso perdera sus puntos y su usuario estará desactivado.',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Aceptar',
      confirmButtonColor: '#C44A5D',
      reverseButtons: true,
    }).then(result=>{
      if (result.isConfirmed) {
        const bajaRef = this.dialog.open(DarseBajaComponent,{
          width: '450px',
          disableClose: true,
          data: {},
        })
      }
    });
  }


}
