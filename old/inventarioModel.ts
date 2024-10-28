export class InventarioModel {
  public id_empresa: number = 0;
  public id: number = 0;
  public id_cliente: number = 0;
  public id_responsavel: number = 0;
  public data_inicial: Date = new Date();
  public data_final: Date = new Date();
  public data_encerra: any = null;
  public descricao: string = '';
  public laudo: string = '';
  public user_insert: number = 0;
  public user_update: number = 0;
  public _razao_cliente: string = '';
  public _nome_responsavel: string = '';
}
