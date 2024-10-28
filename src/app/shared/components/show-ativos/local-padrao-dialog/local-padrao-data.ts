import { LocalModel } from 'src/app/models/local-model';

export class LocalPadraoData {
  public locais: LocalModel[] = [];
  public id_local: number = 0;
  public razao?: string = '';
  public save: boolean = false;
  public processar: boolean = false;
}
