import { LancamentoModel } from 'src/app/models/lancamento-model';
import { CadastroAcoes } from './cadastro-acoes';

export class RetornoLancamento {
  public opcao: CadastroAcoes = CadastroAcoes.None;
  public lancamento: LancamentoModel = new LancamentoModel();
}
