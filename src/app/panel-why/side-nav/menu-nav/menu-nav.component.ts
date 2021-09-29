import { FlatTreeControl } from '@angular/cdk/tree';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { AuthService } from 'src/app/services/auth.service';
import { DashboardService } from 'src/app/services/dashboard.service';
import { CambioContrasenaComponent } from '../../modules/perfil/pages/cambio-contrasena/cambio-contrasena.component';
import { EditarPerfilComponent } from '../../modules/perfil/pages/editar-perfil/editar-perfil.component';


interface MenuNode {
  name: string;
  children?: MenuNode[];
  route?: string;
  parent?: string;
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
  
  // {
  //   name:'Completar mi perfil',
  //   children: [
  //     {name: 'Hogar',parent: '2'},
  //     {name: 'Educación',parent: '2'},
  //     {name: 'Ocupación/ Trabajo',parent: '2'},
  //     {name: 'Hábitos alimenticios',parent: '2'},
  //     {name: 'Aficiones e intereses',parent: '2'},
  //   ],
  // },

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
  private _transformer = (node: MenuNode, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      route: node.route,
      level: level,
      parent: node.parent
    };
  }

  treeControl = new FlatTreeControl<ExampleFlatNode>(
    node => node.level, node => node.expandable);

treeFlattener = new MatTreeFlattener(
    this._transformer, node => node.level, node => node.expandable, node => node.children);

dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  constructor(
    private dashboard:DashboardService,
    private authService:AuthService,
    private dialog:MatDialog,
  ) { 
    this.dataSource.data = TREE_DATA;
    this.superUser = authService.user.is_superuser;
  }

  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;

  ngOnInit(): void {
    this.getPoints();
    this.getProfile();
  }

  getPoints(){
    this.dashboard.getPoints().subscribe((resp:any)=>{
      this.actual = resp.points_actual;
    });
  }


  getProfile(){
    this.dashboard.getProfile().subscribe((resp:any)=>{
      this.profile = resp.user_type;
      this.name = resp.owner_id;
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
  }

  logOut(){
    this.authService.logOut();
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


}
