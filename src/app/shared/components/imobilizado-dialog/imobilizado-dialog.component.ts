import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CentrocustoModel } from 'src/app/models/centrocusto-model';
import { ImobilizadoModel } from 'src/app/models/imobilizado-model';
import { CentrocustoService } from 'src/app/services/centrocusto.service';
import { GrupoService } from 'src/app/services/grupo.service';
import { ImobilizadoService } from 'src/app/services/imobilizado.service';
import { AppSnackbar } from '../../classes/app-snackbar';
import { GlobalService } from 'src/app/services/global.service';
import { ValidatorStringLen } from '../../Validators/validator-string-len';
import { CadastroAcoes } from '../../classes/cadastro-acoes';
import { ParametroGrupo01 } from 'src/app/parametros/parametro-grupo01';
import { GrupoModel } from 'src/app/models/grupo-model';
import { messageError } from '../../classes/util';
import { ParametroCentrocusto01 } from 'src/app/parametros/parametro-centrocusto01';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ImobilizadoData } from './imobilizado-data';

@Component({
  selector: 'app-imobilizado-dialog',
  templateUrl: './imobilizado-dialog.component.html',
  styleUrls: ['./imobilizado-dialog.component.css'],
})
export class ImobilizadoDialogComponent implements OnInit {
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

  constructor(
    private formBuilder: FormBuilder,
    private imobilizadoService: ImobilizadoService,
    private grupoService: GrupoService,
    private ccService: CentrocustoService,
    private route: ActivatedRoute,
    private router: Router,
    private appSnackBar: AppSnackbar,
    private globalService: GlobalService,
    public dialogRef: MatDialogRef<ImobilizadoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ImobilizadoData
  ) {
    this.formulario = formBuilder.group({
      codigo: [{ value: '' }, [Validators.required, Validators.min(1)]],
      descricao: [{ value: '' }, [ValidatorStringLen(1, 80, true)]],
      grupo: [{ value: '' }],
      grupo_: [{ value: '' }],
      cc: [{ value: '' }],
      cc_: [{ value: '' }],
    });
  }

  ngOnInit(): void {
    this.imobilizado = new ImobilizadoModel();
    this.imobilizado.id_empresa = this.globalService.getEmpresa().id;
    this.imobilizado.id_filial = this.globalService.getLocal().id;
    this.imobilizado.codigo = 0;
    this.idAcao = CadastroAcoes.Inclusao;
    this.setAcao(this.idAcao);
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
    this.dialogRef.close();
  }

  onCancel() {
    this.dialogRef.close();
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
      default:
        break;
    }
  }

  executaAcao() {
    this.imobilizado.codigo = this.formulario.value.codigo;
    this.imobilizado.descricao = this.formulario.value.descricao;
    this.imobilizado.cod_grupo = this.formulario.value.grupo;
    this.imobilizado.cod_cc = this.formulario.value.cc;
    switch (+this.idAcao) {
      case CadastroAcoes.Inclusao:
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
                `Erro Na INclusão ${messageError(error)}`,
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
