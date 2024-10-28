import { UsuarioQuery01Model } from './../../../models/usuario-query_01-model';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { InventarioModel } from 'src/app/models/inventario-model';
import { LocalModel } from 'src/app/models/local-model';
import { UsuarioModel } from 'src/app/models/usuario-model';
import { ParametroLocal01 } from 'src/app/parametros/parametro-local01';
import { ParametroUsuario01 } from 'src/app/parametros/parametro-usuario01';
import { GlobalService } from 'src/app/services/global.service';
import { InventarioService } from 'src/app/services/inventario.service';
import { LocalService } from 'src/app/services/local.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { ValidatorDate } from 'src/app/shared/Validators/validator-date';
import { ValidatorStringLen } from 'src/app/shared/Validators/validator-string-len';
import { AppSnackbar } from 'src/app/shared/classes/app-snackbar';
import { CadastroAcoes } from 'src/app/shared/classes/cadastro-acoes';

@Component({
  selector: 'app-inventario-view',
  templateUrl: './inventario-view.component.html',
  styleUrls: ['./inventario-view.component.css'],
})
export class InventarioViewComponent implements OnInit {
  formulario: FormGroup;

  inventario: InventarioModel = new InventarioModel();

  locais: LocalModel[] = [];

  responsaveis: UsuarioModel[] = [];

  erro: any;

  acao: string = 'Sem Definição';

  idAcao: number = CadastroAcoes.Inclusao;

  readOnly: boolean = true;

  inscricaoGetInventario!: Subscription;
  inscricaoResponsaveis!: Subscription;
  inscricaoLocais!: Subscription;
  inscricaoRota!: Subscription;
  inscricaoAcao!: Subscription;

  labelCadastro: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private inventarioService: InventarioService,
    private usuariosServices: UsuariosService,
    private globalService: GlobalService,
    private locaisService: LocalService,
    private route: ActivatedRoute,
    private router: Router,
    private appSnackBar: AppSnackbar
  ) {
    this.formulario = formBuilder.group({
      id: [{ value: '', disabled: true }],
      descricao: [{ value: '' }, [ValidatorStringLen(3, 100, true)]],
      data_inicial: [{ value: '' }, [ValidatorDate(true)]],
      data_final: [{ value: '' }, [ValidatorDate(true)]],
      data_encerramento: [{ value: '' }],
      id_filial: [{ value: 0 }, [Validators.required, Validators.min(1)]],
      id_filial_: [{ value: '' }],
      responsavel: [{ value: 0 }, [Validators.required, Validators.min(1)]],
      responsavel_: [{ value: '' }],
    });
    this.inventario = new InventarioModel();
    this.inscricaoRota = route.params.subscribe((params: any) => {
      this.inventario.id_empresa = params.id_empresa;
      this.inventario.id_filial = params.id_local;
      this.inventario.codigo = params.codigo;
      this.idAcao = params.acao;
      this.setAcao(params.acao);
    });
    if (this.idAcao != CadastroAcoes.Inclusao) {
      this.getInventario();
    } else {
      this.setValue();
    }
  }

  ngOnInit(): void {
    this.getResponsaveis();
    this.getLocais();
  }

  ngOnDestroy(): void {
    this.inscricaoGetInventario?.unsubscribe();
    this.inscricaoRota?.unsubscribe();
    this.inscricaoAcao?.unsubscribe();
    this.inscricaoResponsaveis?.unsubscribe();
    this.inscricaoLocais.unsubscribe();
  }

  getInventario() {
    this.inscricaoGetInventario = this.inventarioService
      .getInventario(
        this.inventario.id_empresa,
        this.inventario.id_filial,
        this.inventario.codigo
      )
      .subscribe(
        (data: InventarioModel) => {
          console.log('Deu certo getInventario', data);
          this.inventario = data;
          this.setValue();
        },
        (error: any) => {
          this.inventario = new InventarioModel();
          this.appSnackBar.openFailureSnackBar(
            `${error.error.tabela} - ${error.error.erro} - ${error.error.message}`,
            'OK'
          );
          this.setValue();
        }
      );
  }

  getLocais() {
    let par2 = new ParametroLocal01();

    par2.id_empresa = 1;

    par2.orderby = 'Razão';

    this.inscricaoLocais = this.locaisService
      .getLocaisParametro_01(par2)
      .subscribe(
        (data: LocalModel[]) => {
          this.locais = data;
        },
        (error: any) => {
          this.appSnackBar.openFailureSnackBar(
            `Pesquisa Nos Locais ${error.error.tabela} - ${error.error.erro} - ${error.error.message}`,
            'OK'
          );
        }
      );
  }

  getResponsaveis() {
    const par = new ParametroUsuario01();

    par.id_empresa = this.globalService.getIdEmpresa();

    par.orderby = 'Razão';

    this.inscricaoResponsaveis = this.usuariosServices
      .getusuarios_01(par)
      .subscribe(
        (data: UsuarioModel[]) => {
          this.responsaveis = data;
          //this.parametro.patchValue({ auditores: this.auditor });
        },
        (error: any) => {
          this.appSnackBar.openFailureSnackBar(
            `${error.error.tabela} - ${error.error.erro} - ${error.error.message}`,
            'OK'
          );
        }
      );
  }

  setValue() {
    this.formulario.setValue({
      id:
        this.idAcao == CadastroAcoes.Inclusao ? 'NOVO' : this.inventario.codigo,
      descricao: this.inventario.descricao,
      data_inicial: this.inventario.data_inicial.toString(),
      data_final: this.inventario.data_final.toString(),
      data_encerramento:
        this.inventario.data_encerra == null
          ? 'EM ABERTO'
          : this.inventario.data_encerra,
      responsavel: this.inventario.id_responsavel,
      responsavel_:
        this.idAcao == CadastroAcoes.Consulta ||
        this.idAcao == CadastroAcoes.Exclusao
          ? this.inventario.resp_razao
          : '',
      id_filial: this.inventario.id_filial,
      id_filial_:
        this.idAcao == CadastroAcoes.Consulta ||
        this.idAcao == CadastroAcoes.Exclusao
          ? this.inventario.local_razao
          : '',
    });
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

  getLabelCancel() {
    if (this.idAcao == CadastroAcoes.Consulta) {
      return 'Voltar';
    } else {
      return 'Cancelar';
    }
  }

  onCancel() {
    this.router.navigate(['/inventarios/inventarios']);
  }

  setAcao(op: number) {
    switch (+op) {
      case CadastroAcoes.Inclusao:
        this.acao = 'Gravar';
        this.labelCadastro = 'Inventários - Inclusão.';
        this.readOnly = false;
        break;
      case CadastroAcoes.Edicao:
        this.acao = 'Gravar';
        this.labelCadastro = 'Inventários - Alteração.';
        this.readOnly = false;
        break;
      case CadastroAcoes.Consulta:
        this.acao = 'Voltar';
        this.labelCadastro = 'Inventários - Consulta.';
        this.readOnly = true;
        break;
      case CadastroAcoes.Exclusao:
        this.acao = 'Excluir';
        this.labelCadastro = 'Inventários - Exclusão.';
        this.readOnly = true;
        break;
      default:
        break;
    }
  }

  executaAcao() {
    console.log('Formulario=>', this.formulario.value);
    this.inventario.descricao = this.formulario.value.descricao;
    this.inventario.data_inicial = this.formulario.value.data_inicial;
    this.inventario.data_final = this.formulario.value.data_final;
    this.inventario.id_filial = this.formulario.value.id_filial;
    this.inventario.id_responsavel = this.formulario.value.responsavel;
    console.log('Inventario=>', this.inventario);
    switch (+this.idAcao) {
      case CadastroAcoes.Inclusao:
        this.inventario.user_insert = this.globalService.getUsuario().id;
        this.globalService.setSpin(true);
        this.inscricaoAcao = this.inventarioService
          .inventarioInsert(this.inventario)
          .subscribe(
            async (data: InventarioModel) => {
              this.globalService.setSpin(false);
              this.onCancel();
            },
            (error: any) => {
              this.globalService.setSpin(false);
              this.appSnackBar.openFailureSnackBar(
                `Erro Na INclusão ${error.error.tabela} - ${error.error.erro} - ${error.error.message}`,
                'OK'
              );
            }
          );
        break;
      case CadastroAcoes.Edicao:
        this.inventario.user_update = this.globalService.getUsuario().id;
        this.inscricaoAcao = this.inventarioService
          .inventarioUpdate(this.inventario)
          .subscribe(
            async (data: any) => {
              this.globalService.setSpin(false);
              this.onCancel();
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
        this.inscricaoAcao = this.inventarioService
          .inventarioDelete(
            this.inventario.id_empresa,
            this.inventario.id_filial,
            this.inventario.codigo
          )
          .subscribe(
            async (data: any) => {
              this.globalService.setSpin(false);
              this.onCancel();
            },
            (error: any) => {
              this.globalService.setSpin(false);
              this.appSnackBar.openFailureSnackBar(
                `Erro Na Exclusao ${error.error.tabela} - ${error.error.erro} - ${error.error.message}`,
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

  touchedOrDirty(campo: string): boolean {
    if (
      this.formulario.get(campo)?.touched ||
      this.formulario.get(campo)?.dirty
    ) {
      return true;
    }
    return false;
  }

  getValidfield(field: string): boolean {
    return (
      this.formulario.get(field)?.errors?.ValidatorStringLen &&
      this.touchedOrDirty(field)
    );
  }

  getMensafield(field: string): string {
    return this.formulario.get(field)?.errors?.message;
  }
}
