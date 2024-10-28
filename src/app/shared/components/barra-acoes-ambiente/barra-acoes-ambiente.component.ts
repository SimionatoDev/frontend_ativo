import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CadastroAcoes } from '../../classes/cadastro-acoes';

@Component({
  selector: 'barra-acoes-ambiente',
  templateUrl: './barra-acoes-ambiente.component.html',
  styleUrls: ['./barra-acoes-ambiente.component.css'],
})
export class BarraAcoesAmbienteComponent implements OnInit {
  @Input('INCLUIR_AMBIENTE') incluir: boolean = false;

  @Input('EXCLUIR_AMBIENTE') excluir: boolean = false;

  @Output('changeOpcao') changeOpcao = new EventEmitter<number>();

  constructor() {}

  ngOnInit(): void {}

  getAcoes() {
    return CadastroAcoes;
  }

  onChangeOpcao(op: number) {
    this.changeOpcao.emit(op);
  }
}
