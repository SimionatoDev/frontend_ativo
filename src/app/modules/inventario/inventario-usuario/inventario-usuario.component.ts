import { GlobalService } from './../../../services/global.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { InventarioModel } from 'src/app/models/inventario-model';
import { UsuarioQuery_04Model } from 'src/app/models/usuario-query_04-model';
import { ParametroLanca_usuario } from 'src/app/parametros/parametro-lanca_usuario';
import { ParametroUsuario03 } from 'src/app/parametros/parametro-usuario03';
import { InventarioService } from 'src/app/services/inventario.service';
import { UsuarioinventarioService } from 'src/app/services/usuarioinventario.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { DisplayAuditores } from 'src/app/shared/classes/DisplayAuditores';
import { AppSnackbar } from 'src/app/shared/classes/app-snackbar';
import { CadastroAcoes } from 'src/app/shared/classes/cadastro-acoes';
import { messageError } from 'src/app/shared/classes/util';

@Component({
  selector: 'app-inventario-usuario',
  templateUrl: './inventario-usuario.component.html',
  styleUrls: ['./inventario-usuario.component.css'],
})
export class InventarioUsuarioComponent implements OnInit {
  formulario: FormGroup;

  inscricaoGetInventario!: Subscription;
  inscricaoCrud!: Subscription;
  inscricaoRota!: Subscription;
  inscricaoAuditor!: Subscription;

  id_empresa: number = 0;

  id_local: number = 0;

  codigo: number = 0;

  gravando: boolean = false;

  readOnly: boolean = true;

  inventario: InventarioModel = new InventarioModel();

  displayAuditores: DisplayAuditores[] = [];

  parametroLanca_usuario: ParametroLanca_usuario[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private inventarioService: InventarioService,
    private usuarioService: UsuariosService,
    private globalService: GlobalService,
    private usuarioInventario: UsuarioinventarioService,
    public appSnackBar: AppSnackbar,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.inscricaoRota = route.params.subscribe((params: any) => {
      this.id_empresa = params.id_empresa;
      this.id_local = params.id_local;
      this.codigo = params.codigo;
    });
    this.formulario = formBuilder.group({
      codigo: [{ value: 0 }],
      descricao: [{ value: '' }],
    });

    this.getInventario();
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.inscricaoGetInventario?.unsubscribe();
    this.inscricaoCrud?.unsubscribe();
    this.inscricaoRota?.unsubscribe();
    this.inscricaoAuditor?.unsubscribe();
  }

  getInventario() {
    this.globalService.setSpin(true);
    this.inscricaoGetInventario = this.inventarioService
      .getInventario(this.id_empresa, this.id_local, this.codigo)
      .subscribe(
        (data: InventarioModel) => {
          this.globalService.setSpin(false);
          this.inventario = data;
          this.setValue();
          this.getUsuariosInventario();
        },
        (error: any) => {
          this.globalService.setSpin(false);
          this.inventario = new InventarioModel();
          this.appSnackBar.openFailureSnackBar(
            `Pesquisa Nos Usuários X Inventarios ${messageError(error)}`,
            'OK'
          );
          this.setValue();
        }
      );
  }

  getUsuariosInventario() {
    const par = new ParametroUsuario03();
    par.id_empresa = this.inventario.id_empresa;
    par.id_local = this.inventario.id_empresa;
    par.id_inventario = this.inventario.codigo;
    this.globalService.setSpin(true);
    this.inscricaoAuditor = this.usuarioService
      .getUsuarioInventario(par)
      .subscribe(
        (data: UsuarioQuery_04Model[]) => {
          console.log(data);
          this.globalService.setSpin(false);
          this.loadDisplayItens(data);
        },
        (error: any) => {
          this.globalService.setSpin(false);
          this.displayAuditores = [];
          this.appSnackBar.openFailureSnackBar(
            `Pesquisa Nos Usuários X Inventarios ${messageError(error)}`,
            'OK'
          );
        }
      );
  }

  saveUsuariosInventario() {
    this.globalService.setSpin(true);
    this.inscricaoCrud = this.usuarioInventario
      .usuarioinventarioMulti(this.parametroLanca_usuario)
      .subscribe(
        (data: any) => {
          this.globalService.setSpin(false);
          this.loadDisplayItens(data);
          this.appSnackBar.openSuccessSnackBar(`${messageError(data)}`, 'OK');
        },
        (error: any) => {
          this.globalService.setSpin(false);
          this.displayAuditores = [];
          this.appSnackBar.openFailureSnackBar(
            `Falha Na Gravação Usuários X Inventarios ${messageError(error)}`,
            'OK'
          );
        }
      );
  }

  setValue() {
    this.formulario.setValue({
      codigo: this.inventario.codigo,
      descricao: this.inventario.descricao,
    });
  }

  onRetorno() {
    this.router.navigate(['/inventarios/inventarios', 'SIM']);
  }

  onHome() {
    this.router.navigate(['']);
  }

  loadDisplayItens(data: UsuarioQuery_04Model[]): void {
    this.displayAuditores = [];
    //adiciona todos
    const disp: DisplayAuditores = new DisplayAuditores();
    disp.checked = false;
    disp.vazia = true;
    this.displayAuditores.push(disp);
    data.forEach((obj) => {
      const disp: DisplayAuditores = new DisplayAuditores();
      disp.checked = false;
      disp.vazia = false;
      disp.acao = CadastroAcoes.None;
      disp.auditor = obj;
      this.displayAuditores.push(disp);
    });
  }

  onSaveUsuariosInventarios() {
    this.parametroLanca_usuario = [];
    this.displayAuditores.forEach((audi) => {
      if (audi.checked) {
        const param: ParametroLanca_usuario = new ParametroLanca_usuario();
        if (
          audi.acao == CadastroAcoes.Inclusao ||
          audi.acao == CadastroAcoes.Exclusao
        ) {
          param.acao = audi.acao;
          param.id_empresa = this.globalService.getEmpresa().id;
          param.id_filial = this.id_local;
          param.id_inventario = this.codigo;
          param.id_usuario = audi.auditor.id_usuario;
          param.user_insert = this.globalService.getUsuario().id;
          this.parametroLanca_usuario.push(param);
        }
      }
    });
    if (this.parametroLanca_usuario.length !== 0) {
      this.saveUsuariosInventario();
    } else {
      this.appSnackBar.openSuccessSnackBar(`Nenhum lançamento Gerado`, 'OK');
    }
  }

  setAllItens(value: boolean): void {
    this.displayAuditores.forEach((audi) => {
      audi.checked = value;
      if (audi.auditor.codigo_inventario !== 0 && audi.checked) {
        audi.acao = CadastroAcoes.Exclusao;
      }
      if (audi.auditor.codigo_inventario == 0 && audi.checked) {
        audi.acao = CadastroAcoes.Inclusao;
      }
      if (!audi.checked) {
        audi.acao = CadastroAcoes.None;
      }
    });
  }

  setItens(value: boolean, auditor: DisplayAuditores): void {
    let check: boolean = true;
    auditor.checked = value;
    if (auditor.auditor.codigo_inventario !== 0 && auditor.checked) {
      auditor.acao = CadastroAcoes.Exclusao;
    }
    if (auditor.auditor.codigo_inventario == 0 && auditor.checked) {
      auditor.acao = CadastroAcoes.Inclusao;
    }
    if (!auditor.checked) {
      auditor.acao = CadastroAcoes.None;
    }
    this.displayAuditores[0].checked = check;
  }

  getVisiblesAuditores(): DisplayAuditores[] {
    return this.displayAuditores.filter((disp) => (!disp.vazia ? true : false));
  }
}
