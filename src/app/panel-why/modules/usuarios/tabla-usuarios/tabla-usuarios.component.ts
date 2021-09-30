import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { AdminService } from 'src/app/services/admin.service';
import Utils from 'src/app/Utils/tool.util';

@Component({
  selector: 'app-tabla-usuarios',
  templateUrl: './tabla-usuarios.component.html',
  styleUrls: ['./tabla-usuarios.component.scss']
})
export class TablaUsuariosComponent implements OnInit, AfterViewInit {

  selectMasivo = '';
  displayedColumns:string[] = ['acciones','nombres','apellidos','email','estado','tipo_usuario'];
  dataSource = [];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild('download', {static:false}) plantillaBtn:ElementRef<HTMLAnchorElement>;
  @ViewChild('uploadFile',{static:false}) clickInput:ElementRef<HTMLInputElement>;
  constructor(
    private adminService:AdminService,
  ) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(){
    this.paginator._intl.itemsPerPageLabel="Registros por pagina";
  }

  editUser(id){

  }

  removeUser(id){

  }

  btnPlantilla():void{
    const anchorRef = this.plantillaBtn.nativeElement
    anchorRef.click();
  }

  downloadUsers(){
    this.adminService.downloadUsers().subscribe((resp:any)=>{
      Utils.downloadFile(resp,'Usuarios')
    },err=>{
      console.log(err);
    });
  }

  inputFile(){
    const fileUpload = this.clickInput.nativeElement;
    fileUpload.onchange = () => {
      for (let index = 0; index < fileUpload.files.length; index++) {
        this.uploadPlantilla(fileUpload.files[index])
      }
    }
    fileUpload.click();
  }

  uploadPlantilla(file){
    this.adminService.updateFile(file,this.selectMasivo).subscribe((resp:any)=>{
      console.log(resp);
    })
  }

}
