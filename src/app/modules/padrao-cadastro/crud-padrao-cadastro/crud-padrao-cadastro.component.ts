import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Padrao_CabModel } from 'src/app/models/padrao_cab-model';
import { ParametroModel } from 'src/app/models/parametro-model';
import { ParametroPadrao_Cab01 } from 'src/app/parametros/parametro-padrao_cab01';
import { GlobalService } from 'src/app/services/global.service';
import { LocalStorageService } from 'src/app/services/localStorage.service';
import { Padrao_CabService } from 'src/app/services/padrao_cab.service';
import { AppSnackbar } from 'src/app/shared/classes/app-snackbar';
import { AtualizaParametroParametroPadraoCab01 } from 'src/app/shared/classes/atualiza-parametro-parametro-padrao-cab01';
import { CadastroAcoes } from 'src/app/shared/classes/cadastro-acoes';
import { ControlePaginas } from 'src/app/shared/classes/controle-paginas';
import { messageError } from 'src/app/shared/classes/util';

@Component({
  selector: 'app-crud-padrao-cadastro',
  templateUrl: './crud-padrao-cadastro.component.html',
  styleUrls: ['./crud-padrao-cadastro.component.css']
})
export class CrudPadraoCadastroComponent implements OnInit {



  retorno: boolean = false;

  parametro: ParametroModel = new ParametroModel();

  inscricaoGetDados!: Subscription;
  inscricaoGetContador!: Subscription;

  tamPagina = 50;

  controlePaginas: ControlePaginas = new ControlePaginas(
    this.tamPagina,
    this.tamPagina
  );

  browse: boolean = true;

  idAcao: CadastroAcoes = CadastroAcoes.Consulta;

  hide: boolean = false;

  targetRowId = 0;

  paramName = 'paramapelido';

  apelidos:Padrao_CabModel[] = [];

  constructor(

    private globalService: GlobalService,
    private cabService:Padrao_CabService,
    private localStorageService:  LocalStorageService,
    private router: Router,
    private appSnackBar: AppSnackbar,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.getApelidosContador();
  }

  ngOnDestroy(): void {
    this.inscricaoGetDados?.unsubscribe();
    this.inscricaoGetContador?.unsubscribe();
  }


  getApelidos() {
    let par = new ParametroPadrao_Cab01();

    par =  AtualizaParametroParametroPadraoCab01(par,this.parametro.getParametro());

    par.contador = 'N';

    par.pagina = this.controlePaginas.getPaginalAtual();

    this.globalService.setSpin(true);
    this.inscricaoGetDados = this.cabService
      .getPadroes_CabParametro_01(par)
      .subscribe(
        (data: Padrao_CabModel[]) => {
          this.globalService.setSpin(false);
          this.apelidos = data;
        },
        (error: any) => {
          this.globalService.setSpin(false);
          this.apelidos = [];
          this.appSnackBar.openFailureSnackBar(
            `Pesquisa No Padrão De Cadastros ${messageError(error)}`,
            'OK'
      );}
      );
  }


  getApelidosContador() {

    let par = new ParametroPadrao_Cab01();

    par =  AtualizaParametroParametroPadraoCab01(par,this.parametro.getParametro());

    par.contador = 'S';

    par.tamPagina = this.tamPagina;

    this.globalService.setSpin(true);
    this.inscricaoGetContador = this.cabService
      .getPadroes_CabParametro_01(par)
      .subscribe(
        (data: any) => {
          this.globalService.setSpin(false);
          var pag = this.controlePaginas.getPaginalAtual();
          this.controlePaginas = new ControlePaginas(
            this.tamPagina,
            data.total == 0 ? 1 : data.total
          );
          this.controlePaginas.setPaginaAtual(pag);
          if  (data.total > 0){
              this.getApelidos();
          } else {
            this.apelidos = [];
            this.controlePaginas = new ControlePaginas(this.tamPagina, 1);
          }
          this.getApelidos();
        },
        (error: any) => {
          console.log(error);
          this.globalService.setSpin(false);
          this.apelidos = [];
          this.controlePaginas = new ControlePaginas(this.tamPagina, 1);
        }
      );
  }



  onChangeParametros(param:ParametroModel) {
    console.log("change chamdo",param);
    this.parametro = param;
    let page:number = 1;
    var pag = this.localStorageService.getNumber("page");
    console.log("page:",pag);
    if (pag != null) {
       page =  pag;
    }
    this.controlePaginas.setPaginaAtual(page);
    this.getApelidosContador();
  }




  onChangeHide(hide:boolean){
    this.hide = hide;
  }


  novaConsulta(){
    this.localStorageService.removeItem("page");
    this.controlePaginas = new ControlePaginas(this.tamPagina,1);
    this.getApelidosContador();
  }


  onChangePage() {
    this.localStorageService.removeItem("page");
    this.getApelidosContador();
  }


  onHome() {
    this.router.navigate(['']);
  }


}
