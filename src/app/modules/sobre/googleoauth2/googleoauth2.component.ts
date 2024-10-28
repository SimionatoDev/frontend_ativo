import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { StoreageDiscoModel } from 'src/app/models/storeage-disco-model';
import { ParametroStorageFree_Credencials } from 'src/app/parametros/parametro-StorageFree_Credencials';
import { GlobalService } from 'src/app/services/global.service';
import { GoogleServiceService } from 'src/app/services/google-service.service';
import { AppSnackbar } from 'src/app/shared/classes/app-snackbar';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-googleoauth2',
  templateUrl: './googleoauth2.component.html',
  styleUrls: ['./googleoauth2.component.css']
})
export class Googleoauth2Component implements OnInit {

  inscricaoOauth!: Subscription;
  inscricaoSpace!: Subscription;


  apiURLOauth2: string = environment.apiOAuth2;

  discoSpace:StoreageDiscoModel[] = [];

  constructor(
    private appSnackBar: AppSnackbar,
    private globalService: GlobalService,
  private googleService : GoogleServiceService) { }

  ngOnInit(): void {
    this.getSpacecrendeciails();
  }

  ngOnDestroy(): void {
    this.inscricaoOauth?.unsubscribe();
    this.inscricaoSpace?.unsubscribe();
  }



  onSubmit(){
      window.location.href = `${this.apiURLOauth2}auth/google`;
  }

  onCancel(){


  }

  getOAuth2() {
    this.globalService.setSpin(true);
    this.inscricaoOauth = this.googleService
      .getoauth2()
      .subscribe(
        (data: any) => {
          this.globalService.setSpin(false);
          this.appSnackBar.openFailureSnackBar(
            `Deu Certo `,
            'OK'
          );
        },
        (error: any) => {
          this.globalService.setSpin(false);
          this.appSnackBar.openFailureSnackBar(
            `Deu Erro ${error.error.tabela} - ${error.error.erro} - ${error.error.message}`,
            'OK'
          );
        }
      );
  }



  getSpacecrendeciails() {
    var param = new ParametroStorageFree_Credencials() ;

    param.id_empresa = this.globalService.getEmpresa().id;
    param.id_local   = this.globalService.getLocal().id;
    param.id_inventario = this.globalService.getInventario().codigo;
    param.key           = "copperstill";

    this.globalService.setSpin(true);
    this.inscricaoOauth = this.googleService
      .getDiscoFreeCrendencials(param)
      .subscribe(
        (data:any ) => {
          this.globalService.setSpin(false);
          let space = new StoreageDiscoModel();
          space.Origem = "Crendencials"
          space.Armazenamento_total = data.space.Armazenamento_total;
          space.Armazenamento_usado = data.space.Armazenamento_usado;
          space.Armazenamento_restante = data.space.Armazenamento_restante;
          this.discoSpace.push(space);
          this.getSpaceOAuth20();
        },
        (error: any) => {
          this.globalService.setSpin(false);
          this.appSnackBar.openFailureSnackBar(
            `Deu Erro ${error.error.tabela} - ${error.error.erro} - ${error.error.message}`,
            'OK'
          );
        }
      );
  }

  getSpaceOAuth20() {
    this.globalService.setSpin(true);
    this.inscricaoOauth = this.googleService
      .getDiscoFreeOauth20()
      .subscribe(
        (data:any ) => {
          this.globalService.setSpin(false);
          let space = new StoreageDiscoModel();
          space.Origem              = data.origem
          space.Armazenamento_total = data.total;
          space.Armazenamento_usado = data.usado;
          space.Armazenamento_restante = data.free;
          this.discoSpace.push(space)
        },
        (error: any) => {
          this.globalService.setSpin(false);
          this.appSnackBar.openFailureSnackBar(
            `Deu Erro ${error.error.tabela} - ${error.error.erro} - ${error.error.message}`,
            'OK'
          );
        }
      );
  }

}
