import { CadastroEnum } from "../../enum/cadastro-enum.enum";

export class SeachDialogData {
  public dono:String = "";
  public cadastro: CadastroEnum = CadastroEnum.NaoEspecificado;
  public pesquisarPor:Number = 0;
  public opcaoTodos:Boolean = false;
  public retorno?: any = null;
  public retornoTodos:boolean = false;
  public cancelar:Boolean = false;
}
