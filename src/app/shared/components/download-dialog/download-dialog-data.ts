import { ParametroModel } from "src/app/models/parametro-model";

export class DownloadDialogData {
  public titulo: string       = 'Atenção';
  public escopo:string        = 'T';
  public labelBottonSim       = 'SIM';
  public labelBottomNao       = 'NÃO';
  public resposta: string     = '';
  public id_empresa: number = 0;
  public id_filial: number = 0;
  public id_inventario: number = 0;
  public pagina:number = 0;
  public parametro:ParametroModel = new ParametroModel()
}
