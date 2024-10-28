import { PadraoModel } from './../models/padrao-model';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { Injectable, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioModel } from '../models/usuario-model';
import { EmpresaModel } from '../models/empresa-model';
import { InventarioModel } from '../models/inventario-model';
import { GuardiaoMestre } from '../shared/classes/guardiao-mestre';
import { GuardiaoOpcoes } from '../shared/classes/Guardiao-Opcoes';
import { CadastroAcoes } from '../shared/classes/cadastro-acoes';
import { ParametroModel } from '../models/parametro-model';
import { LocalModel } from '../models/local-model';
import { EstadoProduto } from '../shared/classes/estado-produto';
import { SituacaoInventario } from '../shared/classes/situacao-inventario';
import { Condicoes } from '../shared/classes/condicoes';
import { Origem } from '../shared/classes/Origem';

@Injectable({
  providedIn: 'root',
})
export class GlobalService {
  usuario: UsuarioModel;
  empresa: EmpresaModel;
  local: LocalModel;
  inventario: InventarioModel;
  padrao: PadraoModel;
  logado: boolean = false;
  showSpin: boolean = false;
  estadoProduto: EstadoProduto[] = [];
  lsCondicoes: Condicoes[] = [];
  lsOrigens: Origem[] = [];

  guadiaoMestre: GuardiaoMestre[] = [];
  guardiaoOpcoes: GuardiaoOpcoes[] = [];
  lsParametros: ParametroModel[] = [];

  situacoesInventario: SituacaoInventario[] = [];
  situacoesInventarioPar: SituacaoInventario[] = [];

  shomMenuEmitter = new EventEmitter<boolean>();
  showSpinEmitter = new EventEmitter<boolean>();
  showEmpresaEmitter = new EventEmitter<boolean>();
  showUsuarioEmitter = new EventEmitter();
  changeInventarioEmitter = new EventEmitter();
  changeLocalEmitter = new EventEmitter();
  changePadraoEmitter = new EventEmitter<boolean>();


  public mouseX: number = -1;
  public mouseY: number = -1;


  constructor(private usuarioService: UsuariosService, private router: Router) {
    this.usuario = new UsuarioModel();
    this.logado = false;
    this.empresa = new EmpresaModel();
    this.inventario = new InventarioModel();
    this.local = new LocalModel();
    this.padrao = new PadraoModel();
    this.logado = false;
    this.loadSituacoesInventario();
    this.loadSituacoesInventarioPar();
    this.loadEstadoProduto();
    this.loadGuardiaoMestre();
    this.loadGuardiaoOpcoes();
    this.loadCondicoes();
    this.loadlOrigens();
  }

  loadlOrigens() {
    this.lsOrigens = [new Origem('P', 'Planilha'), new Origem('M', 'Manual')];
  }

  getOrigens(): Origem[] {
    return this.lsOrigens;
  }

  loadCondicoes() {
    this.lsCondicoes = [
      new Condicoes(0, 'Todos'),
      new Condicoes(1, 'Bom'),
      new Condicoes(2, 'Regular'),
      new Condicoes(3, 'Ruim'),
      new Condicoes(9, 'Não Classificado'),
    ];
  }

  loadSituacoesInventario() {
    this.situacoesInventario = [];
    let sit: SituacaoInventario = new SituacaoInventario();
    sit.id = 0;
    sit.descricao = 'Não Inventariado';
    this.situacoesInventario.push(sit);

    sit = new SituacaoInventario();
    sit.id = 1;
    sit.descricao = 'Inventariado';
    this.situacoesInventario.push(sit);

    sit = new SituacaoInventario();
    sit.id = 2;
    sit.descricao = 'Inv. Troca Código';
    this.situacoesInventario.push(sit);

    sit = new SituacaoInventario();
    sit.id = 3;
    sit.descricao = 'Inv. Troca CC';
    this.situacoesInventario.push(sit);

    sit = new SituacaoInventario();
    sit.id = 4;
    sit.descricao = 'Inv. Ambos Alterados';
    this.situacoesInventario.push(sit);

    sit = new SituacaoInventario();
    sit.id = 5;
    sit.descricao = 'Inv. Não Encontrado';
    this.situacoesInventario.push(sit);

    sit = new SituacaoInventario();
    sit.id = 6;
    sit.descricao = 'Inv. Baixado';
    this.situacoesInventario.push(sit);
  }

  getSituacoesInventario(): SituacaoInventario[] {
    return this.situacoesInventario;
  }

  loadSituacoesInventarioPar() {
    this.situacoesInventarioPar = [];
    let sit: SituacaoInventario = new SituacaoInventario();

    sit = new SituacaoInventario();
    sit.id = -1;
    sit.descricao = 'Todos Os Imobilizados';
    this.situacoesInventarioPar.push(sit);

    sit = new SituacaoInventario();
    sit.id = 0;
    sit.descricao = 'Não Inventariado';
    this.situacoesInventarioPar.push(sit);

    sit = new SituacaoInventario();
    sit.id = 1;
    sit.descricao = 'Inventariado Sem Alterações';
    this.situacoesInventarioPar.push(sit);

    sit = new SituacaoInventario();
    sit.id = 90;
    sit.descricao = 'Todos Os Inventariados Sem restrição';
    this.situacoesInventarioPar.push(sit);

    sit = new SituacaoInventario();
    sit.id = 2;
    sit.descricao = 'Inv. Troca Código';
    this.situacoesInventarioPar.push(sit);

    sit = new SituacaoInventario();
    sit.id = 3;
    sit.descricao = 'Inv. Troca CC';
    this.situacoesInventarioPar.push(sit);

    sit = new SituacaoInventario();
    sit.id = 4;
    sit.descricao = 'Inv. Ambos Alterados';
    this.situacoesInventarioPar.push(sit);

    sit = new SituacaoInventario();
    sit.id = 5;
    sit.descricao = 'Inv. Não Encontrado';
    this.situacoesInventarioPar.push(sit);

    sit = new SituacaoInventario();
    sit.id = 6;
    sit.descricao = 'Inv. Baixado';
    this.situacoesInventarioPar.push(sit);
  }
  getSituacoesInventarioPar(): SituacaoInventario[] {
    return this.situacoesInventarioPar;
  }

  loadEstadoProduto() {
    let estado: EstadoProduto = new EstadoProduto();
    estado.codigo = 1;
    estado.descricao = 'NOVO';
    this.estadoProduto.push(estado);

    estado = new EstadoProduto();
    estado.codigo = 2;
    estado.descricao = 'USADO';
    this.estadoProduto.push(estado);
  }

  getCondicoes(): Condicoes[] {
    return this.lsCondicoes;
  }

  getEstados(): EstadoProduto[] {
    return this.estadoProduto;
  }

  getEstado(idx: number): string {
    let retorno: string = '';
    const est = this.estadoProduto.find((x) => x.codigo == idx);
    if (est !== null) {
      if (typeof est !== 'undefined') retorno = est?.descricao;
    }
    return retorno;
  }
  getUsuario(): UsuarioModel {
    return this.usuario;
  }

  setUsuario(user: UsuarioModel) {
    this.usuario = user;
  }

  setTrocaUsuario() {
    this.showUsuarioEmitter.emit();
  }

  getEmpresa(): EmpresaModel {
    return this.empresa;
  }

  setEmpresa(emp: EmpresaModel) {
    this.empresa = emp;
  }

  setTrocaEmpresa() {
    if (this.empresa.id == 0) {
      this.showEmpresaEmitter.emit(false);
    } else {
      this.showEmpresaEmitter.emit(true);
    }
  }

  getInventario(): InventarioModel {
    return this.inventario;
  }

  setInventario(inventario: InventarioModel) {
    this.inventario = inventario;
  }

  setTrocaInventario() {
    this.changeInventarioEmitter.emit();
  }

  getLocal(): LocalModel {
    return this.local;
  }

  setLocal(local: LocalModel) {
    this.local = local;
  }

  setTrocaLocal() {
    this.changeLocalEmitter.emit();
  }

  setPadrao(value: PadraoModel) {
    this.padrao = value;
  }

  getPadrao(): PadraoModel {
    return this.padrao;
  }

  setTrocaPadrao() {
    console.log('Troquei Padrao');
    this.changePadraoEmitter.emit(true);
  }

  setLogado(value: boolean) {
    this.shomMenuEmitter.emit(value);
    this.logado = value;
    this.router.navigate(['/']);
  }

  getLogado(): boolean {
    return this.logado;
  }

  getIdEmpresa(): number {
    return this.empresa.id;
  }

  getNomeusuarioLogado(): string {
    const nomes = this.usuario.razao.split(' ');
    if (this.logado) {
      return nomes[0];
    } else {
      return 'Login Não Efetuado.';
    }
  }

  okProjetos(): boolean {
    if (
      this.usuarioService.isDiretoria(this.usuario.grupo) ||
      this.usuarioService.isAdm(this.usuario.grupo) ||
      this.usuarioService.isTi(this.usuario.grupo)
    )
      return true;

    return false;
  }

  okPlanejamento(): boolean {
    if (
      this.usuarioService.isDiretoria(this.usuario.grupo) ||
      this.usuarioService.isCoordenador(this.usuario.grupo) ||
      this.usuarioService.isAuditor(this.usuario.grupo) ||
      this.usuarioService.isAdm(this.usuario.grupo) ||
      this.usuarioService.isTi(this.usuario.grupo)
    )
      return true;

    return false;
  }

  okExecucao(): boolean {
    if (
      this.usuarioService.isDiretoria(this.usuario.grupo) ||
      this.usuarioService.isCoordenador(this.usuario.grupo) ||
      this.usuarioService.isAuditor(this.usuario.grupo) ||
      this.usuarioService.isTi(this.usuario.grupo)
    )
      return true;

    return false;
  }

  okGerencial(): boolean {
    if (
      this.usuarioService.isDiretoria(this.usuario.grupo) ||
      this.usuarioService.isTi(this.usuario.grupo)
    )
      return true;

    return false;
  }

  setSpin(value: boolean) {
    this.showSpin = value;
    this.showSpinEmitter.emit(this.showSpin);
  }

  getSpin(): boolean {
    return this.showSpin;
  }

  loadGuardiaoMestre() {
    //Cadastros
    let guard = new GuardiaoMestre();
    this.guadiaoMestre = [];

    guard.path = 'empresas';
    guard.grupos = [0];
    this.guadiaoMestre.push(guard);

    guard = new GuardiaoMestre();
    guard.path = 'usuarios';
    guard.grupos.push(0);
    this.guadiaoMestre.push(guard);

    guard = new GuardiaoMestre();
    guard.path = 'clientes';
    guard.grupos.push(0);
    this.guadiaoMestre.push(guard);

    guard = new GuardiaoMestre();
    guard.path = 'users';
    guard.grupos = [900, 904, 906];
    this.guadiaoMestre.push(guard);

    guard = new GuardiaoMestre();
    guard.path = 'economicos';
    guard.grupos = [900, 904, 906];
    this.guadiaoMestre.push(guard);

    guard = new GuardiaoMestre();
    guard.path = 'motivos';
    guard.grupos = [900, 901, 904, 906];
    this.guadiaoMestre.push(guard);

    guard = new GuardiaoMestre();
    guard.path = 'estruturas';
    guard.grupos = [900, 901, 904, 906];
    this.guadiaoMestre.push(guard);

    guard = new GuardiaoMestre();
    guard.path = 'feriados';
    guard.grupos = [906];
    this.guadiaoMestre.push(guard);

    //diretoria
    guard = new GuardiaoMestre();
    guard.path = 'projetos';
    guard.grupos = [900, 901, 902, 904, 906];
    this.guadiaoMestre.push(guard);

    guard = new GuardiaoMestre();
    guard.path = 'agendaprojeto';
    guard.grupos = [900, 906];
    this.guadiaoMestre.push(guard);

    guard = new GuardiaoMestre();
    guard.path = 'agendacoordenador';
    guard.grupos = [900, 901, 906];
    this.guadiaoMestre.push(guard);

    guard = new GuardiaoMestre();
    guard.path = 'execucao';
    guard.grupos = [0];
    this.guadiaoMestre.push(guard);

    guard = new GuardiaoMestre();
    guard.path = 'execucao3';
    guard.grupos = [906];
    this.guadiaoMestre.push(guard);

    guard = new GuardiaoMestre();
    guard.path = 'agendatrabalhos';
    guard.grupos = [0];
    this.guadiaoMestre.push(guard);

    guard = new GuardiaoMestre();
    guard.path = 'extratoaudi';
    guard.grupos = [906];
    this.guadiaoMestre.push(guard);

    guard = new GuardiaoMestre();
    guard.path = 'gerencial';
    guard.grupos = [900, 906];
    this.guadiaoMestre.push(guard);

    guard = new GuardiaoMestre();
    guard.path = 'sobre';
    guard.grupos = [906];
    this.guadiaoMestre.push(guard);
  }

  validarGuardiaoMestre(value?: string): boolean {
    if (typeof value === 'undefined') return false;
    let guard: GuardiaoMestre = new GuardiaoMestre();

    this.guadiaoMestre.forEach((guardiao) => {
      if (guardiao.path === value) {
        guard = guardiao;
      }
    });

    if (guard.path == '') return false;

    if (guard.grupos[0] == 0) return true;

    let idx = guard.grupos.findIndex((gru) => gru == this.usuario.grupo);

    return idx == -1 ? false : true;
  }

  loadGuardiaoOpcoes() {
    //Cadastros
    let guard = new GuardiaoOpcoes();
    this.guardiaoOpcoes = [];

    guard.path = 'empresa';
    guard.usuario = 16;
    guard.acoes = [
      CadastroAcoes.Inclusao,
      CadastroAcoes.Edicao,
      CadastroAcoes.Exclusao,
      CadastroAcoes.Consulta,
    ];
    this.guardiaoOpcoes.push(guard);

    guard = new GuardiaoOpcoes();
    guard.path = 'empresa';
    guard.usuario = 0;
    guard.acoes = [CadastroAcoes.Consulta];
    this.guardiaoOpcoes.push(guard);

    guard = new GuardiaoOpcoes();
    guard.path = 'usuario';
    guard.usuario = 999;
    guard.acoes = [CadastroAcoes.Edicao, CadastroAcoes.Consulta];
    this.guardiaoOpcoes.push(guard);

    guard = new GuardiaoOpcoes();
    guard.path = 'usuario';
    guard.usuario = 0;
    guard.acoes = [CadastroAcoes.None];
    this.guardiaoOpcoes.push(guard);

    guard = new GuardiaoOpcoes();
    guard.path = 'usuario';
    guard.usuario = 16;
    guard.acoes = [
      CadastroAcoes.Edicao,
      CadastroAcoes.Consulta,
      CadastroAcoes.Inclusao,
    ];
    this.guardiaoOpcoes.push(guard);

    guard = new GuardiaoOpcoes();
    guard.path = 'usuario';
    guard.usuario = 9;
    guard.acoes = [CadastroAcoes.Consulta, CadastroAcoes.Inclusao];
    this.guardiaoOpcoes.push(guard);

    guard = new GuardiaoOpcoes();
    guard.path = 'usuario';
    guard.grupo = 904;
    guard.acoes = [
      CadastroAcoes.Consulta,
      CadastroAcoes.Inclusao,
      CadastroAcoes.Edicao,
    ];
    this.guardiaoOpcoes.push(guard);

    guard = new GuardiaoOpcoes();
    guard.path = 'cliente';
    guard.usuario = 0;
    guard.acoes = [CadastroAcoes.Consulta];
    this.guardiaoOpcoes.push(guard);

    guard = new GuardiaoOpcoes();
    guard.path = 'cliente';
    guard.usuario = 16;
    guard.acoes = [
      CadastroAcoes.Inclusao,
      CadastroAcoes.Edicao,
      CadastroAcoes.Exclusao,
      CadastroAcoes.Consulta,
    ];
    this.guardiaoOpcoes.push(guard);

    guard = new GuardiaoOpcoes();
    guard.path = 'cliente';
    guard.grupo = 904;
    guard.acoes = [
      CadastroAcoes.Inclusao,
      CadastroAcoes.Edicao,
      CadastroAcoes.Exclusao,
      CadastroAcoes.Consulta,
    ];
    this.guardiaoOpcoes.push(guard);

    guard = new GuardiaoOpcoes();
    guard.path = 'economico';
    guard.usuario = 0;
    guard.acoes = [
      CadastroAcoes.Inclusao,
      CadastroAcoes.Edicao,
      CadastroAcoes.Exclusao,
      CadastroAcoes.Consulta,
    ];
    this.guardiaoOpcoes.push(guard);

    guard = new GuardiaoOpcoes();
    guard.path = 'user';
    guard.usuario = 0;
    guard.acoes = [
      CadastroAcoes.Inclusao,
      CadastroAcoes.Edicao,
      CadastroAcoes.Exclusao,
      CadastroAcoes.Consulta,
    ];
    this.guardiaoOpcoes.push(guard);

    guard = new GuardiaoOpcoes();
    guard.path = 'motivo';
    guard.usuario = 0;
    guard.acoes = [CadastroAcoes.Consulta];
    this.guardiaoOpcoes.push(guard);

    guard = new GuardiaoOpcoes();
    guard.path = 'motivo';
    guard.usuario = 16;
    guard.acoes = [
      CadastroAcoes.Inclusao,
      CadastroAcoes.Edicao,
      CadastroAcoes.Exclusao,
      CadastroAcoes.Consulta,
    ];
    this.guardiaoOpcoes.push(guard);

    /*
    guard = new GuardiaoOpcoes();
    guard.path = 'projeto';
    guard.grupo = 901;
    guard.acoes = [CadastroAcoes.Consulta];
    this.guardiaoOpcoes.push(guard);
*/
    guard = new GuardiaoOpcoes();
    guard.path = 'projeto';
    guard.usuario = 0;
    guard.acoes = [
      CadastroAcoes.Inclusao,
      CadastroAcoes.Edicao,
      CadastroAcoes.Exclusao,
      CadastroAcoes.Consulta,
    ];
    this.guardiaoOpcoes.push(guard);
  }

  validarGuardiaoOpcoes(value?: string, opcao?: number, id?: number): boolean {
    if (typeof value === 'undefined') return false;
    if (typeof opcao === 'undefined') return false;
    if (typeof id === 'undefined') return false;
    const opc: number = opcao as number;
    const guardUser = this.guardiaoOpcoes.filter(
      (g) => g.path === value && g.usuario === this.usuario.id
    );
    const guardGrupo = this.guardiaoOpcoes.filter(
      (g) => g.path === value && g.grupo === this.usuario.grupo
    );
    const guardOwner = this.guardiaoOpcoes.filter(
      (g) => g.path === value && g.usuario === 999 && this.usuario.id == id
    );
    const guardGen = this.guardiaoOpcoes.filter(
      (g) => g.path === value && g.usuario === 0
    );
    let guard: GuardiaoOpcoes[] = [];
    if (guardUser.length > 0) {
      guard = guardUser as GuardiaoOpcoes[];
    } else {
      if (guardGrupo.length > 0) {
        guard = guardGrupo as GuardiaoOpcoes[];
      } else {
        if (guardOwner.length > 0) {
          guard = guardOwner as GuardiaoOpcoes[];
        } else {
          if (guardGen.length == 0) {
            return true;
          } else {
            guard = guardGen as GuardiaoOpcoes[];
          }
        }
      }
    }
    let idx = -1;
    guard[0].acoes.forEach((op) => {
      if (op == opc) idx = 1;
    });
    return idx == -1 ? false : true;
  }

  estadoSave(par: ParametroModel) {
    const idx = this.lsParametros.findIndex((param) => { return param.modulo.trim() == par.modulo.trim()});
    if (idx == -1) {
      this.lsParametros.push(par);
    } else {
      this.lsParametros[idx] = par;
    }
  }

  estadoFind(value: string): ParametroModel | null {
    const idx = this.lsParametros.findIndex(
      (p) =>{ return value.trim() == p.modulo.trim()}
    );
    if (idx == -1) return null;
    return this.lsParametros[idx];
  }

  estadoDelete(par: ParametroModel) {
    const idx = this.lsParametros.findIndex(
      (p) => { return par.modulo.trim() == p.modulo.trim() }
    );
    if (idx > -1) {
      this.lsParametros.splice(idx, 1);
    }
  }


}
