import { LocalService } from './../../../services/local.service';
import { GlobalService } from './../../../services/global.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ValidatorStringLen } from 'src/app/shared/Validators/validator-string-len';
import { ValidatorCep } from 'src/app/shared/Validators/validator-cep';
import { ValidatorCnpjCpf } from 'src/app/shared/Validators/validator-Cnpj-Cpf';
import { ValidatorDate } from 'src/app/shared/Validators/validator-date';
import { DropdownService } from 'src/app/shared/services/dropdown.service';
import { EstadoModel } from 'src/app/Models/estado-model';
import { CadastroAcoes } from 'src/app/shared/classes/cadastro-acoes';
import { AppSnackbar } from 'src/app/shared/classes/app-snackbar';
import { messageError } from 'src/app/shared/classes/util';
import { LocalModel } from 'src/app/models/local-model';

@Component({
  selector: 'app-local-view',
  templateUrl: './local-view.component.html',
  styleUrls: ['./local-view.component.css'],
})
export class LocalViewComponent implements OnInit {
  formulario: FormGroup;

  local: LocalModel = new LocalModel();

  erro: any;

  acao: string = 'Sem Definição';

  idAcao: number = CadastroAcoes.Inclusao;

  readOnly: boolean = true;

  incricaoGetLocal!: Subscription;
  inscricaoGetGrupo!: Subscription;
  inscricaoRota!: Subscription;
  inscricaoAcao!: Subscription;
  inscricaoUf!: Subscription;

  durationInSeconds = 2;

  labelCadastro: string = '';

  ufs: EstadoModel[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private estadosSrv: DropdownService,
    private route: ActivatedRoute,
    private router: Router,
    private appSnackBar: AppSnackbar,
    private globalService: GlobalService,
    private locaisService: LocalService
  ) {
    this.formulario = formBuilder.group({
      id: [{ value: '', disabled: true }],
      razao: [{ value: '' }, [ValidatorStringLen(3, 65, true)]],
      cadastr: [{ value: '' }, [ValidatorDate(true)]],
      fantasi: [{ value: '' }, [ValidatorStringLen(3, 25, true)]],
      cnpj_cpf: [{ value: '' }, [ValidatorCnpjCpf(false)]],
      inscri: [{ value: '' }, [ValidatorStringLen(0, 20)]],
      ruaf: [{ value: '' }, [ValidatorStringLen(3, 80, false)]],
      nrof: [{ value: '' }, [ValidatorStringLen(1, 10, false)]],
      complementof: [{ value: '' }, [ValidatorStringLen(0, 30)]],
      bairrof: [{ value: '' }, [ValidatorStringLen(3, 40, false)]],
      cidadef: [{ value: '' }, [ValidatorStringLen(3, 40, false)]],
      uff: [{ value: '' }, [ValidatorStringLen(2, 2, false)]],
      uff_: [{ value: '' }],
      cepf: [{ value: '' }, [ValidatorCep(false)]],
      tel1: [{ value: '' }, [ValidatorStringLen(0, 23, false)]],
      tel2: [{ value: '' }, [ValidatorStringLen(0, 23)]],
      emailf: [{ value: '' }, [Validators.email]],
      obs: [{ value: '' }, [ValidatorStringLen(0, 200)]],
    });
    this.local = new LocalModel();
    this.inscricaoRota = route.params.subscribe((params: any) => {
      this.local.id_empresa = params.id_empresa;
      this.local.id = params.id_local;
      this.idAcao = params.acao;
      this.setAcao(params.acao);
    });
  }

  ngOnInit(): void {
    if (this.idAcao == CadastroAcoes.Inclusao) {
      this.local = new LocalModel();
      this.local.id_empresa = this.globalService.getIdEmpresa();
    } else {
      this.getLocal();
    }

    this.getUfs();

    this.setValue();
  }

  ngOnDestroy(): void {
    this.incricaoGetLocal?.unsubscribe();
    this.inscricaoGetGrupo?.unsubscribe();
    this.inscricaoRota?.unsubscribe();
    this.inscricaoAcao?.unsubscribe();
    this.inscricaoUf?.unsubscribe();
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
    const par = this.globalService.estadoFind('local');
    if (par != null) {
      let config = par.getParametro();
      Object(config).new = this.idAcao == CadastroAcoes.Inclusao ? true : false;
      Object(config).id_retorno = this.local.id;
      par.parametro = JSON.stringify(config);
      this.globalService.estadoSave(par);
    }
    this.router.navigate(['/locais/locais', 'SIM']);
  }

  onCancel() {
    const par = this.globalService.estadoFind('local');
    if (par != null) {
      let config = par.getParametro();
      Object(config).new = false;
      Object(config).id_retorno =
        this.idAcao == CadastroAcoes.Consulta ? this.local.id : 0;
      par.parametro = JSON.stringify(config);
      this.globalService.estadoSave(par);
    }
    this.router.navigate(['/locais/locais', 'SIM']);
  }

  getUfs() {
    this.inscricaoUf = this.estadosSrv.getEstados().subscribe(
      (data: EstadoModel[]) => {
        this.ufs = data;
      },
      (error: any) => {
        this.appSnackBar.openFailureSnackBar(
          `Pesquisa Cadastrado De Estados ${error.error.tabela} - ${error.error.erro} - ${error.error.message}`,
          'OK'
        );
      }
    );
  }

  getLocal() {
    this.globalService.setSpin(true);
    this.incricaoGetLocal = this.locaisService
      .getLocal(this.local.id_empresa, this.local.id)
      .subscribe(
        (data: LocalModel) => {
          this.globalService.setSpin(false);
          this.local = data;
          this.setValue();
        },
        (error: any) => {
          this.globalService.setSpin(false);
          this.appSnackBar.openFailureSnackBar(
            `Pesquisa Nos Locais ${error.error.tabela} - ${error.error.erro} - ${error.error.message}`,
            'OK'
          );
        }
      );
  }

  setValue() {
    this.formulario.setValue({
      id: this.local.id,
      razao: this.local.razao,
      cadastr: this.local.cadastr,
      cnpj_cpf: this.local.cnpj_cpf,
      inscri: this.local.inscri,
      fantasi: this.local.fantasi,
      ruaf: this.local.ruaf,
      nrof: this.local.nrof,
      complementof: this.local.complementof,
      bairrof: this.local.bairrof,
      cidadef: this.local.cidadef,
      uff: this.local.uff,
      uff_:
        this.idAcao == CadastroAcoes.Consulta ||
        this.idAcao == CadastroAcoes.Exclusao
          ? this.local.uff
          : '',
      cepf: this.local.cepf,
      tel1: this.local.tel1,
      tel2: this.local.tel2,
      emailf: this.local.email,
      obs: this.local.obs,
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
        this.labelCadastro = 'Locais - Inclusão.';
        this.readOnly = false;
        break;
      case CadastroAcoes.Edicao:
        this.acao = 'Gravar';
        this.labelCadastro = 'Locais - Alteração.';
        this.readOnly = false;
        break;
      case CadastroAcoes.Consulta:
        this.acao = 'Voltar';
        this.labelCadastro = 'Locais - Consulta.';
        this.readOnly = true;
        break;
      case CadastroAcoes.Exclusao:
        this.acao = 'Excluir';
        this.labelCadastro = 'Locais - Exclusão.';
        this.readOnly = true;
        break;
      default:
        break;
    }
  }

  executaAcao() {
    this.local.cnpj_cpf = this.formulario.value.cnpj_cpf;
    this.local.razao = this.formulario.value.razao;
    this.local.fantasi = this.formulario.value.fantasi;
    this.local.inscri = this.formulario.value.inscri;
    this.local.cadastr = this.formulario.value.cadastr;
    this.local.ruaf = this.formulario.value.ruaf;
    this.local.nrof = this.formulario.value.nrof;
    this.local.complementof = this.formulario.value.complementof;
    this.local.bairrof = this.formulario.value.bairrof;
    this.local.cidadef = this.formulario.value.cidadef;
    this.local.uff = this.formulario.value.uff;
    this.local.cepf = this.formulario.value.cepf;
    this.local.tel1 = this.formulario.value.tel1;
    this.local.tel2 = this.formulario.value.tel2;
    this.local.email = this.formulario.value.emailf;
    this.local.obs = this.formulario.value.obs;
    switch (+this.idAcao) {
      case CadastroAcoes.Inclusao:
        this.local.user_insert = this.globalService.getUsuario().id;
        this.globalService.setSpin(true);
        this.inscricaoAcao = this.locaisService
          .localInsert(this.local)
          .subscribe(
            async (data: LocalModel) => {
              this.local.id = data.id;
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
        this.local.user_update = this.globalService.getUsuario().id;
        this.inscricaoAcao = this.locaisService
          .localUpdate(this.local)
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
        this.inscricaoAcao = this.locaisService
          .localDelete(this.local.id_empresa, this.local.id)
          .subscribe(
            async (data: any) => {
              this.globalService.setSpin(false);
              if (this.globalService.padrao.id_local_padrao == this.local.id) {
                this.globalService.padrao.id_local_padrao = 0;
                this.globalService.setTrocaPadrao();
              }
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
