import { CentrocustoModel } from 'src/app/models/centrocusto-model';
import { LancamentoModel } from 'src/app/models/lancamento-model';

export class LancaData {
  public processar: boolean = false;
  public opcao: number = 0;
  public lancamento: LancamentoModel = new LancamentoModel();
  public ccs: CentrocustoModel[] = [];
}
