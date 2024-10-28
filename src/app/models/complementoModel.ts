export class ComplementoModel {
  public id_empresa: number = 0;
  public id_inventario: number = 0;
  public codigo: string = '';
  public local: string = '';
  public lote: string = '';
  public saldo: number = 0;
  public valor_medio: number = 0;
  public status_inventario: string = '';
  public id_contagem: number = 0;
  public qtd_contagem: number = 0;
  public qtd_ajuste: number = 0;
  public taxa_juros: number = 0;
  public encerramento_ct: string = '';
  public user_insert: number = 0;
  public user_update: number = 0;
}
