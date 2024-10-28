import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { ParametroModel } from './../../../models/parametro-model';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { InventarioModel } from 'src/app/models/inventario-model';
import { ParametroInventario01 } from 'src/app/parametros/parametro-inventario01';
import { GlobalService } from 'src/app/services/global.service';
import { InventarioService } from 'src/app/services/inventario.service';
import { AppSnackbar } from 'src/app/shared/classes/app-snackbar';
import { CadastroAcoes } from 'src/app/shared/classes/cadastro-acoes';
import { ControlePaginas } from 'src/app/shared/classes/controle-paginas';
import {
  GetValueJsonBoolean,
  GetValueJsonNumber,
  GetValueJsonString,
  GetValueJsonStringArray,
  MensagensBotoes,
  messageError,
} from 'src/app/shared/classes/util';
import { ParametrosService } from 'src/app/services/parametros.service';
import { ParametroParametro01 } from 'src/app/parametros/parametro-parametro01';

@Component({
  selector: 'app-crud-inventario',
  templateUrl: './crud-inventario.component.html',
  styleUrls: ['./crud-inventario.component.css'],
})
export class CrudInventarioComponent implements OnInit {
  @ViewChild(CdkVirtualScrollViewport) viewPort!: CdkVirtualScrollViewport;
  inscricaoGetAll!: Subscription;
  inscricaoGetFiltro!: Subscription;
  inscricaoGetContador!: Subscription;
  inscricaoParametro!: Subscription;

  inventarios: InventarioModel[] = [];

  parametros: FormGroup;

  erro: string = '';

  opcoesOrdenacao: string[] = [];

  opcoesCampo: string[] = [];

  tamPagina = 50;

  controlePaginas: ControlePaginas = new ControlePaginas(this.tamPagina, 0);

  retorno: boolean = false;

  parametro: ParametroModel = new ParametroModel();
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private appSnackBar: AppSnackbar,
    private globalService: GlobalService,
    private inventarioService: InventarioService,
    private parametroService: ParametrosService
  ) {
    this.parametros = formBuilder.group({
      ordenacao: [null],
      campo: [null],
      filtro: [null],
    });
    this.loadParametros();
  }

  ngOnInit(): void {}

  setValues() {
    this.parametros.setValue({
      ordenacao:
        this.opcoesOrdenacao[
          GetValueJsonNumber(this.parametro.getParametro(), 'op_ordenacao')
        ],
      campo:
        this.opcoesCampo[
          GetValueJsonNumber(this.parametro.getParametro(), 'op_pesquisar')
        ],
      filtro: GetValueJsonString(this.parametro.getParametro(), 'descricao'),
    });
  }

  escolha(opcao: number, inventario?: InventarioModel) {
    if (typeof inventario !== 'undefined') {
      if (opcao == 96) {
        let config = this.parametro.getParametro();
        Object(config).new = false;
        Object(config).id_retorno = inventario.codigo;
        Object(config).page = this.controlePaginas.getPaginalAtual();
        Object(config).op_ordenacao = this.opcoesOrdenacao.findIndex(
          (op) => this.parametros.value.ordenacao == op
        );
        Object(config).op_pesquisar = this.opcoesCampo.findIndex(
          (op) => this.parametros.value.campo == op
        );
        Object(config).descricao = this.parametros.value.filtro;
        this.parametro.parametro = JSON.stringify(config);
        this.globalService.estadoSave(this.parametro);
        this.router.navigate([
          '/inventarios/usuarios',
          this.globalService.getEmpresa().id,
          this.globalService.getLocal().id,
          inventario.codigo,
        ]);
      } else {
        let config = this.parametro.getParametro();
        Object(config).new = false;
        Object(config).id_retorno = inventario.codigo;
        Object(config).page = this.controlePaginas.getPaginalAtual();
        Object(config).op_ordenacao = this.opcoesOrdenacao.findIndex(
          (op) => this.parametros.value.ordenacao == op
        );
        Object(config).op_pesquisar = this.opcoesCampo.findIndex(
          (op) => this.parametros.value.campo == op
        );
        Object(config).descricao = this.parametros.value.filtro;
        this.parametro.parametro = JSON.stringify(config);
        this.globalService.estadoSave(this.parametro);
        this.router.navigate([
          '/inventarios/inventario',
          inventario.id_empresa,
          inventario.id_filial,
          inventario.codigo,
          opcao,
        ]);
      }
    } else {
      let config = this.parametro.getParametro();
      Object(config).new = false;
      Object(config).id_retorno = 0;
      Object(config).page = this.controlePaginas.getPaginalAtual();
      Object(config).op_ordenacao = this.opcoesOrdenacao.findIndex(
        (op) => this.parametros.value.ordenacao == op
      );
      Object(config).op_pesquisar = this.opcoesCampo.findIndex(
        (op) => this.parametros.value.campo == op
      );
      Object(config).descricao = this.parametros.value.filtro;
      this.parametro.parametro = JSON.stringify(config);
      this.globalService.estadoSave(this.parametro);
      this.router.navigate([
        '/inventarios/inventario',
        this.globalService.getEmpresa().id,
        this.globalService.getLocal().id,
        0,
        opcao,
      ]);
    }
  }

  getAcoes() {
    return CadastroAcoes;
  }

  getInventariosContador(): void {
    let par = new ParametroInventario01();

    par.id_empresa = this.globalService.getEmpresa().id;

    if (this.parametros.value.campo == 'Id') {
      let key = parseInt(this.parametros.value.filtro, 10);
      if (isNaN(key)) {
        par.codigo = 0;
      } else {
        par.codigo = key;
      }
    }

    if (this.parametros.value.campo == 'Descrição')
      par.descricao = this.parametros.value.filtro.toUpperCase();

    par.orderby = this.parametros.value.ordenacao;

    par.contador = 'S';

    par.tamPagina = this.tamPagina;

    this.globalService.setSpin(true);

    this.inscricaoGetContador = this.inventarioService
      .getInventariosParametro_01(par)
      .subscribe(
        (data: any) => {
          this.globalService.setSpin(false);
          if (data.total == 0) {
            data.total = 1;
          }
          this.controlePaginas = new ControlePaginas(
            this.tamPagina,
            data.total
          );
          //atualiza com o parametro
          if (this.retorno)
            if (!GetValueJsonBoolean(this.parametro.getParametro(), 'new')) {
              let config = this.parametro.getParametro();
              this.controlePaginas.setPaginaAtual(Object(config)['page']);
            } else {
              //'É inclusao ',
              this.controlePaginas.goLast();
            }
          this.getInventarios();
        },
        (error: any) => {
          console.log('error => ', error);
          this.globalService.setSpin(false);
          this.controlePaginas = new ControlePaginas(this.tamPagina, 0);
          this.appSnackBar.openFailureSnackBar(
            `Pesquisa Nos Inventários Contador  ${messageError(error)}`,
            'OK'
          );
        }
      );
  }

  getInventarios() {
    let par = new ParametroInventario01();

    par.id_empresa = this.globalService.empresa.id;

    if (this.parametros.value.campo == 'Código') {
      let key = parseInt(this.parametros.value.filtro, 10);

      console.log('key', key);

      if (isNaN(key)) {
        par.codigo = 0;
      } else {
        par.codigo = key;
      }
    }
    if (this.parametros.value.campo == 'Descrição')
      par.descricao = this.parametros.value.filtro.toUpperCase();

    par.orderby = this.parametros.value.ordenacao;

    par.contador = 'N';

    par.tamPagina = this.tamPagina;

    par.pagina = this.controlePaginas.getPaginalAtual();

    this.globalService.setSpin(true);

    this.inscricaoGetFiltro = this.inventarioService
      .getInventariosParametro_01(par)
      .subscribe(
        (data: InventarioModel[]) => {
          this.globalService.setSpin(false);
          this.inventarios = data;
          const idx = this.inventarios.findIndex(
            (cli) =>
              cli.codigo ==
              GetValueJsonNumber(this.parametro.getParametro(), 'id_retorno')
          );
          setTimeout(() => this.viewPort.scrollToIndex(idx), 10);
          this.retorno = false;
          let config = this.parametro.getParametro();
          Object(config).id_retorno = 0;
          Object(config).new = false;
          this.parametro.parametro = JSON.stringify(config);
        },
        (error: any) => {
          this.globalService.setSpin(false);
          this.inventarios = [];
          this.appSnackBar.openFailureSnackBar(
            `Pesquisa Nos Inventários  ${messageError(error)}`,
            'OK'
          );
        }
      );
  }

  onChangePage() {
    this.getInventarios();
  }

  getTexto() {
    return MensagensBotoes;
  }

  onHome() {
    this.router.navigate(['']);
  }

  onSaveConfig() {
    this.updateParametros();
  }

  loadParametros() {
    this.parametro = new ParametroModel();
    this.parametro.id_empresa = this.globalService.getIdEmpresa();
    this.parametro.modulo = 'inventario';
    this.parametro.assinatura = 'V1.00 26/08/23';
    this.parametro.id_usuario = this.globalService.usuario.id;
    this.parametro.parametro = `
        {
          "op_ordenacao": 0,
          "ordenacao": ["Código", "Descrição"],
          "op_pesquisar": 1,
          "pesquisar": ["Código", "Descricao"],
          "descricao": "",
          "page": 1,
          "new": false,
          "id_retorno":0
        }`;

    this.opcoesOrdenacao = GetValueJsonStringArray(
      this.parametro.getParametro(),
      'ordenacao'
    );
    this.opcoesCampo = GetValueJsonStringArray(
      this.parametro.getParametro(),
      'pesquisar'
    );
    if (this.retorno && this.globalService.estadoFind('inventario') !== null) {
      const par = this.globalService.estadoFind('inventario');
      if (par != null) {
        if (GetValueJsonBoolean(par.getParametro(), 'new')) {
          let config = this.parametro.getParametro();
          Object(config).id_retorno = GetValueJsonNumber(
            par.getParametro(),
            'id_retorno'
          );
          this.parametro.parametro = JSON.stringify(config);
          this.setPosicaoInclusao();
        } else {
          this.controlePaginas.setPaginaAtual(
            GetValueJsonNumber(par.getParametro(), 'page')
          );
          this.parametro.setParametro(par.getParametro());
        }
        this.globalService.estadoDelete(par);
        this.setValues();
        this.getInventariosContador();
      }
    } else {
      this.getParametro();
    }
  }

  setPosicaoInclusao() {
    const config = this.parametro.getParametro();
    Object(config).op_ordenacao = 0;
    Object(config).op_pesquisar = 0;
    Object(config).descricao = '';
    Object(config).new = true;
    this.parametro.setParametro(config);
  }

  getParametro() {
    this.globalService.setSpin(true);
    let par = new ParametroParametro01();
    par.id_empresa = this.parametro.id_empresa;
    par.modulo = this.parametro.modulo;
    par.assinatura = this.parametro.assinatura;
    par.id_usuario = this.parametro.id_usuario;
    par.orderby = 'Usuário';
    this.inscricaoParametro = this.parametroService
      .getParametrosParametro01(par)
      .subscribe(
        (data: ParametroModel[]) => {
          this.globalService.setSpin(false);
          this.parametro = new ParametroModel();
          this.parametro.id_empresa = data[0].id_empresa;
          this.parametro.modulo = data[0].modulo;
          this.parametro.id_usuario = data[0].id_usuario;
          this.parametro.assinatura = data[0].assinatura;
          this.parametro.parametro = data[0].parametro;
          this.parametro.user_insert = data[0].user_insert;
          this.parametro.user_update = data[0].user_update;
          this.opcoesOrdenacao = GetValueJsonStringArray(
            this.parametro.getParametro(),
            'ordenacao'
          );
          this.opcoesCampo = GetValueJsonStringArray(
            this.parametro.getParametro(),
            'pesquisar'
          );
          this.setValues();
          this.getInventariosContador();
        },
        (error: any) => {
          this.globalService.setSpin(false);
          this.setValues();
          this.getInventariosContador();
        }
      );
  }

  updateParametros() {
    this.globalService.setSpin(true);
    this.parametro.user_insert = this.globalService.usuario.id;
    this.parametro.user_update = this.globalService.usuario.id;
    let config = this.parametro.getParametro();
    Object(config).op_ordenacao = this.opcoesOrdenacao.findIndex(
      (op) => this.parametros.value.ordenacao == op
    );
    Object(config).op_pesquisar = this.opcoesCampo.findIndex(
      (op) => this.parametros.value.campo == op
    );
    Object(config).descricao = this.parametros.value.filtro;
    Object(config).page = 0;
    Object(config).new = false;
    this.parametro.parametro = JSON.stringify(config);
    this.inscricaoParametro = this.parametroService
      .ParametroAtualiza(this.parametro)
      .subscribe(
        (data: ParametroModel) => {
          this.globalService.setSpin(false);
          this.appSnackBar.openWarningnackBar(`Parâmetros Atualizados`, 'OK');
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
}
