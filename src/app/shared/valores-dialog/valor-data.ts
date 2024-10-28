import { ValorModel } from 'src/app/models/valor-model';

export class ValorData {
  public processar: boolean = false;
  public opcao: number = 0;
  public valor: ValorModel = new ValorModel();
}
