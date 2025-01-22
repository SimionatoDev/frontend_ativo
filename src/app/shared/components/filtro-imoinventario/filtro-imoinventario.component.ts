import { LocalStorageService } from './../../../services/localStorage.service';
import { Orderby } from './../../classes/orderby';
import { ControlePaginas } from 'src/app/shared/classes/controle-paginas';
import { ParametrosService } from 'src/app/services/parametros.service';
import { Component, EventEmitter, Input, OnInit, Output, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CentrocustoService } from 'src/app/services/centrocusto.service';
import { GlobalService } from 'src/app/services/global.service';
import { GrupoService } from 'src/app/services/grupo.service';
import { AppSnackbar } from '../../classes/app-snackbar';
import { Observable, Subscription } from 'rxjs';
import { map,filter,tap,take, distinctUntilChanged, debounceTime} from   'rxjs/operators';
import { SituacaoInventario } from '../../classes/situacao-inventario';
import { Origem } from '../../classes/Origem';
import { UsuarioModel } from 'src/app/models/usuario-model';
import { LancamentoModel } from 'src/app/models/lancamento-model';
import { ResumoLancamentosUsuariosModel } from 'src/app/models/resumo-lancamentos-usuario-model';
import { GrupoModel } from 'src/app/models/grupo-model';
import { CentrocustoModel } from 'src/app/models/centrocusto-model';
import { SimNao } from '../../classes/sim-nao';
import { Condicoes } from '../../classes/condicoes';
import { ParametroCentrocusto01 } from 'src/app/parametros/parametro-centrocusto01';
import { ParametroGrupo01 } from 'src/app/parametros/parametro-grupo01';
import { GetValueJsonBoolean, GetValueJsonNumber, GetValueJsonString, messageError } from '../../classes/util';
import { ParametroParametro01 } from 'src/app/parametros/parametro-parametro01';
import { ParametroLancamentoUsuario } from 'src/app/parametros/parametros-lancamento-usuarios';
import { LancamentoService } from 'src/app/services/lancamento.service';
import { ParametroSendemailv2 } from 'src/app/parametros/parametro-sendemailv2';
import { EmailService } from 'src/app/services/email.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { EmailDialogData } from '../email-dialog/email-dialog-data';
import { EmailDialogComponent } from '../email-dialog/email-dialog.component';
import { DownloadDialogData } from '../download-dialog/download-dialog-data';
import { DownloadDialogComponent } from '../download-dialog/download-dialog.component';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { ParametroModel } from 'src/app/models/parametro-model';
import { ParametroPrincipal01 } from 'src/app/parametros/parametro-principal01';
import { PrincipalService } from 'src/app/services/principal.service';
import { PrincipalModel } from 'src/app/models/principal-model';
import { SeachDialogService } from 'src/app/services/seach-dialog.service';
import { SeachDialogData } from '../seach-dialog/seach-dialog-data';
import { CadastroEnum } from '../../enum/cadastro-enum.enum';

@Component({
  selector: 'app-filtro-imoinventario',
  templateUrl: './filtro-imoinventario.component.html',
  styleUrls: ['./filtro-imoinventario.component.css']
})
export class FiltroImoinventarioComponent implements OnInit {
  @Input('PARAMNAME') paramName :string = ""
  @Input('RETORNO')   retorno:boolean = false;
  @Input('EMAIL')     email:boolean = false;
  @Input('DOWNLOAD')  download:boolean = false;
  @Input('CONTROLE_PAGINAS') controle_paginas:ControlePaginas = new ControlePaginas(50,0);
  @Input('HIDE') hide: boolean = true;
  @Output('changeParametro') change = new EventEmitter<ParametroModel>();
  @Output('changeHide') changeHide = new EventEmitter<boolean>();

  inscricaoGetGrupo!: Subscription;
  inscricaoParametro!: Subscription;
  inscricaoExecutores!: Subscription;
  inscricaoExcel!: Subscription;
  inscricaoEmail!: Subscription;
  inscricaoPrincipais!: Subscription;
  parametros: FormGroup;

  grupos: GrupoModel[] = [];

  ccs: CentrocustoModel[] = [];

  ccs_alterados: CentrocustoModel[] = [];

  condicoes: Condicoes[] = [];

  respostas: SimNao[] = [];

  situacoesInventario: SituacaoInventario[] = [];

  situacoesInventarioPar: SituacaoInventario[] = [];

  Origens: Origem[] = [];

  usuarios: UsuarioModel[] = [];

  lancamento: LancamentoModel = new LancamentoModel();

  principais:PrincipalModel[] = [];

  showFiltro: boolean = true;

  executores: ResumoLancamentosUsuariosModel[] = [];

  hideAcao:string = "Ocultar";



  orderby:Orderby[] =  [
    {sigla:"001" , descricao:"Ativo-Antigo"},
    {sigla:"002" , descricao:"Ativo-Novo"},
    {sigla:"003" , descricao:"CC-Antigo"},
    {sigla:"004" , descricao:"CC-Novo"},
    {sigla:"005" , descricao:"Grupo"},
    {sigla:"006" , descricao:"Descrição"},
    {sigla:"007" , descricao:"Observação"},
    {sigla:"008" , descricao:"Data Lançamento"}
  ];


  parametro:  ParametroModel = new ParametroModel();

  enable_filter:boolean = true;

  constructor(
    private formBuilder: FormBuilder,
    private globalService: GlobalService,
    private localStorageService: LocalStorageService,
    private grupoService: GrupoService,
    private parametrosService:ParametrosService,
    private centrocustoService: CentrocustoService,
    private lancamentoService:LancamentoService,
    private principalService:PrincipalService,
    private emailService:EmailService,
    private appSnackBar: AppSnackbar,
    private EmailDialog: MatDialog,
    private DownLoadDialog: MatDialog,
    private searchDialogService:SeachDialogService
    ) {
      this.parametros = formBuilder.group({
        hoje:[{ value: '' }],
        cleardate:[{ value: '' }],
        dtinicial: [{ value: '' }],
        dtfinal: [{ value: '' }],
        orderby: [{ value: '' }],
        cc_descricao: [{ value: '' }],
        ccnovo_descricao: [{ value: '' }],
        grupos: [{ value: '' }],
        situacoes: [{ value: '' }],
        origem: [{ value: '' }],
        executor: [{ value: '' }],
        codigo: [{ value: '' }],
        novo: [{ value: '' }],
        id_principal: [{ value: '' }],
        condicao: [{ value: '' }],
        book: [{ value: '' }],
        descricao: [{ value: '' }],
        observacao: [{ value: '' }],
        chaves: formBuilder.group({
          cc:[{ value: '' }],
          cc_novo: [{ value: '' }],
        })

      });
    this.situacoesInventario = this.globalService.getSituacoesInventario();
    this.situacoesInventarioPar =
    this.globalService.getSituacoesInventarioPar();
    this.condicoes = this.globalService.getCondicoes();
    const todos: SimNao = new SimNao();
    todos.sigla = '';
    todos.descricao = 'Todos';
    const sim: SimNao = new SimNao();
    sim.sigla = 'S';
    sim.descricao = 'SIM';
    const nao: SimNao = new SimNao();
    nao.sigla = 'N';
    nao.descricao = 'NÃO';
    this.respostas.push(todos);
    this.respostas.push(sim);
    this.respostas.push(nao);
    this.Origens.push(new Origem('', 'Todas'));
    this.Origens = [...this.Origens, ...this.globalService.getOrigens()];
    this.setHide();
    this.setValuesNoParam();
    this.getExecutores();
    this.getGrupos();
    }

  ngOnInit(): void {
    var param = this.localStorageService.getParametroModel(this.paramName);

    this.parametros.get("dtinicial")?.valueChanges.pipe(
      map(value => value.trim()),
      filter(value => value.length >= 10 ),
      debounceTime(350),
      distinctUntilChanged(),
     ).subscribe((_) => this.onChangeParametros());

     this.parametros.get("dtfinal")?.valueChanges.pipe(
      map(value => value.trim()),
      filter(value => value.length >= 10),
      debounceTime(350),
      distinctUntilChanged(),
     ).subscribe((_) => this.onChangeParametros());

     this.parametros.get("codigo")?.valueChanges.pipe(
      map(value => value.trim()),
      filter(value => value.length > 0),
      debounceTime(350),
      distinctUntilChanged(),
     ).subscribe((_) => this.onChangeParametros());

     this.parametros.get("cc_descricao")?.valueChanges.pipe(
      map(value => value.trim()),
      filter(value => value.length > 0),
      debounceTime(350),
      distinctUntilChanged(),
     ).subscribe((_) => this.onChangeParametros());

     this.parametros.get("ccnovo_descricao")?.valueChanges.pipe(
      map(value => value.trim()),
      filter(value => value.length > 0),
      debounceTime(350),
      distinctUntilChanged(),
     ).subscribe((_) => this.onChangeParametros());

     this.parametros.get("novo")?.valueChanges.pipe(
      map(value => value.trim()),
      filter(value => value.length > 0),
      debounceTime(350),
      distinctUntilChanged(),
     ).subscribe((_) => this.onChangeParametros());

     this.parametros.get("descricao")?.valueChanges.pipe(
      map(value => value.trim().toUpperCase()),
      filter(value => value.length > 0),
      debounceTime(350),
      distinctUntilChanged(),
     ).subscribe((value:string) => {
      this.onChangeParametros();
     });
     this.parametros.get("observacao")?.valueChanges.pipe(
      map(value => value.trim().toUpperCase()),
      filter(value => value.length > 0),
      debounceTime(350),
      distinctUntilChanged(),
     ).subscribe((value) => {
      this.onChangeParametros()
    });

  }


  ngOnDestroy(): void {
    this.inscricaoGetGrupo?.unsubscribe();
    this.inscricaoParametro?.unsubscribe();
    this.inscricaoExecutores?.unsubscribe();
    this.inscricaoExcel?.unsubscribe();
    this.inscricaoEmail?.unsubscribe();
    this.inscricaoPrincipais?.unsubscribe();
  }


  getExecutores() {
    let par = new ParametroLancamentoUsuario();

    par.id_empresa = this.globalService.getEmpresa().id;
    par.id_filial = this.globalService.getLocal().id;
    par.id_inventario = this.globalService.getInventario().codigo;

    this.globalService.setSpin(true);
    this.inscricaoExecutores = this.lancamentoService
      .resumolancamentos(par)
      .subscribe(
        (data: ResumoLancamentosUsuariosModel[]) => {
          this.globalService.setSpin(false);
          const semFiltro = new ResumoLancamentosUsuariosModel();
          semFiltro.id_usuario = 0;
          semFiltro.razao = 'Todos';
          this.executores.push(semFiltro);
          this.executores = [...this.executores, ...data];
        },
        (error: any) => {
          this.globalService.setSpin(false);
          const semFiltro = new ResumoLancamentosUsuariosModel();
          semFiltro.id_usuario = 0;
          semFiltro.razao = 'Todos';
          this.executores.push(semFiltro);
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
          this.getPrincipais();
        },
        (error: any) => {
          this.globalService.setSpin(false);
          this.grupos = [];
          this.setValues();
          this.appSnackBar.openFailureSnackBar(
            `Pesquisa Nos Grupos ${messageError(error)}`,
            'OK'
          );
        }
      );
  }

  getPrincipais(){

    let par = new ParametroPrincipal01()

    par.id_empresa = this.globalService.getIdEmpresa();

    par.id_filial = this.globalService.getLocal().id;

    par.orderby = 'Descrição';

    this.globalService.setSpin(true);
    this.inscricaoPrincipais = this.principalService
      .getPrincipaisParametro_01(par)
      .subscribe(
        (data: PrincipalModel[]) => {
          this.globalService.setSpin(false);
          const semFiltro: PrincipalModel = new PrincipalModel();
          semFiltro.codigo = 0;
          semFiltro.descricao = 'Todos';
          this.principais = [];
          this.principais.push(semFiltro);
          this.principais = [...this.principais, ...data];
          this.loadParametros();
        },
        (error: any) => {
          this.globalService.setSpin(false);
          const semFiltro: PrincipalModel = new PrincipalModel();
          semFiltro.codigo = 0;
          semFiltro.descricao = 'Todos';
          this.principais = [];
          this.principais.push(semFiltro);
          this.loadParametros();
        }
      );
  }


  onGetExcelToEmailOrDownLoad(destino:string) {

    if (destino.toUpperCase() == "E-MAIL"){
      this.openEmailDialog();
    } else {
      this.openDownLoadDialog();
    }
  }

  sendMail(fileName:string) {

    let par = new ParametroSendemailv2();

    par.id_empresa = this.globalService.getIdEmpresa();

    par.id_filial = this.globalService.getLocal().id;

    par.id_inventario = this.globalService.getInventario().codigo;

    par.assunto = "Relatório Dos Ativos Do Inventário";

    par.destinatario =  this.globalService.usuario.email;

    par.mensagem     = "Mensagem enviada automaticamento por solicitação do usuário. Favor Verificar Anexo."

    par.fileName = fileName;

    this.globalService.setSpin(true);

    this.inscricaoEmail = this.emailService
      .sendEmailV2(par)
      .subscribe(
        (data: any) => {
          this.globalService.setSpin(false);
          this.appSnackBar.openSuccessSnackBar(
            `E-Mail Enviado Com Sucesso!`,
            'OK'
          );
        },
        (error: any) => {
          this.globalService.setSpin(false);
          this.appSnackBar.openFailureSnackBar(
            `Pesquisa Nos Produtos De Inventário ${messageError(error)}`,
            'OK'
          );
        }
      );
  }

  setValues() {
    this.enable_filter = false;
    this.parametros.setValue({
      hoje:false,
      cleardate:false,
      dtinicial:GetValueJsonString(this.parametro.getParametro(), 'dtinicial'),
      dtfinal:GetValueJsonString(this.parametro.getParametro(), 'dtfinal'),
      orderby:GetValueJsonString(this.parametro.getParametro(), 'orderby'),
      cc_descricao: GetValueJsonString(this.parametro.getParametro(), 'cc_descricao'),
      ccnovo_descricao: GetValueJsonString(this.parametro.getParametro(), 'ccnovo_descricao'),
      grupos: GetValueJsonNumber(this.parametro.getParametro(), 'grupo'),
      situacoes: GetValueJsonString(this.parametro.getParametro(), 'situacao'),
      codigo: GetValueJsonNumber(this.parametro.getParametro(), 'codigo')?.toString(),
      id_principal: GetValueJsonNumber(this.parametro.getParametro(), 'id_principal')?.toString(),
      novo: GetValueJsonNumber(this.parametro.getParametro(), 'novo')?.toString(),
      origem: GetValueJsonString(this.parametro.getParametro(), 'origem'),
      executor: GetValueJsonNumber(this.parametro.getParametro(), 'executor'),
      condicao: GetValueJsonNumber(this.parametro.getParametro(), 'condicao'),
      book: GetValueJsonString(this.parametro.getParametro(), 'book'),
      descricao: GetValueJsonString(this.parametro.getParametro(), 'descricao'),
      observacao: GetValueJsonString(
        this.parametro.getParametro(),
        'observacao'
      ),
      chaves:{
        "cc": GetValueJsonString(this.parametro.getParametro(), 'cc'),
        "cc_novo": GetValueJsonString(this.parametro.getParametro(), 'cc_novo'),
      }
    });
    this.enable_filter = true;
  }

  setValuesNoParam() {
    this.enable_filter = false;
    this.parametros.setValue({
      hoje:false,
      cleardate:false,
      dtinicial:'',
      dtfinal:'',
      orderby:'001',
      grupos: 0,
      situacoes: -1,
      codigo: '',
      novo: '',
      id_principal: 0,
      origem: '',
      executor: 0,
      condicao: '0',
      book: '',
      descricao: '',
      observacao: '',
      cc_descricao: 'Todos',
      ccnovo_descricao: 'Todos Não Alterados',
      chaves:{
        "cc": "" ,
        "cc_novo": ""
      }
    });
    this.enable_filter = true;
  }

  setHide(){
    this.hide = !this.hide;
    this.hideAcao = this.hide ? "Mostrar" : "Ocultar";
  }

  loadParametros() {
    this.parametro = new ParametroModel();
    this.parametro.id_empresa = this.globalService.getIdEmpresa();
    this.parametro.modulo = this.paramName;
    this.parametro.assinatura = 'V1.00 22/11/2024';
    this.parametro.id_usuario = this.globalService.usuario.id;
    this.parametro.parametro = `
       {
         "dtinicial":"",
         "dtfinal":"",
         "cc": "",
         "cc_novo":"",
         "grupo":0,
         "situacao":-1,
         "codigo":0,
         "novo":0,
         "origem":"",
         "executor":0,
         "condicao":0,
         "book":"",
         "descricao": "",
         "observacao": "",
         "dtinicial":"",
         "dtfinal":"",
         "id_principal":0,
         "cc_descricao":"Todos",
         "ccnovo_descricao":"Todos Não Alterados",
         "orderby":"001",
         "page": 1,
         "new": false,
         "id_retorno":0
       }`;
       const param = this.localStorageService.getParametroModel(this.paramName);

       if (param !== null){
           this.parametro.load(param);
           this.setValues();
       } else {
          this.getParametro();
      }
  }

  getParametro() {
    this.globalService.setSpin(true);
    let par = new ParametroParametro01();
    par.id_empresa = this.parametro.id_empresa;
    par.modulo = this.parametro.modulo;
    par.assinatura = this.parametro.assinatura;
    par.id_usuario = this.parametro.id_usuario;
    par.orderby = 'Usuário';
    this.inscricaoParametro = this.parametrosService
      .getParametrosParametro01(par)
      .subscribe(
        (data: ParametroModel[]) => {
          this.globalService.setSpin(false);
          this.parametro = new ParametroModel();
          this.parametro.id_empresa  = data[0].id_empresa;
          this.parametro.modulo      = data[0].modulo;
          this.parametro.id_usuario  = data[0].id_usuario;
          this.parametro.assinatura  = data[0].assinatura;
          this.parametro.parametro   = data[0].parametro;
          this.parametro.user_insert = data[0].user_insert;
          this.parametro.user_update = data[0].user_update;
          this.setValues();
          this.onChangeParametros(false);
        },
        (error: any) => {
          this.globalService.setSpin(false);
          this.setValuesNoParam()
          this.onChangeParametros();
        }
      );
  }

  updateParametros() {
    this.globalService.setSpin(true);
    this.parametro.user_insert = this.globalService.usuario.id;
    this.parametro.user_update = this.globalService.usuario.id;
    this.refreshParametro();
    this.inscricaoParametro = this.parametrosService
      .ParametroAtualiza(this.parametro)
      .subscribe(
        (data: ParametroModel) => {
          this.globalService.setSpin(false);
          this.appSnackBar.openSuccessSnackBar(`Parâmetros Atualizados`, 'OK');
        },
        (error: any) => {
          this.globalService.setSpin(false);
          this.appSnackBar.openFailureSnackBar(
            `Gravação Dos Parametros ${messageError(error)}`,
            'OK'
          );
        }
      );
  }

  refreshParametro(start: boolean = true){
    let config                         = this.parametro.getParametro();
    Object(config).cc                  = this.parametros.get("chaves.cc")?.value;
    Object(config).cc_descricao        = this.parametros.value.cc_descricao;
    Object(config).cc_novo             = this.parametros.get("chaves.cc_novo")?.value;
    Object(config).ccnovo_descricao    = this.parametros.value.ccnovo_descricao;
    Object(config).grupo      = this.parametros.value.grupos;
    Object(config).situacao   = this.parametros.value.situacoes;
    Object(config).codigo     = this.parametros.value.codigo;
    Object(config).novo       = this.parametros.value.novo;
    Object(config).origem     = this.parametros.value.origem;
    Object(config).executor   = this.parametros.value.executor;
    Object(config).condicao   = this.parametros.value.condicao;
    Object(config).book       = this.parametros.value.book;
    Object(config).descricao  = this.parametros.value.descricao.toUpperCase();
    Object(config).observacao = this.parametros.value.observacao.toUpperCase();
    Object(config).dtinicial  = this.parametros.value.dtinicial;
    Object(config).dtfinal    = this.parametros.value.dtfinal;
    Object(config).id_principal  = this.parametros.value.id_principal;
    Object(config).orderby       = this.parametros.value.orderby;

    this.parametro.parametro  = JSON.stringify(config);
  }

  onChangeParametros(start: boolean = true){
    this.refreshParametro(start);
    if (this.enable_filter){
       this.change.emit(this.parametro);
    }
  }

  onSaveConfig(){
    this.updateParametros();
  }

  onHide(){
    this.setHide();
    this.changeHide.emit(this.hide)
  }

  onPesquisaCC(){
    this.searchDialogService.openSearchDialog(CadastroEnum.CC)
    .beforeClosed()
    .subscribe((data: SeachDialogData) => {

      if (data){
        if (data.retornoTodos){
            this.parametros.patchValue({
              cc_descricao: "Todos",
              chaves:{
                cc : ""
              }
            })
            return;
        }
        if (!data.cancelar){
            this.parametros.patchValue({
              cc_descricao: `${data.retorno.codigo.replace("#","-")}-${data.retorno.descricao}`,
              chaves:{
                cc: data.retorno.codigo
              }
            })
        }

      }
    });

  }

  onPesquisaCCNovo(){
    this.searchDialogService.openSearchDialog(CadastroEnum.CC)
    .beforeClosed()
    .subscribe((data: SeachDialogData) => {

      if (data){
        if (data.retornoTodos){
            this.parametros.patchValue({
              ccnovo_descricao: "Todos",
              chaves:{
                cc_novo : ""
              }
            })
            return;
        }
        if (!data.cancelar){
            this.parametros.patchValue({
              ccnovo_descricao: `${data.retorno.codigo.replace("#","-")}-${data.retorno.descricao}`,
              chaves:{
                cc_novo: data.retorno.codigo
              }
            })
        }
      }
    });

  }

  hasValue(campo: string): boolean {
      if (this.parametros.get(campo)?.value == "") {
        return false;
      }
      return true;
  }

  clearValue(campo: string){
    if (campo == 'cc_descricao'){
        this.parametros.patchValue({
          cc_descricao: "Todos",
          chaves:{
            cc : ""
          }
        })
    }
    if (campo == 'ccnovo_descricao'){
      this.parametros.patchValue({
          ccnovo_descricao: "Todos",
          chaves:{
          cc_novo : ""
          }
      })
    }
    if (campo == 'descricao')
    this.parametros.patchValue({
      descricao: ''
    })
    if (campo == 'observacao')
      this.parametros.patchValue({
        observacao: ''
    })
    if (campo == 'codigo')
      this.parametros.patchValue({
        codigo: ''
    })
    if (campo == 'novo')
      this.parametros.patchValue({
        novo: ''
    })

    if (campo == 'id_principal')
      this.parametros.patchValue({
        id_principal: ''
    })
    this.onChangeParametros();
}

ChangeValue(campo: string, value:string){
  if (campo == 'descricao')
  this.parametros.patchValue({
    descricao: value
  })
  if (campo == 'observacao')
    this.parametros.patchValue({
      observacao: value
  })
}


openEmailDialog(): void {
  const data: EmailDialogData = new EmailDialogData();
  data.titulo       = "ENVIAR CONSULTA VIA E-MAIL";
  data.destinatario = this.globalService.usuario.email;
  data.escopo       = "T";
  data.labelBottomNao = "Cancelar";
  data.labelBottonSim = "Processar";
  data.id_empresa     = this.globalService.empresa.id;
  data.id_filial      = this.globalService.local.id;
  data.id_inventario  = this.globalService.inventario.codigo;
  data.pagina          = this.controle_paginas.getPaginalAtual();
  data.parametro       = this.parametro;

  const dialogConfig = new MatDialogConfig();

  dialogConfig.disableClose = true;
  dialogConfig.id     = 'consulta-email';
  dialogConfig.width  = '800px';
  dialogConfig.data = data;
  const modalDialog = this.EmailDialog.open(
    EmailDialogComponent,
    dialogConfig
  )
    .beforeClosed()
    .subscribe((data: EmailDialogData) => {
    });
}


openDownLoadDialog(): void {

  console.log("Pagina: ", this.controle_paginas.getPaginalAtual());

  const data: DownloadDialogData = new DownloadDialogData();
  data.titulo       = "DOWNLOAD DE CONSULTA";
  data.escopo       = "T";
  data.labelBottomNao = "Cancelar";
  data.labelBottonSim = "Processar";
  data.id_empresa     = this.globalService.empresa.id;
  data.id_filial      = this.globalService.local.id;
  data.id_inventario  = this.globalService.inventario.codigo;
  data.pagina          = this.controle_paginas.getPaginalAtual();
  data.parametro       = this.parametro;

  const dialogConfig = new MatDialogConfig();

  dialogConfig.disableClose = true;
  dialogConfig.id     = 'consulta-download';
  dialogConfig.width  = '800px';
  dialogConfig.data = data;
  const modalDialog = this.DownLoadDialog.open(
    DownloadDialogComponent,
    dialogConfig
  )
    .beforeClosed()
    .subscribe((data: DownloadDialogData) => {
    });
}


NoValidtouchedOrDirty(campo: string): boolean {
  if (
    !this.parametros.get(campo)?.valid &&
    (this.parametros.get(campo)?.touched || this.parametros.get(campo)?.dirty)
  ) {
    return true;
  }
  return false;
}

getMensafield(field: string): string {
  return this.parametros.get(field)?.errors?.message;
}


onHoje(event:MatCheckboxChange){

  if (event.checked){
    let hoje:string = new Date(Date.now()).toLocaleString().split(',')[0];
    this.parametros.patchValue({
      dtinicial:hoje ,
      dtfinal:hoje,
      hoje:false
    })
    this.onChangeParametros();
  }


}

onLimpar(event:MatCheckboxChange){
  if (event.checked){
    this.parametros.patchValue({
      dtinicial: '',
      dtfinal:'',
      cleardate:false
    })
  }
  this.onChangeParametros();
}

}

