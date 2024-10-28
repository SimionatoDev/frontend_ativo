import { GlobalService } from './../../../services/global.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ValidatorStringLen } from 'src/app/shared/Validators/validator-string-len';
import { ValidatorDate } from 'src/app/shared/Validators/validator-date';
import { CadastroAcoes } from 'src/app/shared/classes/cadastro-acoes';
import { AppSnackbar } from 'src/app/shared/classes/app-snackbar';
import { messageError } from 'src/app/shared/classes/util';
import { ImobilizadoService } from 'src/app/services/imobilizado.service';
import { ImobilizadoModel } from 'src/app/models/imobilizado-model';
import { CentrocustoModel } from 'src/app/models/centrocusto-model';
import { GrupoModel } from 'src/app/models/grupo-model';
import { ParametroGrupo01 } from 'src/app/parametros/parametro-grupo01';
import { GrupoService } from 'src/app/services/grupo.service';
import { CentrocustoService } from 'src/app/services/centrocusto.service';
import { ParametroCentrocusto01 } from 'src/app/parametros/parametro-centrocusto01';
import { Condicoes } from 'src/app/shared/classes/condicoes';

@Component({
  selector: 'app-imobilizado-view',
  templateUrl: './imobilizado-view.component.html',
  styleUrls: ['./imobilizado-view.component.css'],
})
export class ImobilizadoViewComponent implements OnInit {
  formulario: FormGroup;

  imobilizado: ImobilizadoModel = new ImobilizadoModel();

  ccs: CentrocustoModel[] = [];

  grupos: GrupoModel[] = [];

  erro: any;

  acao: string = 'Sem Definição';

  idAcao: number = CadastroAcoes.Inclusao;

  readOnly: boolean = true;

  inscricaoRota!: Subscription;
  inscricaoAcao!: Subscription;
  inscricaoGrupo!: Subscription;
  inscricaoCC!: Subscription;

  labelCadastro: string = '';

  lsCondicoes: Condicoes[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private imobilizadoService: ImobilizadoService,
    private grupoService: GrupoService,
    private ccService: CentrocustoService,
    private route: ActivatedRoute,
    private router: Router,
    private appSnackBar: AppSnackbar,
    private globalService: GlobalService
  ) {
    this.formulario = formBuilder.group({
      codigo: [{ value: '' }, [Validators.required, Validators.min(1)]],
      descricao: [{ value: '' }, [ValidatorStringLen(1, 80, true)]],
      grupo: [{ value: '' }],
      grupo_: [{ value: '' }],
      cc: [{ value: '' }],
      cc_: [{ value: '' }],
      condicao: [{ value: '' }],
      condicao_: [{ value: '' }],
      apelido: [{ value: '' }, [ValidatorStringLen(0, 30, false)]],
    });
    this.imobilizado = new ImobilizadoModel();
    this.inscricaoRota = route.params.subscribe((params: any) => {
      this.imobilizado.id_empresa = params.id_empresa;
      this.imobilizado.id_filial = params.id_local;
      this.imobilizado.codigo = params.codigo;
      this.idAcao = params.acao;
      this.setAcao(params.acao);
    });
    globalService.getCondicoes().forEach((obj) => {
      if (obj.idx > 0) {
        let cond: Condicoes = new Condicoes(obj.idx, obj.descricao);
        this.lsCondicoes.push(cond);
      }
    });
  }

  ngOnInit(): void {
    if (this.idAcao == CadastroAcoes.Inclusao) {
      this.imobilizado = new ImobilizadoModel();
    }
    this.setValue();
    this.getGrupos();
  }

  ngOnDestroy(): void {
    this.inscricaoRota?.unsubscribe();
    this.inscricaoAcao?.unsubscribe();
    this.inscricaoGrupo?.unsubscribe();
    this.inscricaoCC?.unsubscribe();
  }

  onSubmit() {
    if (this.formulario.valid) {
      this.executaAcao();
    } else {
      this.formulario.markAllAsTouched();
      this.appSnackBar.openSuccessSnackBar(
        `Formulário Com Campos Inválidos.`,
        'OK'
      );
    }
  }

  onRetorno() {
    const par = this.globalService.estadoFind('imobilizado');
    if (par != null) {
      let config = par.getParametro();
      Object(config).new = this.idAcao == CadastroAcoes.Inclusao ? true : false;
      Object(config).id_retorno = this.imobilizado.codigo;
      par.parametro = JSON.stringify(config);
      this.globalService.estadoSave(par);
    }
    this.router.navigate(['/imobilizados/imobilizados', 'SIM']);
  }

  onCancel() {
    const par = this.globalService.estadoFind('imobilizado');
    if (par != null) {
      let config = par.getParametro();
      Object(config).new = false;
      Object(config).id_retorno =
        this.idAcao == CadastroAcoes.Consulta ? this.imobilizado.codigo : 0;
      par.parametro = JSON.stringify(config);
      this.globalService.estadoSave(par);
    }
    this.router.navigate(['/imobilizados/imobilizados', 'SIM']);
  }

  getImobilizado() {
    this.globalService.setSpin(true);
    this.inscricaoAcao = this.imobilizadoService
      .getImobilizado(
        this.imobilizado.id_empresa,
        this.imobilizado.id_filial,
        this.imobilizado.codigo
      )
      .subscribe(
        (data: ImobilizadoModel) => {
          this.globalService.setSpin(false);
          this.imobilizado = data;
          console.log('IMOBILIZADO', this.imobilizado);
          this.setValue();
        },
        (error: any) => {
          this.globalService.setSpin(false);
          this.appSnackBar.openFailureSnackBar(
            `Pesquisa Nos Imobilizados ${error.error.tabela} - ${error.error.erro} - ${error.error.message}`,
            'OK'
          );
        }
      );
  }

  getGrupos() {
    let par = new ParametroGrupo01();

    par.id_empresa = this.globalService.getIdEmpresa();

    par.id_filial = this.globalService.getLocal().id;

    par.orderby = 'Descrição';

    par.pagina = 0;

    par.contador = 'N';

    par.tamPagina = 0;

    this.globalService.setSpin(true);
    this.inscricaoGrupo = this.grupoService
      .getGruposParametro_01(par)
      .subscribe(
        (data: GrupoModel[]) => {
          this.globalService.setSpin(false);
          this.grupos = [];
          this.grupos = data;
          this.getCentrosCustos();
        },
        (error: any) => {
          this.globalService.setSpin(false);
          console.log(error);
          this.grupos = [];
          this.appSnackBar.openFailureSnackBar(
            `Pesquisa Nos Grupos ${messageError(error)}`,
            'OK'
          );
        }
      );
  }

  getCentrosCustos() {
    let par = new ParametroCentrocusto01();

    par.id_empresa = this.globalService.getIdEmpresa();

    par.id_filial = this.globalService.getLocal().id;

    par.orderby = 'Descrição';

    par.pagina = 0;

    par.contador = 'N';

    par.tamPagina = 0;

    this.globalService.setSpin(true);
    this.inscricaoCC = this.ccService
      .getCentroscustosParametro_01(par)
      .subscribe(
        (data: CentrocustoModel[]) => {
          this.globalService.setSpin(false);
          this.ccs = [];
          this.ccs = data;
          if (this.idAcao !== CadastroAcoes.Inclusao) {
            if (this.idAcao == CadastroAcoes.Inclusao) {
              this.imobilizado.id_empresa = this.globalService.getIdEmpresa();
              this.imobilizado.id_filial = this.globalService.getLocal().id;
              this.setValue();
            } else {
              this.getImobilizado();
            }
          }
        },
        (error: any) => {
          this.globalService.setSpin(false);
          console.log(error);
          this.ccs = [];
          this.appSnackBar.openFailureSnackBar(
            `Pesquisa Nos Centros De Custos => ${messageError(error)}`,
            'OK'
          );
        }
      );
  }

  setValue() {
    let idx2 = this.lsCondicoes.findIndex((cond) => {
      return cond.idx == this.imobilizado.condicao;
    });
    if (idx2 == -1) {
      idx2 = this.lsCondicoes.length - 1;
    }
    this.formulario.setValue({
      codigo: this.imobilizado.codigo,
      descricao: this.imobilizado.descricao,
      grupo: this.imobilizado.cod_grupo,
      grupo_:
        this.idAcao == CadastroAcoes.Consulta ||
        this.idAcao == CadastroAcoes.Exclusao
          ? this.imobilizado.grupo_descricao
          : '',
      cc: this.imobilizado.cod_cc,
      cc_:
        this.idAcao == CadastroAcoes.Consulta ||
        this.idAcao == CadastroAcoes.Exclusao
          ? this.imobilizado.cc_descricao
          : '',
      condicao: this.imobilizado.condicao,
      condicao_:
        this.idAcao == CadastroAcoes.Consulta ||
        this.idAcao == CadastroAcoes.Exclusao
          ? this.lsCondicoes[idx2].descricao
          : '',
      apelido: this.imobilizado.apelido,
    });
  }

  getLabelCancel() {
    if (this.idAcao == CadastroAcoes.Consulta) {
      return 'Voltar';
    } else {
      return 'Cancelar';
    }
  }

  setAcao(op: number) {
    switch (+op) {
      case CadastroAcoes.Inclusao:
        this.acao = 'Gravar';
        this.labelCadastro = 'Imobilizados - Inclusão.';
        this.readOnly = false;
        break;
      case CadastroAcoes.Edicao:
        this.acao = 'Gravar';
        this.labelCadastro = 'Imobilizados - Alteração.';
        this.readOnly = false;
        break;
      case CadastroAcoes.Consulta:
        this.acao = 'Voltar';
        this.labelCadastro = 'Imobilizados - Consulta.';
        this.readOnly = true;
        break;
      case CadastroAcoes.Exclusao:
        this.acao = 'Excluir';
        this.labelCadastro = 'Imobilizados - Exclusão.';
        this.readOnly = true;
        break;
      default:
        break;
    }
  }

  executaAcao() {
    this.imobilizado.codigo = this.formulario.value.codigo;
    this.imobilizado.descricao = this.formulario.value.descricao;
    this.imobilizado.cod_grupo = this.formulario.value.grupo;
    this.imobilizado.cod_cc = this.formulario.value.cc;
    this.imobilizado.condicao = this.formulario.value.condicao;
    this.imobilizado.apelido = this.formulario.value.apelido;
    switch (+this.idAcao) {
      case CadastroAcoes.Inclusao:
        this.imobilizado.origem = 'M';
        this.imobilizado.user_insert = this.globalService.getUsuario().id;
        this.globalService.setSpin(true);
        this.inscricaoAcao = this.imobilizadoService
          .imobilizadoInsertInv(this.imobilizado)
          .subscribe(
            async (data: ImobilizadoModel) => {
              this.imobilizado.codigo = data.codigo;
              this.globalService.setSpin(false);
              this.onRetorno();
            },
            (error: any) => {
              this.globalService.setSpin(false);
              this.appSnackBar.openFailureSnackBar(
                `Erro Na Inclusão ${messageError(error)}`,
                'OK'
              );
            }
          );
        break;
      case CadastroAcoes.Edicao:
        this.globalService.setSpin(true);
        this.imobilizado.user_update = this.globalService.getUsuario().id;
        this.inscricaoAcao = this.imobilizadoService
          .imobilizadoUpdate(this.imobilizado)
          .subscribe(
            async (data: any) => {
              this.globalService.setSpin(false);
              this.onRetorno();
            },
            (error: any) => {
              this.globalService.setSpin(false);
              this.appSnackBar.openFailureSnackBar(
                `Erro Na Alteração ${messageError(error)}`,
                'OK'
              );
            }
          );
        break;
      case CadastroAcoes.Exclusao:
        this.globalService.setSpin(true);
        this.inscricaoAcao = this.imobilizadoService
          .imobilizadoDelete(
            this.imobilizado.id_empresa,
            this.imobilizado.id_filial,
            this.imobilizado.codigo
          )
          .subscribe(
            async (data: any) => {
              this.globalService.setSpin(false);
              this.onRetorno();
            },
            (error: any) => {
              this.globalService.setSpin(false);
              console.log(error);
              this.appSnackBar.openFailureSnackBar(
                `Erro Na Exclusão ${messageError(error)}`,
                'OK'
              );
            }
          );
        break;
      default:
        break;
    }
  }

  getAcoes() {
    return CadastroAcoes;
  }

  NoValidtouchedOrDirty(campo: string): boolean {
    if (
      !this.formulario.get(campo)?.valid &&
      (this.formulario.get(campo)?.touched || this.formulario.get(campo)?.dirty)
    ) {
      return true;
    }
    return false;
  }

  getMensafield(field: string): string {
    return this.formulario.get(field)?.errors?.message;
  }
}
