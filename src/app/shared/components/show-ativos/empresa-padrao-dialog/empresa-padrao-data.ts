import { EmpresaQuery01Model } from 'src/app/models/empresa-query_01-model';

export class EmpresaPadraoData {
  public empresas: EmpresaQuery01Model[] = [];
  public id_empresa: number = 0;
  public processar: boolean = false;
  public save: boolean = false;
}
