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
import { GrupoModel } from 'src/app/models/grupo-model';
import { GrupoService } from 'src/app/services/grupo.service';

@Component({
  selector: 'app-grupo-view',
  templateUrl: './grupo-view.component.html',
  styleUrls: ['./grupo-view.component.css'],
})
export class GrupoViewComponent implements OnInit {
  formulario: FormGroup;

  grupo: GrupoModel = new GrupoModel();

  erro: any;

  acao: string = 'Sem Definição';

  idAcao: number = CadastroAcoes.Inclusao;

  readOnly: boolean = true;

  inscricaoRota!: Subscription;
  inscricaoAcao!: Subscription;

  labelCadastro: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private grupoService: GrupoService,
    private route: ActivatedRoute,
    private router: Router,
    private appSnackBar: AppSnackbar,
    private globalService: GlobalService
  ) {
    this.formulario = formBuilder.group({
      codigo: [{ value: '' }, [Validators.required, Validators.min(1)]],
      descricao: [{ value: '' }, [ValidatorStringLen(1, 80, true)]],
    });
    this.grupo = new GrupoModel();
    this.inscricaoRota = route.params.subscribe((params: any) => {
      this.grupo.id_empresa = params.id_empresa;
      this.grupo.id_filial = params.id_local;
      this.grupo.codigo = params.id_imobilizado;
      this.idAcao = params.acao;
      this.setAcao(params.acao);
    });
  }

  ngOnInit(): void {
    if (this.idAcao == CadastroAcoes.Inclusao) {
      this.grupo = new GrupoModel();
      this.grupo.id_empresa = this.globalService.getIdEmpresa();
      this.grupo.id_filial = this.globalService.getLocal().id;
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
    const par = this.globalService.estadoFind('grupo');
    if (par != null) {
      let config = par.getParametro();
      Object(config).new = this.idAcao == CadastroAcoes.Inclusao ? true : false;
      Object(config).id_retorno = this.grupo.codigo;
      par.parametro = JSON.stringify(config);
      this.globalService.estadoSave(par);
    }
    this.router.navigate(['/grupos/grupos', 'SIM']);
  }

  onCancel() {
    const par = this.globalService.estadoFind('grupo');
    if (par != null) {
      let config = par.getParametro();
      Object(config).new = false;
      Object(config).id_retorno =
        this.idAcao == CadastroAcoes.Consulta ? this.grupo.codigo : 0;
      par.parametro = JSON.stringify(config);
      this.globalService.estadoSave(par);
    }
    this.router.navigate(['/grupos/grupos', 'SIM']);
  }

  getGrupo() {
    this.globalService.setSpin(true);
    this.inscricaoAcao = this.grupoService
      .getGrupo(this.grupo.id_empresa, this.grupo.id_filial, this.grupo.codigo)
      .subscribe(
        (data: GrupoModel) => {
          this.globalService.setSpin(false);
          this.grupo = data;
          this.setValue();
        },
        (error: any) => {
          this.globalService.setSpin(false);
          console.log(error);
          this.appSnackBar.openFailureSnackBar(
            `Pesquisa Nos Grupos ${messageError(error)}`,
            'OK'
          );
        }
      );
  }

  setValue() {
    this.formulario.setValue({
      codigo: this.grupo.codigo,
      descricao: this.grupo.descricao,
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
        this.labelCadastro = 'Grupos - Inclusão.';
        this.readOnly = false;
        break;
      case CadastroAcoes.Edicao:
        this.acao = 'Gravar';
        this.labelCadastro = 'Grupos - Alteração.';
        this.readOnly = false;
        break;
      case CadastroAcoes.Consulta:
        this.acao = 'Voltar';
        this.labelCadastro = 'Grupos - Consulta.';
        this.readOnly = true;
        break;
      case CadastroAcoes.Exclusao:
        this.acao = 'Excluir';
        this.labelCadastro = 'Grupos - Exclusão.';
        this.readOnly = true;
        break;
      default:
        break;
    }
  }

  executaAcao() {
    this.grupo.codigo = this.formulario.value.codigo;
    this.grupo.descricao = this.formulario.value.descricao;
    switch (+this.idAcao) {
      case CadastroAcoes.Inclusao:
        this.grupo.user_insert = this.globalService.getUsuario().id;
        this.globalService.setSpin(true);
        this.inscricaoAcao = this.grupoService
          .grupoInsert(this.grupo)
          .subscribe(
            async (data: GrupoModel) => {
              this.grupo.codigo = data.codigo;
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
        this.grupo.user_update = this.globalService.getUsuario().id;
        this.inscricaoAcao = this.grupoService
          .grupoUpdate(this.grupo)
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
        this.inscricaoAcao = this.grupoService
          .grupoDelete(
            this.grupo.id_empresa,
            this.grupo.id_filial,
            this.grupo.codigo
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
