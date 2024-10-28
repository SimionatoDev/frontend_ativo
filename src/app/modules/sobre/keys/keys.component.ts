import { ParametroModel } from 'src/app/models/parametro-model';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { GlobalService } from 'src/app/services/global.service';
import { AppSnackbar } from 'src/app/shared/classes/app-snackbar';
import { CadastroAcoes } from 'src/app/shared/classes/cadastro-acoes';
import { messageError } from 'src/app/shared/classes/util';
import { ParametrosService } from 'src/app/services/parametros.service';

@Component({
  selector: 'app-keys',
  templateUrl: './keys.component.html',
  styleUrls: ['./keys.component.css'],
})
export class KeysComponent implements OnInit {
  formulario: FormGroup;

  parametro: ParametroModel = new ParametroModel();

  acao: string = 'Sem Definição';

  idAcao: number = CadastroAcoes.Inclusao;

  readOnly: boolean = true;

  inscricaoCrud!: Subscription;

  inscricaoInstall!: Subscription;

  labelCadastro: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private parametrosService: ParametrosService,
    private router: Router,
    private appSnackBar: AppSnackbar,
    private globalService: GlobalService
  ) {
    this.formulario = formBuilder.group({
      key: [{ value: '' }, [Validators.required]],
    });
    this.parametro = new ParametroModel();
    this.parametro.id_empresa = this.globalService.getIdEmpresa();
    this.parametro.modulo = 'key-intelli';
    this.parametro.assinatura = 'googledrive';
    this.parametro.id_usuario = 999;
    this.parametro.parametro = '{}';
    this.setValue();
  }

  ngOnInit(): void {
    this.getParametro();
  }

  ngOnDestroy(): void {
    this.inscricaoCrud?.unsubscribe();
    this.inscricaoInstall?.unsubscribe();
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
    this.router.navigate(['/']);
  }

  onCancel() {
    this.router.navigate(['/']);
  }

  getParametro() {
    this.globalService.setSpin(true);
    this.inscricaoCrud = this.parametrosService
      .getParametro(
        this.parametro.id_empresa,
        this.parametro.modulo,
        this.parametro.assinatura,
        this.parametro.id_usuario
      )
      .subscribe(
        (data: ParametroModel) => {
          this.globalService.setSpin(false);
          this.parametro = data;
          console.log("parametro",data);
          this.setValue();
          this.idAcao = CadastroAcoes.Edicao;
          this.setAcao(this.idAcao);
        },
        (error: any) => {
          this.globalService.setSpin(false);
          console.log('==>', error.error.message, 'Parametro Não Encontrado.');
          if (error.error.message.trim() == 'Parametro Não Encontrado.') {
            this.idAcao = CadastroAcoes.Inclusao;
            this.setAcao(this.idAcao);
          } else {
            this.appSnackBar.openFailureSnackBar(
              `Pesquisa ${messageError(error)}`,
              'OK'
            );
            this.idAcao = CadastroAcoes.Consulta;
            this.setAcao(this.idAcao);
          }
        }
      );
  }

  setValue() {
    this.formulario.setValue({
      key: this.parametro.parametro,
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
        this.labelCadastro = 'Google Drive Key - Inclusão.';
        this.readOnly = false;
        break;
      case CadastroAcoes.Edicao:
        this.acao = 'Gravar';
        this.labelCadastro = 'Google Drive Key - Alteração.';
        this.readOnly = false;
        break;
      case CadastroAcoes.Consulta:
        this.acao = 'Voltar';
        this.labelCadastro = 'Google Drive Key - Consulta.';
        this.readOnly = true;
        break;
      case CadastroAcoes.Exclusao:
        this.acao = 'Excluir';
        this.labelCadastro = 'Google Drive Key - Exclusão.';
        this.readOnly = true;
        break;
      default:
        break;
    }
  }

  executaAcao() {
    this.parametro.parametro = this.formulario.value.key;
    switch (+this.idAcao) {
      case CadastroAcoes.Inclusao:
        this.parametro.user_insert = this.globalService.getUsuario().id;
        this.globalService.setSpin(true);
        this.inscricaoCrud = this.parametrosService
          .ParametroInsert(this.parametro)
          .subscribe(
            async (data: ParametroModel) => {
              this.globalService.setSpin(false);
              this.appSnackBar.openSuccessSnackBar(
                `Chave Salva No Banco De Dados...`,
                'OK'
              );
              this.instalKey();
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
        this.parametro.user_update = this.globalService.getUsuario().id;
        this.inscricaoCrud = this.parametrosService
          .ParametroUpdate(this.parametro)
          .subscribe(
            async (data: any) => {
              this.globalService.setSpin(false);
              this.appSnackBar.openSuccessSnackBar(
                `Chave Atualizado No Banco De Dados...`,
                'OK'
              );
              this.instalKey();
            },
            (error: any) => {
              this.globalService.setSpin(false);
              this.appSnackBar.openFailureSnackBar(
                `Erro Na Atualização ${messageError(error)}`,
                'OK'
              );
            }
          );
        break;
      case CadastroAcoes.Exclusao:
        this.globalService.setSpin(true);
        this.inscricaoCrud = this.parametrosService
          .ParametroDelete(
            this.parametro.id_empresa,
            this.parametro.modulo,
            this.parametro.assinatura,
            this.parametro.id_usuario
          )
          .subscribe(
            async (data: any) => {
              this.globalService.setSpin(false);
              this.onRetorno();
            },
            (error: any) => {
              this.globalService.setSpin(false);
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

  instalKey() {
    this.inscricaoInstall = this.parametrosService
      .ParametroInstallKey()
      .subscribe(
        async (data: any) => {
          this.globalService.setSpin(false);
          this.appSnackBar.openSuccessSnackBar(
            `Chave Instalada Com Sucesso!`,
            'OK'
          );
          this.onRetorno();
        },
        (error: any) => {
          this.globalService.setSpin(false);
          this.appSnackBar.openFailureSnackBar(
            `Instalação Da Chave ${messageError(error)}`,
            'OK'
          );
        }
      );
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

  inicializaParametro() {
    this.parametro = new ParametroModel();
    this.parametro.id_empresa = this.globalService.getIdEmpresa();
    this.parametro.modulo = 'key';
    this.parametro.assinatura = 'googledrive';
    this.parametro.id_usuario = 999;
    this.parametro.parametro = `{}`;
  }
}
