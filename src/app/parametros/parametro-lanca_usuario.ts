import { CadastroAcoes } from '../shared/classes/cadastro-acoes';

export class ParametroLanca_usuario {
  public acao: CadastroAcoes = CadastroAcoes.None;
  public id_empresa: number = 0;
  public id_filial: number = 0;
  public id_inventario: number = 0;
  public id_usuario: number = 0;
  public user_insert: number = 0;
  public user_update: number = 0;
}
