import { ChangeMod01DialogComponent } from './../../../shared/components/change-mod01-dialog/change-mod01-dialog.component';
import { ChangeMod01Data } from './../../../shared/components/change-mod01-dialog/change-mod01-data';
import { LocalStorageService } from './../../../services/localStorage.service';
import { RetornoLancamento } from 'src/app/shared/classes/retorno-lancamento';
import { InventarioModel } from './../../../models/inventario-model';
import { ValoresDialogComponent } from './../../../shared/valores-dialog/valores-dialog.component';
import { CadastroAcoes } from 'src/app/shared/classes/cadastro-acoes';
import { LancaDialogComponent } from './../../../shared/components/lanca-dialog/lanca-dialog.component';
import { SituacaoInventario } from './../../../shared/classes/situacao-inventario';
import { ParametroModel } from './../../../models/parametro-model';
import { ImobilizadoinventarioModel } from './../../../models/imobilizadoinventario-model';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { Component, NgZone, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { CentrocustoModel } from 'src/app/models/centrocusto-model';
import { GrupoModel } from 'src/app/models/grupo-model';
import { ControlePaginas } from 'src/app/shared/classes/controle-paginas';
import { GlobalService } from 'src/app/services/global.service';
import { GrupoService } from 'src/app/services/grupo.service';
import { CentrocustoService } from 'src/app/services/centrocusto.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AppSnackbar } from 'src/app/shared/classes/app-snackbar';
import { ImobilizadoinventarioService } from 'src/app/services/imobilizadoinventario.service';
import { ParametroGrupo01 } from 'src/app/parametros/parametro-grupo01';
import {
  GetValueJsonBoolean,
  MensagensBotoes,
  messageError,
} from 'src/app/shared/classes/util';
import { ParametroCentrocusto01 } from 'src/app/parametros/parametro-centrocusto01';
import { ParametroImobilizadoinventario01 } from 'src/app/parametros/parametro-imobilizadoinventario01';
import { LancamentoModel } from 'src/app/models/lancamento-model';
import { LancaData } from 'src/app/shared/components/lanca-dialog/lanca-data';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { LancamentoService } from 'src/app/services/lancamento.service';
import { ImobilizadoData } from 'src/app/shared/components/imobilizado-dialog/imobilizado-data';
import { ImobilizadoDialogComponent } from 'src/app/shared/components/imobilizado-dialog/imobilizado-dialog.component';
import { NfeData } from 'src/app/shared/nfe-dialog/nfe-data';
import { NfeModel } from 'src/app/models/nfe-model';
import { NfeDialogComponent } from 'src/app/shared/nfe-dialog/nfe-dialog.component';
import { ValorData } from 'src/app/shared/valores-dialog/valor-data';
import { ValorModel } from 'src/app/models/valor-model';
import { NfeService } from 'src/app/services/nfe.service';
import { ValorService } from 'src/app/services/valor.service';
import { SimNao } from 'src/app/shared/classes/sim-nao';
import { Condicoes } from 'src/app/shared/classes/condicoes';
import { Origem } from 'src/app/shared/classes/Origem';
import { UsuarioModel } from 'src/app/models/usuario-model';
import { ResumoLancamentosUsuariosModel } from 'src/app/models/resumo-lancamentos-usuario-model';
import { AtualizaParametroImobilizadoInventario01 } from 'src/app/shared/classes/atualiza-parametro-imobilizado-inventario01';
import { RetornoOpcao } from 'src/app/shared/classes/retorno-opcao';

@Component({
  selector: 'app-crud-imoinventario',
  templateUrl: './crud-imoinventario.component.html',
  styleUrls: ['./crud-imoinventario.component.css'],
})
export class CrudImoinventarioComponent implements OnInit {
  @ViewChild(CdkVirtualScrollViewport) viewPort!: CdkVirtualScrollViewport;

  inscricaoGetAll!: Subscription;
  inscricaoGetGrupo!: Subscription;
  inscricaoGetCc!: Subscription;
  inscricaoGetLancamento!: Subscription;
  inscricaoRota!: Subscription;
  inscricaoParametro!: Subscription;
  inscricaoNfe!: Subscription;
  inscricaoValores!: Subscription;

  imoinv: ImobilizadoinventarioModel[] = [];

  atual: ImobilizadoinventarioModel = new ImobilizadoinventarioModel();

  grupos: GrupoModel[] = [];

  ccs: CentrocustoModel[] = [];

  ccs_alterados: CentrocustoModel[] = [];

  condicoes: Condicoes[] = [];

  respostas: SimNao[] = [];

  erro: string = '';

  tamPagina = 50;

  controlePaginas: ControlePaginas = new ControlePaginas(
    this.tamPagina,
    this.tamPagina
  );

  retorno: boolean = false;

  parametro: ParametroModel = new ParametroModel();

  situacoesInventario: SituacaoInventario[] = [];

  situacoesInventarioPar: SituacaoInventario[] = [];

  Origens: Origem[] = [];

  usuarios: UsuarioModel[] = [];

  lancamento: LancamentoModel = new LancamentoModel();

  nfe: NfeModel = new NfeModel();

  valor: ValorModel = new ValorModel();

  inventario: InventarioModel = new InventarioModel();

  browse: boolean = true;

  idAcao: CadastroAcoes = CadastroAcoes.Consulta;

  hide: boolean = false;

  executores: ResumoLancamentosUsuariosModel[] = [];

  targetRowId = 0;

  paramName = 'paramimoinv';

  constructor(
    private globalService: GlobalService,
    private imoInventarioService: ImobilizadoinventarioService,
    private grupoService: GrupoService,
    private centrocustoService: CentrocustoService,
    private lancamentoService: LancamentoService,
    private nfeService: NfeService,
    private valorService: ValorService,
    private localStorageService:  LocalStorageService,
    private router: Router,
    private appSnackBar: AppSnackbar,
    private route: ActivatedRoute,
    private ngZone: NgZone,
    private LancaDialog: MatDialog,
    private NfeDialog: MatDialog,
    private valorDialog: MatDialog,
    private changeDialog:MatDialog
  ) {
    this.localStorageService.clear();
    this.getCentroCustos();
  }

  ngOnInit(): void {
    this.inventario = this.globalService.getInventario();
  }



  ngOnDestroy(): void {
    this.inscricaoGetAll?.unsubscribe();
    this.inscricaoGetGrupo?.unsubscribe();
    this.inscricaoGetCc?.unsubscribe();
    this.inscricaoGetLancamento?.unsubscribe();
    this.inscricaoRota?.unsubscribe();
    this.inscricaoParametro?.unsubscribe();
    this.inscricaoNfe?.unsubscribe();
    this.inscricaoValores?.unsubscribe();
    this.localStorageService.removeItem(this.paramName);
    this.localStorageService.removeItem("retorno");
  }

  getNfe(imobilizado: ImobilizadoinventarioModel) {
    this.globalService.setSpin(true);
    this.inscricaoNfe = this.nfeService
      .getNfeByImobilizado(
        imobilizado.id_empresa,
        imobilizado.id_filial,
        imobilizado.id_imobilizado,
        imobilizado.imo_nfe,
        imobilizado.imo_serie,
        imobilizado.imo_item
      )
      .subscribe(
        (data: NfeModel[]) => {
          this.globalService.setSpin(false);
          if (data.length > 0) {
            this.nfe = data[0];
            this.openNfeDialog();
          }
        },
        (error: any) => {
          this.globalService.setSpin(false);
          this.appSnackBar.openFailureSnackBar(
            `Pesquisa Nas Nfes ${messageError(error)}`,
            'OK'
          );
        }
      );
  }

  getValor(imobilizado: ImobilizadoinventarioModel) {
    this.globalService.setSpin(true);
    this.inscricaoValores = this.valorService
      .getValor(
        imobilizado.id_empresa,
        imobilizado.id_filial,
        imobilizado.id_imobilizado
      )
      .subscribe(
        (data: ValorModel) => {
          this.globalService.setSpin(false);
          this.valor = data;
          this.openValoresDialog();
        },
        (error: any) => {
          this.globalService.setSpin(false);
          this.appSnackBar.openFailureSnackBar(
            `Pesquisa Nos Valores ${messageError(error)}`,
            'OK'
          );
        }
      );
  }


  getCentroCustos() {
    let par = new ParametroCentrocusto01();

    par.id_empresa = this.globalService.getIdEmpresa();

    par.id_filial = this.globalService.getLocal().id;

    par.orderby = 'Descrição';

    this.globalService.setSpin(true);
    this.inscricaoGetCc = this.centrocustoService
      .getCentroscustosParametro_01(par)
      .subscribe(
        (data: CentrocustoModel[]) => {
          this.globalService.setSpin(false);
          const semFiltro: CentrocustoModel = new CentrocustoModel();
          semFiltro.codigo = '';
          semFiltro.descricao = 'Todos';
          this.ccs = [];
          this.ccs_alterados = [];
          this.ccs.push(semFiltro);
          const semAlter: CentrocustoModel = new CentrocustoModel();
          semAlter.codigo = '';
          semAlter.descricao = 'Todos Não Alterados';
          this.ccs_alterados.push(semAlter);
          data.forEach((obj) => {
            var idx = obj.descricao.indexOf('-');
            if (idx >= 0) {
              obj.descricao =
                obj.descricao.trim().substring(idx + 1) +
                ' -> ' +
                obj.descricao.trim();
            }
          });
          data.sort((a, b) => {
            if (a.descricao < b.descricao) {
              return -1;
            }
            if (a.descricao > b.descricao) {
              return 1;
            }
            return 0;
          });
          this.ccs = [...this.ccs, ...data];
          this.ccs_alterados = [...this.ccs_alterados, ...data];
          this.getGrupos();
        },
        (error: any) => {
          this.globalService.setSpin(false);
          this.ccs = [];
          this.ccs_alterados = [];
          this.appSnackBar.openFailureSnackBar(
            `Pesquisa Nos Grupos ${messageError(error)}`,
            'OK'
          );
        }
      );
  }

  getGrupos() {
    let par = new ParametroGrupo01();

    par.id_empresa = this.globalService.getIdEmpresa();

    par.id_filial = this.globalService.getLocal().id;

    par.orderby = 'Grupo';

    this.globalService.setSpin(true);
    this.inscricaoGetGrupo = this.grupoService
      .getGruposParametro_01(par)
      .subscribe(
        (data: GrupoModel[]) => {
          this.globalService.setSpin(false);
          const semFiltro: GrupoModel = new GrupoModel();
          semFiltro.codigo = 0;
          semFiltro.descricao = 'Todos';
          this.grupos = [];
          this.grupos.push(semFiltro);
          this.grupos = [...this.grupos, ...data];
        },
        (error: any) => {
          this.globalService.setSpin(false);
          this.grupos = [];
          this.appSnackBar.openFailureSnackBar(
            `Pesquisa Nos Grupos ${messageError(error)}`,
            'OK'
          );
        }
      );
  }

  getImoIven() {
    let par = new ParametroImobilizadoinventario01();

    par.id_empresa = this.globalService.getIdEmpresa();

    par.id_filial = this.globalService.getLocal().id;

    par.id_inventario = this.globalService.getInventario().codigo;

    par = AtualizaParametroImobilizadoInventario01(par,this.parametro.getParametro());

    par.pagina = this.controlePaginas.getPaginalAtual();

    console.log("pagina atual: ",this.controlePaginas.getPaginalAtual());

    this.globalService.setSpin(true);
    this.inscricaoGetAll = this.imoInventarioService
      .getImobilizadosinventariosParametro_01(par)
      .subscribe(
        (data: ImobilizadoinventarioModel[]) => {
          this.globalService.setSpin(false);
          this.atualizaTargetId();
          this.imoinv = data;

          /*
          if (this.atual.id_imobilizado !== 0) {
            const idx = this.imoinv.findIndex(
              (inv) => inv.id_imobilizado == this.atual.id_imobilizado
            );
            setTimeout(() => this.viewPort.scrollToIndex(idx), 10);
          }
          this.retorno = false;
          this.atual = new ImobilizadoinventarioModel();
          let config = this.parametro.getParametro();
          Object(config).id_retorno = 0;
          Object(config).new = false;
          this.parametro.parametro = JSON.stringify(config); */
         /*  if (this.globalService.mouseX >= 0){
            console.log("Posicionando em ",this.globalService.mouseX,this.globalService.mouseY)
            this.poscionaWindow(this.globalService.mouseX,this.globalService.mouseY);
          } */
        },
        (error: any) => {
          this.globalService.setSpin(false);
          this.imoinv = [];
          this.appSnackBar.openFailureSnackBar(
            `Pesquisa Nos Produtos De Inventário ${messageError(error)}`,
            'OK'
          );
        }
      );
  }


  getImoIvenContador() {

    let par = new ParametroImobilizadoinventario01();

    par.id_empresa = this.globalService.getIdEmpresa();

    par.id_filial = this.globalService.getLocal().id;

    par.id_inventario = this.globalService.getInventario().codigo;

    par =  AtualizaParametroImobilizadoInventario01(par,this.parametro.getParametro());

    par.contador = 'S';

    par.tamPagina = this.tamPagina;

    this.globalService.setSpin(true);
    this.inscricaoGetAll = this.imoInventarioService
      .getImobilizadosinventariosParametro_01(par)
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
              this.getImoIven();
          } else {
            this.imoinv = [];
            this.controlePaginas = new ControlePaginas(this.tamPagina, 1);
          }
        },
        (error: any) => {
          console.log(error);
          this.globalService.setSpin(false);
          this.imoinv = [];
          this.controlePaginas = new ControlePaginas(this.tamPagina, 1);
        }
      );
  }

  getLancamento(opcao: CadastroAcoes, imobilizado: ImobilizadoinventarioModel) {
    this.globalService.setSpin(true);
    this.inscricaoGetLancamento = this.lancamentoService
      .getLancamento(
        imobilizado.id_empresa,
        imobilizado.id_filial,
        imobilizado.id_inventario,
        imobilizado.id_imobilizado
      )
      .subscribe(
        (data: any) => {
          this.globalService.setSpin(false);
          this.lancamento = data;
          this.idAcao = opcao;
          this.browse = false;
        },
        (error: any) => {
          this.globalService.setSpin(false);
          this.lancamento = new LancamentoModel();
          this.appSnackBar.openFailureSnackBar(
            `Pesquisa Nos Lançamentos ${messageError(error)}`,
            'OK'
          );
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
    this.localStorageService.removeItem("page");
    this.getImoIvenContador();
  }


  getTexto() {
    return MensagensBotoes;
  }

  escolha(op:number, imobilizado: ImobilizadoinventarioModel) {

    this.localStorageService.setParametroModel(this.paramName,this.parametro);

    this.localStorageService.setNumber("page",this.controlePaginas.getPaginalAtual());

    this.localStorageService.setNumber("retorno",imobilizado.id_imobilizado);

    if (op == 95) {
      this.getNfe(imobilizado);
      return;
    }

    if (op == 94) {
      this.getValor(imobilizado);
      return;
    }

    if (op == CadastroAcoes.Substituir){
      this.openSubstituirDialog(imobilizado);
      return;
    }

    this.atual = imobilizado;

    if (imobilizado.id_lanca == 0) {
      this.lancamento = new LancamentoModel();
      this.lancamento.id_empresa = imobilizado.id_empresa;
      this.lancamento.id_filial = imobilizado.id_filial;
      this.lancamento.id_imobilizado = imobilizado.id_imobilizado;
      this.lancamento.id_inventario = imobilizado.id_inventario;
      this.lancamento.imo_cod_cc = imobilizado.imo_cod_cc;
      this.lancamento.imo_cod_grupo = imobilizado.imo_cod_grupo;
      this.lancamento.condicao = imobilizado.condicao;
      this.lancamento.book = imobilizado.book;
      this.lancamento.id_usuario = this.globalService.getUsuario().id;
      this.lancamento.usu_razao = this.globalService.getUsuario().razao;
      this.lancamento.imo_descricao = imobilizado.imo_descricao;
      this.lancamento.estado = imobilizado.status;
      this.idAcao = CadastroAcoes.Inclusao;
      this.browse = false;
    } else {
      this.getLancamento(op, imobilizado);
    }
  }

  onChangePage() {
    this.localStorageService.removeItem("page");
    this.getImoIven();
  }


  onHome() {
    this.router.navigate(['']);
  }


  openNfeDialog(): void {
    const data: NfeData = new NfeData();
    data.nfe = this.nfe;
    data.opcao = CadastroAcoes.Consulta;
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.id = 'nfes';
    dialogConfig.width = '1200px';
    dialogConfig.data = data;
    const modalDialog = this.NfeDialog.open(NfeDialogComponent, dialogConfig)
      .beforeClosed()
      .subscribe((data: NfeData) => {
        //faço nada
      });
  }


  openSubstituirDialog(imobilizado: ImobilizadoinventarioModel): void {
    const data: ChangeMod01Data = new ChangeMod01Data();
    data.ativo = imobilizado;
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.id = 'substituir';
    dialogConfig.width = '1200px';
    dialogConfig.data = data;
    const modalDialog = this.NfeDialog.open(ChangeMod01DialogComponent, dialogConfig)
      .beforeClosed()
      .subscribe((data: ChangeMod01Data) => {
        this.getImoIven();
      });
  }



  openValoresDialog(): void {
    const data: ValorData = new ValorData();
    data.valor = this.valor;
    data.opcao = CadastroAcoes.Consulta;

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.id = 'valores';
    dialogConfig.width = '1200px';
    dialogConfig.data = data;
    const modalDialog = this.valorDialog
      .open(ValoresDialogComponent, dialogConfig)
      .beforeClosed()
      .subscribe((data: LancaData) => {
        //faço nada
      });
  }

  openLancaDialog(
    opcao: number,
    imobilizado: ImobilizadoinventarioModel
  ): void {
   /*  let config = this.parametro.getParametro();
    Object(config).new = false;
    Object(config).id_retorno = imobilizado.id_imobilizado;
    Object(config).page = this.controlePaginas.getPaginalAtual();
    this.parametro.parametro = JSON.stringify(config);
    this.globalService.estadoSave(this.parametro);
    console.log(this.parametro); */
    //
    const data: LancaData = new LancaData();
    data.ccs = [...this.ccs];
    data.ccs[0].codigo = '';
    data.ccs[0].descricao = 'CENTRO DE CUSTO NÃO ALTERADO';
    data.lancamento = this.lancamento;
    data.opcao = opcao;
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.id = 'apontamento';
    dialogConfig.width = '1200px';
    dialogConfig.data = data;
    const modalDialog = this.LancaDialog.open(
      LancaDialogComponent,
      dialogConfig
    )
      .beforeClosed()
      .subscribe((data: LancaData) => {
        this.getImoIven();
      });
  }

  openImobilizadoDialog(): void {
    const data: ImobilizadoData = new ImobilizadoData();
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.id = 'imobilizado';
    dialogConfig.width = '1200px';
    dialogConfig.height = '1200px';
    dialogConfig.data = data;
    const modalDialog = this.LancaDialog.open(
      ImobilizadoDialogComponent,
      dialogConfig
    )
      .beforeClosed()
      .subscribe((data: ImobilizadoData) => {
        //this.getImoIven();
      });
  }

  onProcessar(retorno: RetornoLancamento) {
    if (retorno.opcao == CadastroAcoes.None) {
      if (this.atual.id_imobilizado !== 0) {
       /* const idx = this.imoinv.findIndex(
          (inv) => inv.id_imobilizado == this.atual.id_imobilizado);
          setTimeout(() => this.viewPort.scrollToIndex(idx), 10);
       */
      }
      this.atual = new ImobilizadoinventarioModel();
      this.browse = true;
    } else {
      this.browse = true;
    }
  }


  onChangeHide(hide:boolean){
    this.hide = hide;
  }

  atualizaTargetId() {

    const retorno  = this.localStorageService.getNumber("retorno");
    if (retorno != null){

        this.targetRowId = retorno;

        this.localStorageService.removeItem("retorno");

    } else {

      this.targetRowId = 0;
    }
  }
  onTopoPagina(){
    this.poscionaWindow(0,0);
  }

  novaConsulta(){
    this.localStorageService.removeItem("page");
    this.controlePaginas = new ControlePaginas(this.tamPagina,1);
    this.getImoIvenContador();
  }

  poscionaWindow(x:number,y:number){
    window.scrollTo(x,y);
  }

  onPosiciona(){
    this.poscionaWindow(0,0);
  }
}
