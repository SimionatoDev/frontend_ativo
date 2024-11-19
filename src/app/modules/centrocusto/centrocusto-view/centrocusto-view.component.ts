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
import { CentrocustoModel } from 'src/app/models/centrocusto-model';
import { CentrocustoService } from 'src/app/services/centrocusto.service';

@Component({
  selector: 'app-centrocusto-view',
  templateUrl: './centrocusto-view.component.html',
  styleUrls: ['./centrocusto-view.component.css'],
})
export class CentrocustoViewComponent implements OnInit {
  formulario: FormGroup;

  cc: CentrocustoModel = new CentrocustoModel();

  erro: any;

  acao: string = 'Sem Definição';

  idAcao: number = CadastroAcoes.Inclusao;

  readOnly: boolean = true;

  inscricaoRota!: Subscription;
  inscricaoAcao!: Subscription;

  labelCadastro: string = '';
  constructor(
    private formBuilder: FormBuilder,
    private ccService: CentrocustoService,
    private route: ActivatedRoute,
    private router: Router,
    private appSnackBar: AppSnackbar,
    private globalService: GlobalService
  ) {
    this.formulario = formBuilder.group({
      codigo: [{ value: '' }, [Validators.required, Validators.min(1)]],
      descricao: [{ value: '' }, [ValidatorStringLen(1, 80, true)]],
    });
    this.cc = new CentrocustoModel();
    this.inscricaoRota = route.params.subscribe((params: any) => {
      this.cc.id_empresa = params.id_empresa;
      this.cc.id_filial = params.id_local;
      this.cc.codigo = params.codigo;
      this.idAcao = params.acao;
      this.setAcao(params.acao);
    });
  }

  ngOnInit(): void {
    if (this.idAcao == CadastroAcoes.Inclusao) {
      this.cc = new CentrocustoModel();
      this.cc.id_empresa = this.globalService.getIdEmpresa();
      this.cc.id_filial  = this.globalService.getLocal().id;
    } else {
      this.getGrupo();
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
    const par = this.globalService.estadoFind('cc');
    if (par != null) {
      let config = par.getParametro();
      Object(config).new = this.idAcao == CadastroAcoes.Inclusao ? true : false;
      Object(config).id_retorno = this.cc.codigo;
      par.parametro = JSON.stringify(config);
      this.globalService.estadoSave(par);
    }
    this.router.navigate(['/centroscustos/centroscustos', 'SIM']);
  }

  onCancel() {
    const par = this.globalService.estadoFind('cc');
    if (par != null) {
      let config = par.getParametro();
      Object(config).new = false;
      Object(config).id_retorno =
        this.idAcao == CadastroAcoes.Consulta ? this.cc.codigo : 0;
      par.parametro = JSON.stringify(config);
      this.globalService.estadoSave(par);
    }
    this.router.navigate(['/centroscustos/centroscustos', 'SIM']);
  }

  getGrupo() {
    this.globalService.setSpin(true);
    this.inscricaoAcao = this.ccService
      .getCentrocusto(
        this.cc.id_empresa,
        this.cc.id_filial,
        this.cc.codigo.replace('/', '_')
      )
      .subscribe(
        (data: CentrocustoModel) => {
          this.globalService.setSpin(false);
          this.cc = data;
          this.setValue();
        },
        (error: any) => {
          this.globalService.setSpin(false);
          this.appSnackBar.openFailureSnackBar(
            `Pesquisa Nos Centros De Custos ${error.error.tabela} - ${error.error.erro} - ${error.error.message}`,
            'OK'
          );
        }
      );
  }

  setValue() {
    this.formulario.setValue({
      codigo: this.cc.codigo,
      descricao: this.cc.descricao,
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
        this.labelCadastro = 'Centros De Custos - Inclusão.';
        this.readOnly = false;
        break;
      case CadastroAcoes.Edicao:
        this.acao = 'Gravar';
        this.labelCadastro = 'Centros De Custos - Alteração.';
        this.readOnly = false;
        break;
      case CadastroAcoes.Consulta:
        this.acao = 'Voltar';
        this.labelCadastro = 'Centros De Custos - Consulta.';
        this.readOnly = true;
        break;
      case CadastroAcoes.Exclusao:
        this.acao = 'Excluir';
        this.labelCadastro = 'Centros De Custos - Exclusão.';
        this.readOnly = true;
        break;
      default:
        break;
    }
  }

  executaAcao() {
    this.cc.codigo = this.formulario.value.codigo;
    this.cc.descricao = this.formulario.value.descricao;
    switch (+this.idAcao) {
      case CadastroAcoes.Inclusao:
        this.cc.user_insert = this.globalService.getUsuario().id;
        this.globalService.setSpin(true);
        this.inscricaoAcao = this.ccService
          .centrocustoInsert(this.cc)
          .subscribe(
            async (data: CentrocustoModel) => {
              this.cc.codigo = data.codigo;
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
        this.cc.user_update = this.globalService.getUsuario().id;
        this.inscricaoAcao = this.ccService
          .centrocustoUpdate(this.cc)
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
        this.inscricaoAcao = this.ccService
          .centrocustoDelete(
            this.cc.id_empresa,
            this.cc.id_filial,
            this.cc.codigo
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
