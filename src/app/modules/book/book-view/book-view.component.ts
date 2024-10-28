import { CentrocustoService } from 'src/app/services/centrocusto.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CentrocustoModel } from 'src/app/models/centrocusto-model';
import { GrupoModel } from 'src/app/models/grupo-model';
import { ParametroCentrocusto01 } from 'src/app/parametros/parametro-centrocusto01';
import { ParametroGrupo01 } from 'src/app/parametros/parametro-grupo01';
import { GlobalService } from 'src/app/services/global.service';
import { GrupoService } from 'src/app/services/grupo.service';
import { AppSnackbar } from 'src/app/shared/classes/app-snackbar';
import { ControlePaginas } from 'src/app/shared/classes/controle-paginas';
import { SituacaoInventario } from 'src/app/shared/classes/situacao-inventario';
import {
  GetValueJsonBoolean,
  GetValueJsonNumber,
  GetValueJsonString,
  MensagensBotoes,
  messageError,
} from 'src/app/shared/classes/util';
import { Condicoes } from 'src/app/shared/classes/condicoes';
import { SimNao } from 'src/app/shared/classes/sim-nao';
import { ParametroModel } from 'src/app/models/parametro-model';
import { ParametroParametro01 } from 'src/app/parametros/parametro-parametro01';
import { ParametrosService } from 'src/app/services/parametros.service';
import { ImobilizadoinventarioModel } from 'src/app/models/imobilizadoinventario-model';
import { ParametroImobilizadoinventario01 } from 'src/app/parametros/parametro-imobilizadoinventario01';
import { ImobilizadoinventarioService } from 'src/app/services/imobilizadoinventario.service';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { ParametroLancamentoUsuario } from 'src/app/parametros/parametros-lancamento-usuarios';
import { LancamentoService } from 'src/app/services/lancamento.service';
import { ResumoLancamentosUsuariosModel } from 'src/app/models/resumo-lancamentos-usuario-model';
import { Origem } from 'src/app/shared/classes/Origem';

@Component({
  selector: 'app-book-view',
  templateUrl: './book-view.component.html',
  styleUrls: ['./book-view.component.css'],
})
export class BookViewComponent implements OnInit {
  @ViewChild(CdkVirtualScrollViewport) viewPort!: CdkVirtualScrollViewport;

  situacoesInventario: SituacaoInventario[] = [];

  parametros: FormGroup;

  imoinv: ImobilizadoinventarioModel[] = [];

  grupos: GrupoModel[] = [];

  ccs: CentrocustoModel[] = [];

  ccs_alterados: CentrocustoModel[] = [];

  condicoes: Condicoes[] = [];

  respostas: SimNao[] = [];

  tamPagina = 50;

  parametro: ParametroModel = new ParametroModel();

  controlePaginas: ControlePaginas = new ControlePaginas(
    this.tamPagina,
    this.tamPagina
  );

  retorno: boolean = false;

  inscricaoGetAll!: Subscription;
  inscricaoGetGrupo!: Subscription;
  inscricaoGetCc!: Subscription;
  inscricaoParametro!: Subscription;
  inscricaoExecutores!: Subscription;

  showFiltro: boolean = true;

  executores: ResumoLancamentosUsuariosModel[] = [];

  Origens: Origem[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private globalService: GlobalService,
    private grupoService: GrupoService,
    private centrocustoService: CentrocustoService,
    private parametrosService: ParametrosService,
    private imoInventarioService: ImobilizadoinventarioService,
    private lancamentoService: LancamentoService,
    private router: Router,
    private appSnackBar: AppSnackbar,
    private route: ActivatedRoute
  ) {
    this.parametros = formBuilder.group({
      ccs: [{ value: '' }],
      cc_novo: [{ value: '' }],
      grupos: [{ value: '' }],
      situacoes: [{ value: '' }],
      origem: [{ value: '' }],
      executor: [{ value: '' }],
      codigo: [{ value: '' }],
      novo: [{ value: '' }],
      condicao: [{ value: '' }],
      descricao: [{ value: '' }],
    });

    const semFiltro: SituacaoInventario = new SituacaoInventario();
    semFiltro.id = -1;
    semFiltro.descricao = 'Todas';
    this.situacoesInventario.push(semFiltro);
    this.situacoesInventario = [
      ...this.situacoesInventario,
      ...this.globalService.getSituacoesInventario(),
    ];

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
    this.getExecutores();
    this.setValuesNoParam();
    this.getCentroCustos();
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.inscricaoGetAll?.unsubscribe();
    this.inscricaoGetGrupo?.unsubscribe();
    this.inscricaoGetCc?.unsubscribe();
    this.inscricaoParametro?.unsubscribe();
    this.inscricaoExecutores.unsubscribe();
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
          this.loadParametros();
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

  getImoIven() {
    let par = new ParametroImobilizadoinventario01();

    par.id_empresa = this.globalService.getIdEmpresa();

    par.id_filial = this.globalService.getLocal().id;

    par.id_inventario = this.globalService.getInventario().codigo;

    if (this.parametros.value.cc !== '') {
      par.id_cc = this.parametros.value.ccs;
    }
    if (this.parametros.value.cc_novo !== '') {
      par.new_cc = this.parametros.value.cc_novo;
    }

    let key = parseInt(this.parametros.value.grupos, 10);

    if (isNaN(key)) {
      par.id_grupo = 0;
    } else {
      par.id_grupo = key;
    }

    key = parseInt(this.parametros.value.situacoes, 10);

    if (isNaN(key)) {
      par.status = 0;
    } else {
      par.status = key;
    }

    key = parseInt(this.parametros.value.codigo, 10);

    if (isNaN(key)) {
      par.id_imobilizado = 0;
    } else {
      par.id_imobilizado = key;
    }

    key = parseInt(this.parametros.value.novo, 10);

    if (isNaN(key)) {
      par.new_codigo = 0;
    } else {
      par.new_codigo = key;
    }

    key = parseInt(this.parametros.value.condicao, 10);

    if (isNaN(key)) {
      par.condicao = 0;
    } else {
      par.condicao = key;
    }

    par.book = 'S';

    if (this.parametros.value.descricao.trim() !== '') {
      par.descricao = this.parametros.value.descricao;
    }

    key = parseInt(this.parametros.value.executor, 10);

    if (isNaN(key)) {
      par.id_usuario = 0;
    } else {
      par.id_usuario = key;
    }

    if (this.parametros.value.origem.trim() !== '') {
      par.origem = this.parametros.value.origem;
    }

    par.contador = 'N';

    par.tamPagina = this.tamPagina;

    par.pagina = this.controlePaginas.getPaginalAtual();

    par.orderby = 'Imobilizado';

    this.globalService.setSpin(true);
    this.inscricaoGetAll = this.imoInventarioService
      .getImobilizadosinventariosParametro_01(par)
      .subscribe(
        (data: ImobilizadoinventarioModel[]) => {
          this.globalService.setSpin(false);
          this.imoinv = data;
          const idx = this.imoinv.findIndex(
            (inv) =>
              inv.id_imobilizado ==
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

    if (this.parametros.value.cc !== '') {
      par.id_cc = this.parametros.value.ccs;
    }
    if (this.parametros.value.cc_novo !== '') {
      par.new_cc = this.parametros.value.cc_novo;
    }

    let key = parseInt(this.parametros.value.grupos, 10);

    if (isNaN(key)) {
      par.id_grupo = 0;
    } else {
      par.id_grupo = key;
    }

    key = parseInt(this.parametros.value.situacoes, 10);

    if (isNaN(key)) {
      par.status = 0;
    } else {
      par.status = key;
    }

    key = parseInt(this.parametros.value.codigo, 10);

    if (isNaN(key)) {
      par.id_imobilizado = 0;
    } else {
      par.id_imobilizado = key;
    }

    key = parseInt(this.parametros.value.novo, 10);

    if (isNaN(key)) {
      par.new_codigo = 0;
    } else {
      par.new_codigo = key;
    }

    key = parseInt(this.parametros.value.condicao, 10);

    if (isNaN(key)) {
      par.condicao = 0;
    } else {
      par.condicao = key;
    }

    par.book = 'S';

    if (this.parametros.value.descricao.trim() !== '') {
      par.descricao = this.parametros.value.descricao;
    }

    key = parseInt(this.parametros.value.executor, 10);

    if (isNaN(key)) {
      par.id_usuario = 0;
    } else {
      par.id_usuario = key;
    }

    if (this.parametros.value.origem.trim() !== '') {
      par.origem = this.parametros.value.origem;
    }

    par.contador = 'S';

    par.tamPagina = this.tamPagina;

    par.orderby = 'Imobilizado';

    this.globalService.setSpin(true);
    this.inscricaoGetAll = this.imoInventarioService
      .getImobilizadosinventariosParametro_01(par)
      .subscribe(
        (data: any) => {
          this.globalService.setSpin(false);
          this.controlePaginas = new ControlePaginas(
            this.tamPagina,
            data.total == 0 ? 1 : data.total
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
          this.getImoIven();
        },
        (error: any) => {
          this.globalService.setSpin(false);
          this.imoinv = [];
          this.controlePaginas = new ControlePaginas(this.tamPagina, 1);
          this.appSnackBar.openFailureSnackBar(
            `Pesquisa Nos Produtos De Inventário ${messageError(error)}`,
            'OK'
          );
        }
      );
  }

  getTexto() {
    return MensagensBotoes;
  }

  setValues() {
    this.parametros.setValue({
      ccs: GetValueJsonString(this.parametro.getParametro(), 'cc'),
      cc_novo: GetValueJsonString(this.parametro.getParametro(), 'cc_novo'),
      grupos: GetValueJsonNumber(this.parametro.getParametro(), 'grupo'),
      situacoes: GetValueJsonString(this.parametro.getParametro(), 'situacao'),
      codigo: GetValueJsonNumber(this.parametro.getParametro(), 'codigo'),
      novo: GetValueJsonNumber(this.parametro.getParametro(), 'novo'),
      origem: GetValueJsonString(this.parametro.getParametro(), 'origem'),
      executor: GetValueJsonNumber(this.parametro.getParametro(), 'executor'),
      condicao: GetValueJsonNumber(this.parametro.getParametro(), 'condicao'),
      descricao: GetValueJsonString(this.parametro.getParametro(), 'descricao'),
    });
  }

  setValuesNoParam() {
    this.parametros.setValue({
      ccs: '',
      cc_novo: '',
      grupos: 0,
      situacoes: 0,
      codigo: '',
      novo: '',
      origem: '',
      executor: 0,
      condicao: '0',
      descricao: '',
    });
  }

  onChangePage() {
    this.getImoIven();
  }

  onChangeParametros() {
    this.getImoIvenContador();
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
    this.parametro.modulo = 'parambook';
    this.parametro.assinatura = 'V1.00 08/07/2024';
    this.parametro.id_usuario = this.globalService.usuario.id;
    this.parametro.parametro = `
       {
         "cc": "",
         "cc_novo":"",
         "grupo":0,
         "situacao":-1,
         "codigo":0,
         "novo":0,
         "origem":"",
         "executor":0,
         "condicao":0,
         "book":"S",
         "descricao": "",
         "page": 1,
         "new": false,
         "id_retorno":0
       }`;
    if (this.retorno && this.globalService.estadoFind('parambook') !== null) {
      const par = this.globalService.estadoFind('parambook');
      if (par != null) {
        if (GetValueJsonBoolean(par.getParametro(), 'new')) {
          let config = this.parametro.getParametro();
          Object(config).id_retorno = GetValueJsonNumber(
            par.getParametro(),
            'id_retorno'
          );
          this.parametro.parametro = JSON.stringify(config);
          //this.setPosicaoInclusao();
        } else {
          this.controlePaginas.setPaginaAtual(
            GetValueJsonNumber(par.getParametro(), 'page')
          );
          this.parametro.setParametro(par.getParametro());
        }
        this.globalService.estadoDelete(par);
        this.setValues();
        this.getImoIvenContador();
      }
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
          this.parametro.id_empresa = data[0].id_empresa;
          this.parametro.modulo = data[0].modulo;
          this.parametro.id_usuario = data[0].id_usuario;
          this.parametro.assinatura = data[0].assinatura;
          this.parametro.parametro = data[0].parametro;
          this.parametro.user_insert = data[0].user_insert;
          this.parametro.user_update = data[0].user_update;
          this.setValues();
          this.getImoIvenContador();
        },
        (error: any) => {
          this.globalService.setSpin(false);
          this.setValues();
          this.getImoIvenContador();
        }
      );
  }

  updateParametros() {
    this.globalService.setSpin(true);
    this.parametro.user_insert = this.globalService.usuario.id;
    this.parametro.user_update = this.globalService.usuario.id;
    let config = this.parametro.getParametro();
    let key = parseInt(this.parametros.value.codigo, 10);
    if (isNaN(key)) {
      Object(config).codigo = 0;
    } else {
      Object(config).codigo = key;
    }
    Object(config).cc = this.parametros.value.ccs;
    Object(config).cc_novo = this.parametros.value.cc_novo;
    Object(config).grupo = this.parametros.value.grupos;
    Object(config).situacao = this.parametros.value.situacoes;
    Object(config).codigo = this.parametros.value.codigo;
    Object(config).novo = this.parametros.value.novo;
    Object(config).origem = this.parametros.value.origem;
    Object(config).executor = this.parametros.value.executor;
    Object(config).condicao = this.parametros.value.condicao;
    Object(config).book = 'S';
    Object(config).descricao = this.parametros.value.descricao;
    Object(config).page = 0;
    Object(config).new = false;
    this.parametro.parametro = JSON.stringify(config);
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

  onFiltro() {
    this.showFiltro = !this.showFiltro;
  }

  getLabelFiltro(): String {
    return this.showFiltro ? 'Ocultar Filtro' : 'Mostra Filtro';
  }
}
