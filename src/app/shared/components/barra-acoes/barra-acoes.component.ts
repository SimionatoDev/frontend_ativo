import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MensagensBotoes } from '../../classes/util';
import { CadastroAcoes } from '../../classes/cadastro-acoes';

@Component({
  selector: 'barra-acoes',
  templateUrl: './barra-acoes.component.html',
  styleUrls: ['./barra-acoes.component.css'],
})
export class BarraAcoesComponent implements OnInit {
  @Input('COPY_ESTRUTURA') copy: boolean = false;
  @Input('VISUALIZAR_ESTRUTURA') visualizar: boolean = false;
  @Input('SUBCONTA') subconta: boolean = false;
  @Input('CONSULTAR') consulta: boolean = true;
  @Input('FOTOS') fotos: boolean = false;
  @Input('ALTERAR') alterar: boolean = true;
  @Input('EXCLUIR') excluir: boolean = true;
  @Input('FINACEIRO') financeiro: boolean = false;
  @Input('MULTEDICAO') mult_edicao: boolean = false;
  @Input('BARRA_VERTICAL') barra: boolean = false;
  @Input('BARRA_EXCLUIR') barra_excluir: boolean = true;
  @Input('BARRA_ATIVIDADES') barra_atividades: boolean = false;
  @Input('BARRA_DASHBOARDV1') barra_dashboardv1: boolean = false;
  @Input('BARRA_FINANCEIRO') barra_financeiro: boolean = false;
  @Input('BARRA_MULTEDICAO') barra_mult_edicao: boolean = false;
  @Input('BARRA_USUARIOS') barra_usuarios: boolean = false;
  @Input('BARRA_VALORES') barra_valores: boolean = false;
  @Input('BARRA_NFE') barra_nfe: boolean = false;
  @Output('changeOpcao') changeOpcao = new EventEmitter<number>();

  constructor() {}

  ngOnInit(): void {}

  getTexto() {
    return MensagensBotoes;
  }

  getAcoes() {
    return CadastroAcoes;
  }

  onChangeOpcao(op: number) {
    this.changeOpcao.emit(op);
  }
}
