import { ProdutoModel } from 'src/app/models/produto-model';
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
import { ProdutoService } from 'src/app/services/produto.service';
import { EstadoProduto } from 'src/app/shared/classes/estado-produto';

@Component({
  selector: 'app-view-produto',
  templateUrl: './view-produto.component.html',
  styleUrls: ['./view-produto.component.css'],
})
export class ViewProdutoComponent implements OnInit {
  formulario: FormGroup;

  produto: ProdutoModel = new ProdutoModel();

  erro: any;

  acao: string = 'Sem Definição';

  idAcao: number = CadastroAcoes.Inclusao;

  readOnly: boolean = true;

  inscricaoRota!: Subscription;

  inscricaoAcao!: Subscription;

  labelCadastro: string = '';

  estados: EstadoProduto[] = this.globalService.getEstados();

  constructor(
    private formBuilder: FormBuilder,
    private produtoService: ProdutoService,
    private route: ActivatedRoute,
    private router: Router,
    private appSnackBar: AppSnackbar,
    private globalService: GlobalService
  ) {
    this.formulario = formBuilder.group({
      codigo: [{ value: '' }, [Validators.required, Validators.min(1)]],
      estado: [{ value: '' }, [Validators.required, Validators.min(1)]],
      estado_: [{ value: '' }],
      descricao: [{ value: '' }, [ValidatorStringLen(1, 80, true)]],
      ncm: [{ value: '' }, [ValidatorStringLen(0, 15, false)]],
      principal: [{ value: '' }],
      principal_: [{ value: '' }],
    });
    this.produto = new ProdutoModel();
    this.inscricaoRota = route.params.subscribe((params: any) => {
      this.produto.id_empresa = params.id_empresa;
      this.produto.id_filial = params.id_local;
      this.produto.codigo = params.codigo;
      this.idAcao = params.acao;
      this.setAcao(params.acao);
    });
  }

  ngOnInit(): void {
    if (this.idAcao == CadastroAcoes.Inclusao) {
      this.produto = new ProdutoModel();
      this.produto.id_empresa = this.globalService.getIdEmpresa();
      this.produto.id_filial = this.globalService.getLocal().id;
    } else {
      this.getProduto();
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
    const par = this.globalService.estadoFind('produto');
    if (par != null) {
      let config = par.getParametro();
      Object(config).new = this.idAcao == CadastroAcoes.Inclusao ? true : false;
      Object(config).id_retorno = this.produto.codigo;
      par.parametro = JSON.stringify(config);
      this.globalService.estadoSave(par);
    }
    this.router.navigate(['/produtos/produtos', 'SIM']);
  }

  onCancel() {
    const par = this.globalService.estadoFind('produto');
    if (par != null) {
      let config = par.getParametro();
      Object(config).new = false;
      Object(config).id_retorno =
        this.idAcao == CadastroAcoes.Consulta ? this.produto.codigo : 0;
      par.parametro = JSON.stringify(config);
      this.globalService.estadoSave(par);
    }
    this.router.navigate(['/produtos/produtos', 'SIM']);
  }

  getProduto() {
    this.globalService.setSpin(true);
    this.inscricaoAcao = this.produtoService
      .getProduto(
        this.produto.id_empresa,
        this.produto.id_filial,
        this.produto.codigo
      )
      .subscribe(
        (data: ProdutoModel) => {
          this.globalService.setSpin(false);
          this.produto = data;
          this.setValue();
        },
        (error: any) => {
          this.globalService.setSpin(false);
          this.appSnackBar.openFailureSnackBar(
            `Pesquisa Nos Produtos ${error.error.tabela} - ${error.error.erro} - ${error.error.message}`,
            'OK'
          );
        }
      );
  }

  setValue() {
    this.formulario.setValue({
      codigo: this.produto.codigo,
      estado: this.produto.estado == 0 ? 1 : this.produto.estado,
      estado_: this.globalService.getEstado(this.produto.estado),
      descricao: this.produto.descricao,
      ncm: this.produto.ncm,
      principal: this.produto.id_principal,
      principal_: this.produto.princ_descricao,
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
        this.labelCadastro = 'Produtos - Inclusão.';
        this.readOnly = false;
        break;
      case CadastroAcoes.Edicao:
        this.acao = 'Gravar';
        this.labelCadastro = 'Produtos - Alteração.';
        this.readOnly = false;
        break;
      case CadastroAcoes.Consulta:
        this.acao = 'Voltar';
        this.labelCadastro = 'Produtos - Consulta.';
        this.readOnly = true;
        break;
      case CadastroAcoes.Exclusao:
        this.acao = 'Excluir';
        this.labelCadastro = 'Produtos - Exclusão.';
        this.readOnly = true;
        break;
      default:
        break;
    }
  }

  executaAcao() {
    this.produto.codigo = this.formulario.value.codigo;
    this.produto.estado = this.formulario.value.estado;
    this.produto.descricao = this.formulario.value.descricao;
    this.produto.ncm = this.formulario.value.ncm;
    switch (+this.idAcao) {
      case CadastroAcoes.Inclusao:
        this.produto.user_insert = this.globalService.getUsuario().id;
        this.globalService.setSpin(true);
        this.inscricaoAcao = this.produtoService
          .produtoInsert(this.produto)
          .subscribe(
            async (data: ProdutoModel) => {
              this.produto.codigo = data.codigo;
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
        this.produto.user_update = this.globalService.getUsuario().id;
        this.inscricaoAcao = this.produtoService
          .produtoUpdate(this.produto)
          .subscribe(
            async (data: any) => {
              this.globalService.setSpin(false);
              this.onRetorno();
            },
            (error: any) => {
              this.globalService.setSpin(false);
              this.appSnackBar.openFailureSnackBar(
                `Erro Na Alteração ${error.error.tabela} - ${error.error.erro} - ${error.error.message}`,
                'OK'
              );
            }
          );
        break;
      case CadastroAcoes.Exclusao:
        this.globalService.setSpin(true);
        this.inscricaoAcao = this.produtoService
          .produtoDelete(
            this.produto.id_empresa,
            this.produto.id_filial,
            this.produto.codigo
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
