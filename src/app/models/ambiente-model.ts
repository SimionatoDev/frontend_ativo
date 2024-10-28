import { EmpresaModel } from './empresa-model';
import { InventarioModel } from './inventario-model';
import { LocalModel } from './local-model';
import { PadraoModel } from './padrao-model';
import { UsuarioModel } from './usuario-model';

export class AmbienteModel {
  public id_retorno: number = 0;
  public mensa_retorno: string = '';
  public padrao: PadraoModel | null = null;
  public usuario: UsuarioModel | null = null;
  public empresa: EmpresaModel | null = null;
  public local: LocalModel | null = null;
  public inventario: InventarioModel | null = null;
}
