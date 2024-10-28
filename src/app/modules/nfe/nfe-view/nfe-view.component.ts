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
import { NfeModel } from 'src/app/models/nfe-model';
import { NfeService } from 'src/app/services/nfe.service';
import { ParametroNfe02 } from 'src/app/parametros/parametro-nfe02';

@Component({
  selector: 'app-nfe-view',
  templateUrl: './nfe-view.component.html',
  styleUrls: ['./nfe-view.component.css'],
})
export class NfeViewComponent implements OnInit {
  formulario: FormGroup;

  nfe: NfeModel = new NfeModel();

  erro: any;

  acao: string = 'Sem Definição';

  idAcao: number = CadastroAcoes.Inclusao;

  readOnly: boolean = true;

  inscricaoRota!: Subscription;
  inscricaoAcao!: Subscription;

  labelCadastro: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private nfeService: NfeService,
    private route: ActivatedRoute,
    private router: Router,
    private appSnackBar: AppSnackbar,
    private globalService: GlobalService
  ) {
    this.formulario = formBuilder.group({
      cnpj_fornecedor: [{ value: '' }],
      razao_fornecedor: [{ value: '' }],
      id_imobilizado: [{ value: '' }],
      imo_descricao: [{ value: '' }],
      nfe: [{ value: '' }],
      serie: [{ value: '' }],
      item: [{ value: '' }],
      dtemissao: [{ value: '' }],
      dtlancamento: [{ value: '' }],
      chavee: [{ value: '' }],
      qtd: [{ value: '' }],
      punit: [{ value: '' }],
      totalitem: [{ value: '' }],
      vlrcontabil: [{ value: '' }],
      baseicms: [{ value: '' }],
      percicms: [{ value: '' }],
      vlrcicms: [{ value: '' }],
    });
    this.nfe = new NfeModel();
    this.inscricaoRota = route.params.subscribe((params: any) => {
      this.nfe.id_empresa = params.id_empresa;
      this.nfe.id_filial = params.id_filial;
      this.nfe.cnpj_fornecedor = params.cnpj_fornecedor;
      this.nfe.razao_fornecedor = params.razao_fornecedor;
      this.nfe.id_imobilizado = params.id_imobilizado;
      this.nfe.nfe = params.nfe;
      this.nfe.serie = params.serie;
      this.nfe.item = params.item;
      this.idAcao = params.acao;
      this.setAcao(params.acao);
    });
  }

  ngOnInit(): void {
    if (this.idAcao == CadastroAcoes.Inclusao) {
      this.nfe = new NfeModel();
      this.nfe.id_empresa = this.globalService.getIdEmpresa();
      this.nfe.id_filial = this.globalService.getLocal().id;
    } else {
      this.getNfe();
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
      Object(config).id_retorno = this.nfe.id_imobilizado;
      par.parametro = JSON.stringify(config);
      this.globalService.estadoSave(par);
    }
    this.router.navigate(['/nfes/nfe', 'SIM']);
  }

  onCancel() {
    const par = this.globalService.estadoFind('imobilizado');
    if (par != null) {
      let config = par.getParametro();
      Object(config).new = false;
      Object(config).id_retorno =
        this.idAcao == CadastroAcoes.Consulta ? this.nfe.id_imobilizado : 0;
      par.parametro = JSON.stringify(config);
      this.globalService.estadoSave(par);
    }
    this.router.navigate(['/nfes/nfe', 'SIM']);
  }

  getNfe() {
    this.globalService.setSpin(true);
    const par: ParametroNfe02 = new ParametroNfe02();
    par.id_empresa = this.nfe.id_empresa;
    par.id_filial = this.nfe.id_filial;
    par.cnpj_fornecedor = this.nfe.cnpj_fornecedor;
    par.razao_fornecedor = this.nfe.razao_fornecedor;
    par.id_imobilizado = this.nfe.id_imobilizado;
    par.nfe = this.nfe.nfe;
    par.serie = this.nfe.serie;
    par.item = this.nfe.item;
    this.inscricaoAcao = this.nfeService.getNfe(par).subscribe(
      (data: NfeModel) => {
        this.globalService.setSpin(false);
        this.nfe = data;
        this.setValue();
      },
      (error: any) => {
        console.log(error);
        this.globalService.setSpin(false);
        this.appSnackBar.openFailureSnackBar(
          `Pesquisa Nos Nfes ${messageError(error)}`,
          'OK'
        );
      }
    );
  }

  setValue() {
    this.formulario.setValue({
      cnpj_fornecedor: this.nfe.cnpj_fornecedor,
      razao_fornecedor: this.nfe.razao_fornecedor,
      id_imobilizado: this.nfe.id_imobilizado,
      imo_descricao: this.nfe.imo_descricao,
      nfe: this.nfe.nfe,
      serie: this.nfe.serie,
      item: this.nfe.item,
      dtemissao: this.nfe.dtemissao,
      dtlancamento: this.nfe.dtlancamento,
      chavee: this.nfe.chavee,
      qtd: this.nfe.qtd,
      punit: this.nfe.punit,
      totalitem: this.nfe.totalitem,
      vlrcontabil: this.nfe.vlrcontabil,
      baseicms: this.nfe.baseicms,
      percicms: this.nfe.percicms,
      vlrcicms: this.nfe.vlrcicms,
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
        this.labelCadastro = 'Nfes - Inclusão.';
        this.readOnly = false;
        break;
      case CadastroAcoes.Edicao:
        this.acao = 'Gravar';
        this.labelCadastro = 'Nfes - Alteração.';
        this.readOnly = false;
        break;
      case CadastroAcoes.Consulta:
        this.acao = 'Voltar';
        this.labelCadastro = 'Nfes - Consulta.';
        this.readOnly = true;
        break;
      case CadastroAcoes.Exclusao:
        this.acao = 'Excluir';
        this.labelCadastro = 'Nfes - Exclusão.';
        this.readOnly = true;
        break;
      default:
        break;
    }
  }

  executaAcao() {
    this.nfe.cnpj_fornecedor = this.formulario.value.cnpj_fornecedor;
    this.nfe.razao_fornecedor = this.formulario.value.razao_fornecedor;
    this.nfe.id_imobilizado = this.formulario.value.id_imobilizado;
    this.nfe.nfe = this.formulario.value.nfe;
    this.nfe.serie = this.formulario.value.serie;
    this.nfe.item = this.formulario.value.item;
    this.nfe.chavee = this.formulario.value.chavee;
    this.nfe.dtemissao = this.formulario.value.dtemissao;
    this.nfe.dtlancamento = this.formulario.value.dtlancamento;
    this.nfe.qtd = this.formulario.value.qtd;
    this.nfe.punit = this.formulario.value.punit;
    this.nfe.totalitem = this.formulario.value.totalitem;
    this.nfe.vlrcontabil = this.formulario.value.vlrcontabil;
    this.nfe.baseicms = this.formulario.value.baseicms;
    this.nfe.percicms = this.formulario.value.percicms;
    this.nfe.vlrcicms = this.formulario.value.vlrcicms;
    switch (+this.idAcao) {
      case CadastroAcoes.Inclusao:
        this.nfe.user_insert = this.globalService.getUsuario().id;
        this.globalService.setSpin(true);
        this.inscricaoAcao = this.nfeService.nfeInsert(this.nfe).subscribe(
          async (data: NfeModel) => {
            this.nfe.id_imobilizado = data.id_imobilizado;
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
        this.nfe.user_update = this.globalService.getUsuario().id;
        this.inscricaoAcao = this.nfeService.nfeUpdate(this.nfe).subscribe(
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
        this.inscricaoAcao = this.nfeService
          .nfeDelete(
            this.nfe.id_empresa,
            this.nfe.id_filial,
            this.nfe.cnpj_fornecedor,
            this.nfe.razao_fornecedor,
            this.nfe.id_imobilizado,
            this.nfe.nfe,
            this.nfe.serie,
            this.nfe.item
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
