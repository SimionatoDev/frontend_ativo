import { UsuarioQuery_04Model } from 'src/app/models/usuario-query_04-model';
import { CadastroAcoes } from './cadastro-acoes';
export class DisplayAuditores {
  public checked: boolean = false;
  public acao: number = CadastroAcoes.None;
  public vazia: boolean = false;
  public auditor: UsuarioQuery_04Model = new UsuarioQuery_04Model();
}
