import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ControlePaginas } from '../../classes/controle-paginas';
import { FormBuilder, FormGroup } from '@angular/forms';
import { GrupoModel } from 'src/app/models/grupo-model';
import { CentrocustoModel } from 'src/app/models/centrocusto-model';
import { Condicoes } from '../../classes/condicoes';
import { SimNao } from '../../classes/sim-nao';
import { SituacaoInventario } from '../../classes/situacao-inventario';
import { Origem } from '../../classes/Origem';
import { UsuarioModel } from 'src/app/models/usuario-model';
import { LancamentoModel } from 'src/app/models/lancamento-model';
import { ResumoLancamentosUsuariosModel } from 'src/app/models/resumo-lancamentos-usuario-model';
import { Orderby } from '../../classes/orderby';
import { ParametroModel } from 'src/app/models/parametro-model';
import { GlobalService } from 'src/app/services/global.service';
import { LocalStorageService } from 'src/app/services/localStorage.service';
import { GrupoService } from 'src/app/services/grupo.service';
import { ParametrosService } from 'src/app/services/parametros.service';
import { CentrocustoService } from 'src/app/services/centrocusto.service';
import { LancamentoService } from 'src/app/services/lancamento.service';
import { EmailService } from 'src/app/services/email.service';
import { AppSnackbar } from '../../classes/app-snackbar';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { DownloadDialogComponent } from '../download-dialog/download-dialog.component';
import { DownloadDialogData } from '../download-dialog/download-dialog-data';
import { EmailDialogComponent } from '../email-dialog/email-dialog.component';
import { EmailDialogData } from '../email-dialog/email-dialog-data';
import { GetValueJsonNumber, GetValueJsonString, messageError } from '../../classes/util';
import { ParametroParametro01 } from 'src/app/parametros/parametro-parametro01';
import { ParametroGrupo01 } from 'src/app/parametros/parametro-grupo01';
import { ParametroSendemailv2 } from 'src/app/parametros/parametro-sendemailv2';
import { ParametroCentrocusto01 } from 'src/app/parametros/parametro-centrocusto01';
import { ParametroLancamentoUsuario } from 'src/app/parametros/parametros-lancamento-usuarios';
import { Observable, Subscription } from 'rxjs';
import { map,filter,tap,take, distinctUntilChanged, debounceTime} from   'rxjs/operators';

@Component({
  selector: 'app-filtro-cadastro-padrao',
  templateUrl: './filtro-cadastro-padrao.component.html',
  styleUrls: ['./filtro-cadastro-padrao.component.css']
})
export class FiltroCadastroPadraoComponent implements OnInit {
  @Input('PARAMNAME') paramName :string = "teste"
  @Input('RETORNO')   retorno:boolean = false;
  @Input('EMAIL')     email:boolean = false;
  @Input('DOWNLOAD')  download:boolean = false;
  @Input('CONTROLE_PAGINAS') controle_paginas:ControlePaginas = new ControlePaginas(50,0);
  @Input('HIDE') hide: boolean = true;
  @Output('changeParametro') change = new EventEmitter<ParametroModel>();
  @Output('changeHide') changeHide = new EventEmitter<boolean>();

  inscricaoParametro!: Subscription;
  inscricaoExcel!: Subscription;
  inscricaoEmail!: Subscription;

  parametros: FormGroup;

  showFiltro: boolean = true;

  executores: ResumoLancamentosUsuariosModel[] = [];

  hideAcao:string = "Ocultar";

  codigo$!:Observable<any>;

  orderby:Orderby[] =  [
    {sigla:"001" , descricao:"Codigo"},
    {sigla:"002" , descricao:"Apelido"},
    {sigla:"003" , descricao:"Descrição"},
  ];


  parametro:  ParametroModel = new ParametroModel();

  enable_filter:boolean = true;


  constructor( private formBuilder: FormBuilder,
    private globalService: GlobalService,
    private localStorageService: LocalStorageService,
    private parametrosService:ParametrosService,
    private emailService:EmailService,
    private appSnackBar: AppSnackbar,
    private EmailDialog: MatDialog,
    private DownLoadDialog: MatDialog,) {
      this.parametros = formBuilder.group({
      orderby: [{ value: '' }],
      codigo: [{ value: '' }],
      apelido: [{ value: '' }],
      descricao: [{ value: '' }],
    });
    this.setHide();
    this.setValuesNoParam();
    }

    ngOnInit(): void {
      var param = this.localStorageService.getParametroModel(this.paramName);

       this.parametros.get("codigo")?.valueChanges.pipe(
        map(value => value.trim()),
        filter(value => value.length > 0),
        debounceTime(350),
        distinctUntilChanged(),
       ).subscribe((_) => this.onChangeParametros());

       this.parametros.get("apelido")?.valueChanges.pipe(
        map(value => value.trim().toUpperCase()),
        filter(value => value.length > 0),
        debounceTime(350),
        distinctUntilChanged(),
       ).subscribe((value:string) => {
        this.onChangeParametros();
       });
       this.parametros.get("descricao")?.valueChanges.pipe(
        map(value => value.trim().toUpperCase()),
        filter(value => value.length > 0),
        debounceTime(350),
        distinctUntilChanged(),
       ).subscribe((value) => {
        this.onChangeParametros()
      });

    }


    ngOnDestroy(): void {
      this.inscricaoParametro?.unsubscribe();
      this.inscricaoExcel?.unsubscribe();
      this.inscricaoEmail?.unsubscribe();
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
        orderby: GetValueJsonString(this.parametro.getParametro(), 'orderby'),
        codigo: GetValueJsonNumber(this.parametro.getParametro(), 'codigo')?.toString(),
        apelido: GetValueJsonString(this.parametro.getParametro(), 'apelido'),
        descricao: GetValueJsonString(
          this.parametro.getParametro(),
          'descricao'
        ),
      });
      this.enable_filter = true;
    }

    setValuesNoParam() {
      this.enable_filter = false;
      this.parametros.setValue({
        orderby:'',
        codigo: '',
        apelido: '',
        descricao: '',
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
      this.parametro.assinatura = 'V1.00 31/10/24 A';
      this.parametro.id_usuario = this.globalService.usuario.id;
      this.parametro.parametro = `
         {
           "codigo":0,
           "apelido": "",
           "descricao": "",
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
      console.log("pesquisa",par);
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
      let config                = this.parametro.getParametro();
      Object(config).codigo     = this.parametros.value.codigo;
      Object(config).apelido    = this.parametros.value.apelido.toUpperCase();
      Object(config).descricao = this.parametros.value.descricao.toUpperCase();
      Object(config).orderby    = this.parametros.value.orderby;

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

    hasValue(campo: string): boolean {
        if (this.parametros.get(campo)?.value == "") {
          return false;
        }
        return true;
    }

    clearValue(campo: string){

      if (campo == 'apelido')
        this.parametros.patchValue({
          apelido: ''
      })

      if (campo == 'descricao')
      this.parametros.patchValue({
        descricao: ''
      })
      this.onChangeParametros();
  }

  ChangeValue(campo: string, value:string){

    if (campo == 'apelido')
      this.parametros.patchValue({
        descricao: value
    })

    if (campo == 'descricao')
    this.parametros.patchValue({
      descricao: value
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
