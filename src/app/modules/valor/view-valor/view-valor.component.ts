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
import { ValorService } from 'src/app/services/valor.service';
import { ValorModel } from 'src/app/models/valor-model';

@Component({
  selector: 'app-view-valor',
  templateUrl: './view-valor.component.html',
  styleUrls: ['./view-valor.component.css'],
})
export class ViewValorComponent implements OnInit {
  formulario: FormGroup;

  valor: ValorModel = new ValorModel();

  erro: any;

  acao: string = 'Sem Definição';

  idAcao: number = CadastroAcoes.Inclusao;

  readOnly: boolean = true;

  inscricaoRota!: Subscription;
  inscricaoAcao!: Subscription;

  labelCadastro: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private valorService: ValorService,
    private route: ActivatedRoute,
    private router: Router,
    private appSnackBar: AppSnackbar,
    private globalService: GlobalService
  ) {
    this.formulario = formBuilder.group({
      id_imobilizado: [{ value: '' }],
      imo_descricao: [{ value: '' }],
      dtaquisicao: [{ value: '' }],
      vlraquisicao: [{ value: '' }],
      totaldepreciado: [{ value: '' }],
      vlrresidual: [{ value: '' }],
      reavalicao: [{ value: '' }],
      deemed: [{ value: '' }],
      vlrconsolidado: [{ value: '' }],
    });
    this.valor = new ValorModel();
    this.inscricaoRota = route.params.subscribe((params: any) => {
      this.valor.id_empresa = params.id_empresa;
      this.valor.id_filial = params.id_local;
      this.valor.id_imobilizado = params.id_imobilizado;
      this.idAcao = params.acao;
      this.setAcao(params.acao);
    });
  }

  ngOnInit(): void {
    if (this.idAcao == CadastroAcoes.Inclusao) {
      this.valor = new ValorModel();
      this.valor.id_empresa = this.globalService.getIdEmpresa();
      this.valor.id_filial = this.globalService.getLocal().id;
    } else {
      this.getValor();
    }
    this.setValue();
  }

  ngOnDestroy(): void {
    this.inscricaoRota?.unsubscribe();
    this.inscricaoAcao?.unsubscribe();
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
      Object(config).id_retorno = this.valor.id_imobilizado;
      par.parametro = JSON.stringify(config);
      this.globalService.estadoSave(par);
    }
    this.router.navigate(['/valores/valores', 'SIM']);
  }

  onCancel() {
    const par = this.globalService.estadoFind('imobilizado');
    if (par != null) {
      let config = par.getParametro();
      Object(config).new = false;
      Object(config).id_retorno =
        this.idAcao == CadastroAcoes.Consulta ? this.valor.id_imobilizado : 0;
      par.parametro = JSON.stringify(config);
      this.globalService.estadoSave(par);
    }
    this.router.navigate(['/valores/valores', 'SIM']);
  }

  getValor() {
    this.globalService.setSpin(true);
    this.inscricaoAcao = this.valorService
      .getValor(
        this.valor.id_empresa,
        this.valor.id_filial,
        this.valor.id_imobilizado
      )
      .subscribe(
        (data: ValorModel) => {
          this.globalService.setSpin(false);
          this.valor = data;
          this.setValue();
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

  setValue() {
    this.formulario.setValue({
      id_imobilizado: this.valor.id_imobilizado,
      imo_descricao: this.valor.imo_descricao,
      dtaquisicao: this.valor.dtaquisicao,
      vlraquisicao: this.valor.vlraquisicao,
      totaldepreciado: this.valor.totaldepreciado,
      vlrresidual: this.valor.vlrresidual,
      reavalicao: this.valor.reavalicao,
      deemed: this.valor.deemed,
      vlrconsolidado: this.valor.vlrconsolidado,
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
    this.valor.id_imobilizado = this.formulario.value.id_imobilizado;
    this.valor.dtaquisicao = this.formulario.value.dtaquisicao;
    this.valor.vlraquisicao = this.formulario.value.vlraquisicao;
    this.valor.totaldepreciado = this.formulario.value.totaldepreciado;
    this.valor.vlrresidual = this.formulario.value.vlrresidual;
    this.valor.reavalicao = this.formulario.value.reavalicao;
    this.valor.deemed = this.formulario.value.deemed;
    this.valor.vlrconsolidado = this.formulario.value.vlrconsolidado;
    switch (+this.idAcao) {
      case CadastroAcoes.Inclusao:
        this.valor.user_insert = this.globalService.getUsuario().id;
        this.globalService.setSpin(true);
        this.inscricaoAcao = this.valorService
          .valorInsert(this.valor)
          .subscribe(
            async (data: ValorModel) => {
              this.valor.id_imobilizado = data.id_imobilizado;
              this.globalService.setSpin(false);
              this.onRetorno();
            },
            (error: any) => {
              this.globalService.setSpin(false);
              this.appSnackBar.openFailureSnackBar(
                `Erro Na INclusão ${messageError(error)}`,
                'OK'
              );
            }
          );
        break;
      case CadastroAcoes.Edicao:
        this.globalService.setSpin(true);
        this.valor.user_update = this.globalService.getUsuario().id;
        this.inscricaoAcao = this.valorService
          .valorUpdate(this.valor)
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
        this.inscricaoAcao = this.valorService
          .valorDelete(
            this.valor.id_empresa,
            this.valor.id_filial,
            this.valor.id_imobilizado
          )
          .subscribe(
            async (data: any) => {
              this.globalService.setSpin(false);
              this.onRetorno();
            },
            (error: any) => {
              this.globalService.setSpin(false);
              this.appSnackBar.openFailureSnackBar(
                `Erro Na Exclusão $Mesage `,
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

  touchedOrDirty(campo: string): boolean {
    if (
      this.formulario.get(campo)?.touched ||
      this.formulario.get(campo)?.dirty
    )
      return true;
    return false;
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
