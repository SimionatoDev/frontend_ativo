import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { CentrocustoModel } from 'src/app/models/centrocusto-model';
import { FotoModel } from 'src/app/models/foto-model';
import { LancamentoModel } from 'src/app/models/lancamento-model';
import { ParametroFoto01 } from 'src/app/parametros/parametro-foto01';
import { FotoService } from 'src/app/services/foto.service';
import { GlobalService } from 'src/app/services/global.service';
import { LancamentoService } from 'src/app/services/lancamento.service';
import { AppSnackbar } from 'src/app/shared/classes/app-snackbar';
import { CadastroAcoes } from 'src/app/shared/classes/cadastro-acoes';
import { Condicoes } from 'src/app/shared/classes/condicoes';
import { FotosAtivo } from 'src/app/shared/classes/fotos-ativo';
import { RetornoLancamento } from 'src/app/shared/classes/retorno-lancamento';
import { SimNao } from 'src/app/shared/classes/sim-nao';
import { SituacaoInventario } from 'src/app/shared/classes/situacao-inventario';
import { messageError } from 'src/app/shared/classes/util';
import { ValidatorCondicao } from 'src/app/shared/Validators/validador-condicao';
import { ValidatorCC } from 'src/app/shared/Validators/validator-cc';

@Component({
  selector: 'app-imoinventario-view',
  templateUrl: './imoinventario-view.component.html',
  styleUrls: ['./imoinventario-view.component.css'],
})
export class ImoinventarioViewComponent implements OnInit {
  @Input('lancamento') lancamento: LancamentoModel = new LancamentoModel();
  @Input('ccs') ccs: CentrocustoModel[] = [];
  @Input('idAcao') idAcao: number = 0;
  @Output('submmit') submmit = new EventEmitter<RetornoLancamento>();

  inscricaoAcao!: Subscription;
  inscricaoFoto!: Subscription;
  formulario: FormGroup;
  acao: string = '';
  labelCadastro: string = '';
  readOnly: boolean = false;
  gravando: boolean = false;
  focusEntrada: boolean = false;
  focusCancelar: boolean = false;
  situacoes: SituacaoInventario[] = this.globalService
    .getSituacoesInventario()
    .filter((sit) => sit.id >= 0);

  ccs_alterados: CentrocustoModel[] = [];
  lsCondicoes: Condicoes[] = [];
  respostas: SimNao[] = [];

  fotos: FotoModel[] = [];


  constructor(
    private formBuilder: FormBuilder,
    private globalService: GlobalService,
    private appSnackBar: AppSnackbar,
    private lancamentoService: LancamentoService,
    private fotoService: FotoService
  ) {
    this.formulario = formBuilder.group({
      usuario: [{ value: '' }],
      nlanc: [{ value: '' }],
      data: [{ value: '' }],
      situacao: [{ value: '' }],
      situacao_: [{ value: '' }],
      codigo: [{ value: '' }],
      novo_codigo: [{ value: '' }, [Validators.required, Validators.min(0)]],
      descricao: [{ value: '' }],
      cc_original: [{ value: '' }],
      cc_novo: [{ value: '' }, [Validators.required, ValidatorCC()]],
      cc_novo_: [{ value: '' }],
      condicao: [{ value: '' }, [Validators.required, ValidatorCondicao()]],
      condicao_: [{ value: '' }],
      book: [{ value: '' }],
      book_: [{ value: '' }],
      obs: [{ value: '' }],
    });
    const sim: SimNao = new SimNao();
    sim.sigla = 'S';
    sim.descricao = 'SIM';
    const nao: SimNao = new SimNao();
    nao.sigla = 'N';
    nao.descricao = 'NÃO';
    this.respostas.push(sim);
    this.respostas.push(nao);
    globalService.getCondicoes().forEach((obj) => {
      if (obj.idx > 0) {
        let cond: Condicoes = new Condicoes(obj.idx, obj.descricao);
        this.lsCondicoes.push(cond);
      }
    });
  }

  ngOnInit(): void {
    this.ccs_alterados = [...this.ccs];
    this.ccs_alterados[0].descricao = 'Centro Custo Não Alterado!';
    this.setAcao(this.idAcao);
    this.setValue();
    if (this.idAcao == CadastroAcoes.Consulta) {
      this.getFotos();
    }
  }

  ngOnDestroy(): void {
    this.inscricaoAcao?.unsubscribe();
    this.inscricaoFoto?.unsubscribe();
  }

  onSubmit() {
    if (this.formulario.valid || this.idAcao == CadastroAcoes.Exclusao) {
      this.executaAcao();
    } else {
      this.formulario.markAllAsTouched();
      this.appSnackBar.openSuccessSnackBar(
        `Formulário Com Campos Inválidos.`,
        'OK'
      );
    }
  }

  getAcoes() {
    return CadastroAcoes;
  }

  getFotos() {
    let par = new ParametroFoto01();

    par.id_empresa = this.lancamento.id_empresa;

    par.id_local = this.lancamento.id_filial;

    par.id_inventario = this.lancamento.id_inventario;

    par.id_imobilizado = this.lancamento.id_imobilizado;

    par.contador = 'N';

    this.globalService.setSpin(true);

    this.inscricaoFoto = this.fotoService.getFotosParametro_01(par).subscribe(
      (data: FotoModel[]) => {
        this.globalService.setSpin(false);
        this.fotos = data;
        console.log('Fotos', this.fotos);
      },
      (error: any) => {
        this.globalService.setSpin(false);
        this.fotos = [];
        this.appSnackBar.openFailureSnackBar(
          `Pesquisa Nas Fotos  ${messageError(error)}`,
          'OK'
        );
      }
    );
  }

  setAcao(op: number) {
    this.focusEntrada = false;
    this.focusCancelar = false;
    switch (+op) {
      case CadastroAcoes.Inclusao:
        this.acao = 'Gravar';
        this.labelCadastro = `Inclusão`;
        this.readOnly = false;
        this.focusEntrada = true;
        break;
      case CadastroAcoes.Edicao:
        this.acao = 'Gravar';
        this.labelCadastro = `Alteração`;
        this.readOnly = false;
        this.focusEntrada = true;
        break;
      case CadastroAcoes.Consulta:
        this.acao = 'Voltar';
        this.labelCadastro = `Consulta`;
        this.readOnly = true;
        this.focusCancelar = true;
        break;
      case CadastroAcoes.Exclusao:
        this.acao = 'Excluir';
        this.labelCadastro = `Exclusão`;
        this.focusEntrada = false;
        this.readOnly = true;
        break;
      default:
        this.acao = '';
        this.labelCadastro = '';
        break;
    }
  }

  executaAcao() {
    this.lancamento.new_codigo = this.formulario.value.novo_codigo;
    this.lancamento.new_cc = this.formulario.value.cc_novo;
    this.lancamento.condicao = this.formulario.value.condicao;
    this.lancamento.book = this.formulario.value.book;
    this.lancamento.obs = this.formulario.value.obs;

    if (this.formulario.value.situacao !== 5) {
      if (
        this.lancamento.new_codigo != 0 &&
        this.lancamento.id_imobilizado != this.lancamento.new_codigo &&
        this.lancamento.new_cc.trim() != '' &&
        this.lancamento.imo_cod_cc != this.lancamento.new_cc
      ) {
        this.lancamento.estado = 4;
      } else {
        this.lancamento.estado = 1;
        if (
          this.lancamento.new_codigo != 0 &&
          this.lancamento.id_imobilizado != this.lancamento.new_codigo
        ) {
          this.lancamento.estado = 2;
        }
        if (
          this.lancamento.new_cc.trim() != '' &&
          this.lancamento.imo_cod_cc != this.lancamento.new_cc
        ) {
          this.lancamento.estado = 3;
        }
      }
    } else {
      this.lancamento.estado = 5;
    }

    switch (+this.idAcao) {
      case CadastroAcoes.Inclusao:
        this.globalService.setSpin(true);
        this.lancamento.user_insert = this.globalService.getUsuario().id;
        this.inscricaoAcao = this.lancamentoService
          .lancamentoInsert(this.lancamento)
          .subscribe(
            async (data: LancamentoModel) => {
              this.globalService.setSpin(false);
              this.onRetorno(this.idAcao);
            },
            (error: any) => {
              this.gravando = false;
              console.log('Error', error);
              this.appSnackBar.openFailureSnackBar(
                ` Falha Na Inclusão ${messageError(error)}`,
                'OK'
              );
            }
          );
        break;
      case CadastroAcoes.Edicao:
        this.lancamento.user_update = this.globalService.getUsuario().id;
        this.globalService.setSpin(true);
        this.inscricaoAcao = this.lancamentoService
          .lancamentoUpdate(this.lancamento)
          .subscribe(
            async (data: LancamentoModel) => {
              this.globalService.setSpin(false);
              this.onRetorno(this.idAcao);
            },
            (error: any) => {
              this.gravando = false;
              console.log('Error', error.error);
              this.appSnackBar.openFailureSnackBar(
                ` ${messageError(error)}`,
                'OK'
              );
            }
          );
        break;
      case CadastroAcoes.Exclusao:
        this.globalService.setSpin(true);
        this.inscricaoAcao = this.lancamentoService
          .lancamentoDelete(
            this.lancamento.id_empresa,
            this.lancamento.id_filial,
            this.lancamento.id_inventario,
            this.lancamento.id_imobilizado
          )
          .subscribe(
            async (data: any) => {
              this.globalService.setSpin(false);
              this.onRetorno(this.idAcao);
            },
            (error: any) => {
              this.gravando = false;
              this.appSnackBar.openFailureSnackBar(
                `Erro Na Exclusao ${messageError(error)}`,
                'OK'
              );
            }
          );
        break;
      default:
        break;
    }
  }

  getLabelCancel() {
    if (this.idAcao == CadastroAcoes.Consulta) {
      return 'Voltar';
    } else {
      return 'Cancelar';
    }
  }

  setValue() {
    const idx = this.ccs.findIndex((cc) => {
      return cc.codigo.trim() == this.lancamento.imo_cod_cc.trim();
    });
    let idx2 = this.lsCondicoes.findIndex((cond) => {
      return cond.idx == this.lancamento.condicao;
    });
    if (idx == -1) {
      idx2 = this.lsCondicoes.length - 1;
    }
    const idx3 = this.ccs_alterados.findIndex((cc) => {
      return cc.codigo.trim() == this.lancamento.new_cc;
    });
    this.formulario.setValue({
      usuario: this.lancamento.usu_razao, //this.data.lancamento.id_usuario,
      nlanc: this.lancamento.id_lanca,
      data: this.lancamento.dtlanca,
      situacao: this.lancamento.estado,
      situacao_:
        this.globalService.getSituacoesInventario()[this.lancamento.estado]
          .descricao,
      codigo: this.lancamento.id_imobilizado,
      novo_codigo: this.lancamento.new_codigo,
      descricao: this.lancamento.imo_descricao,
      cc_original: idx == -1 ? 'C.C. NÃO CADASTRADO!' : this.ccs[idx].descricao,
      cc_novo: this.lancamento.new_cc,
      cc_novo_: idx3 == -1 ? 'C.C. NÃO CADASTRADO!' : this.ccs_alterados[idx3].descricao,
      condicao: this.lancamento.condicao,
      condicao_:
        this.idAcao == CadastroAcoes.Consulta ||
        this.idAcao == CadastroAcoes.Exclusao
          ? this.lsCondicoes[idx2].descricao
          : '',
      book: this.lancamento.book,
      book_:
        this.idAcao == CadastroAcoes.Consulta ||
        this.idAcao == CadastroAcoes.Exclusao
          ? this.respostas[this.lancamento.book == 'S' ? 0 : 1].descricao
          : '',
      obs: this.lancamento.obs,
    });
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


  onRetorno(op: number) {
    const retorno: RetornoLancamento = new RetornoLancamento();
    retorno.opcao = op;
    retorno.lancamento = this.lancamento;
    this.submmit.emit(retorno);
  }

  onCancelar() {
    const retorno: RetornoLancamento = new RetornoLancamento();
    retorno.opcao = CadastroAcoes.None;
    retorno.lancamento = new LancamentoModel();
    this.submmit.emit(retorno);
  }


  getFotosAtivo():FotosAtivo[]{

    let  result:FotosAtivo[] =  [];

    let  idx:number = 1;

    let ct:number = 0;

    if (this.fotos.length == 0){
      return result;
    }

    let tempo:FotosAtivo = new FotosAtivo(idx,[]);

    if(this.fotos.length > 0) {

      this.fotos.forEach(item => {

        if (ct ==3){
           result.push(tempo);
           ct = 0;
           idx++;
           tempo = new FotosAtivo(idx,[]);
        }
        tempo.fotos.push(item);
        ct++;
      });
      if (tempo.fotos.length > 0){
        result.push(tempo);
      }
    }
    return result;
  }
}
