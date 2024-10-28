import { DataDDMMYYYY } from '../shared/classes/util';

export class LancamentoModel {
  public id_empresa: number = 0;
  public id_filial: number = 0;
  public id_inventario: number = 0;
  public id_imobilizado: number = 0;
  public id_usuario: number = 0;
  public id_lanca: number = 0;
  public obs: string = '';
  public dtlanca: string = DataDDMMYYYY(new Date());
  public estado: number = 0;
  public new_codigo: number = 0;
  public new_cc: string = '';
  public condicao: number = 9;
  public book: string = 'N';
  public user_insert: number = 0;
  public user_update: number = 0;
  public imo_inv_status: number = 0;
  public inv_descricao: string = '';
  public imo_cod_cc: string = '';
  public imo_cod_grupo: number = 0;
  public imo_descricao: string = '';
  public usu_razao: string = '';
}
