import { InventarioModel } from 'src/app/models/inventario-model';

export class InventarioPadraoData {
  public id_empresa: number = 0;
  public id_filial: number = 0;
  public inventarios: InventarioModel[] = [];
  public id_inventario: number = 0;
  public descricao: string = '';
  public processar: boolean = false;
}
