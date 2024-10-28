import { PadraoService } from 'src/app/services/padrao.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { EmpresaModel } from 'src/app/models/empresa-model';
import { EmpresaQuery01Model } from 'src/app/models/empresa-query_01-model';
import { InventarioModel } from 'src/app/models/inventario-model';
import { LocalModel } from 'src/app/models/local-model';
import { UsuarioModel } from 'src/app/models/usuario-model';
import { UsuarioQuery_05Model } from 'src/app/models/usuario-query_05-model';
import { ParametroEmpresa01 } from 'src/app/parametros/parametro-empresa01';
import { ParametroInventario01 } from 'src/app/parametros/parametro-inventario01';
import { ParametroLocal01 } from 'src/app/parametros/parametro-local01';
import { ParametroUsuario01 } from 'src/app/parametros/parametro-usuario01';
import { EmpresaService } from 'src/app/services/empresa.service';
import { GlobalService } from 'src/app/services/global.service';
import { InventarioService } from 'src/app/services/inventario.service';
import { LocalService } from 'src/app/services/local.service';
import { ParametrosService } from 'src/app/services/parametros.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { AppSnackbar } from 'src/app/shared/classes/app-snackbar';
import { CadastroAcoes } from 'src/app/shared/classes/cadastro-acoes';
import { Opcoes } from 'src/app/shared/classes/opcoes';
import { messageError } from 'src/app/shared/classes/util';
import { PadraoModel } from 'src/app/models/padrao-model';

@Component({
  selector: 'app-crud-ambiente',
  templateUrl: './crud-ambiente.component.html',
  styleUrls: ['./crud-ambiente.component.css'],
})
export class CrudAmbienteComponent implements OnInit {
  inscricaoEmpresas!: Subscription;

  inscricaoLocais!: Subscription;

  inscricaoInventarios!: Subscription;

  inscricaoUsuarios!: Subscription;

  inscricaoPadrao!: Subscription;

  empresas: EmpresaQuery01Model[] = [];
  empresa: EmpresaQuery01Model = new EmpresaQuery01Model();
  locais: LocalModel[] = [];
  local: LocalModel = new LocalModel();
  inventarios: InventarioModel[] = [];
  inventario: InventarioModel = new InventarioModel();

  usuarios: UsuarioQuery_05Model[] = [];

  parametros: FormGroup;

  retorno: boolean = false;

  opcoes: Opcoes[] = [];

  constructor(
    private globalService: GlobalService,
    private formBuilder: FormBuilder,
    private empresaService: EmpresaService,
    private localService: LocalService,
    private inventarioService: InventarioService,
    private usuarioService: UsuariosService,
    private padraoService: PadraoService,
    private parametrosService: ParametrosService,
    private router: Router,
    private appSnackBar: AppSnackbar
  ) {
    this.parametros = formBuilder.group({
      empresa: [null],
      local: [null],
      inventario: [null],
    });
    const op1 = new Opcoes();
    op1.id = '0';
    op1.descricao = 'Não Faz Nada';
    const op2 = new Opcoes();
    op2.id = '1';
    op2.descricao = 'Incluir';
    const op3 = new Opcoes();
    op3.id = '2';
    op3.descricao = 'Remover';
    this.opcoes.push(op1);
    this.opcoes.push(op2);
    this.opcoes.push(op3);
  }

  ngOnInit(): void {
    this.onGetEmpresas();
  }

  ngOnDestroy(): void {
    this.inscricaoEmpresas?.unsubscribe();
    this.inscricaoLocais?.unsubscribe();
    this.inscricaoInventarios?.unsubscribe();
    this.inscricaoUsuarios?.unsubscribe();
    this.inscricaoPadrao?.unsubscribe();
  }

  onGetEmpresas() {
    let par = new ParametroEmpresa01();

    par.orderby = 'Código';

    this.globalService.setSpin(true);
    this.inscricaoEmpresas = this.empresaService
      .getEmpresasParametro_01(par)
      .subscribe(
        (data: EmpresaModel[]) => {
          this.globalService.setSpin(false);
          this.empresas = data;
          this.empresa = this.empresas[0];
          this.setValues();
          this.onGetLocais();
        },
        (error: any) => {
          this.globalService.setSpin(false);
          this.empresas = [];
          this.appSnackBar.openFailureSnackBar(
            `Pesquisa Nas Empresas ${messageError(error)}`,
            'OK'
          );
        }
      );
  }

  onGetLocais() {
    let par = new ParametroLocal01();

    par.id_empresa = this.empresa.id;

    par.orderby = 'Código';

    this.globalService.setSpin(true);
    this.inscricaoLocais = this.localService
      .getLocaisParametro_01(par)
      .subscribe(
        (data: LocalModel[]) => {
          this.globalService.setSpin(false);
          this.locais = data;
          this.local = this.locais[0];
          this.parametros.patchValue({
            local: this.local.id,
          });
          this.onGetInventarios();
        },
        (error: any) => {
          this.globalService.setSpin(false);
          this.locais = [];
          this.local = new LocalModel();
          this.inventarios = [];
          this.inventario = new InventarioModel();
          this.appSnackBar.openFailureSnackBar(
            `Pesquisa Nos Locais ${messageError(error)}`,
            'OK'
          );
        }
      );
  }

  onGetInventarios() {
    let par = new ParametroInventario01();

    par.id_empresa = this.parametros.value?.empresa;

    par.id_filial = this.parametros.value?.local;

    par.orderby = 'Descrição';

    this.globalService.setSpin(true);
    this.inscricaoInventarios = this.inventarioService
      .getInventariosParametro_01(par)
      .subscribe(
        (data: any[]) => {
          this.globalService.setSpin(false);
          this.inventarios = data;
          this.inventario = data[0];
          this.parametros.patchValue({
            inventario: this.inventario.codigo,
          });
        },
        (error: any) => {
          this.globalService.setSpin(false);
          this.empresas = [];
          this.empresa = new EmpresaQuery01Model();
          this.locais = [];
          this.local = new LocalModel();
          this.inventarios = [];
          this.inventario = new InventarioModel();
          this.globalService.setSpin(false);
          this.appSnackBar.openFailureSnackBar(
            `Pesquisa Nos Inventários ${messageError(error)}`,
            'OK'
          );
        }
      );
  }

  getUsuarios() {
    let idx: number = this.empresas.findIndex(
      (obj) => obj.id === this.parametros.value?.empresa
    );
    if (idx >= 0) {
      this.empresa = this.empresas[idx];
    }

    idx = this.locais.findIndex(
      (obj) => obj.id === this.parametros.value?.local
    );
    if (idx >= 0) {
      this.local = this.locais[idx];
    }
    idx = this.inventarios.findIndex(
      (obj) => obj.codigo === this.parametros.value?.inventario
    );
    if (idx >= 0) {
      this.inventario = this.inventarios[idx];
    }

    let par = new ParametroUsuario01();

    par.id_empresa = this.globalService.getIdEmpresa();

    par.ativo = 'S';

    par.grupos.push(902);

    par.grupos.push(906);

    par.orderby = 'Razão';

    this.globalService.setSpin(true);
    this.inscricaoUsuarios = this.usuarioService.getusuarios_05(par).subscribe(
      (data: UsuarioQuery_05Model[]) => {
        this.globalService.setSpin(false);
        this.usuarios = data;
        console.log(this.usuarios);
      },
      (error: any) => {
        this.globalService.setSpin(false);
        this.usuarios = [];
        this.appSnackBar.openSuccessSnackBar(
          `Pesquisa Nos Usuários ${messageError(error)}`,
          'OK'
        );
      }
    );
  }

  deletePadrao(usuario: UsuarioQuery_05Model) {
    this.globalService.setSpin(true);
    this.inscricaoPadrao = this.padraoService
      .padraoDelete(usuario.id_empresa, usuario.id)
      .subscribe(
        (data: any) => {
          this.globalService.setSpin(false);
          usuario.tem_padrao = 'N';
          usuario.empresa = '';
          usuario.local = '';
          usuario.inventario = '';
        },
        (error: any) => {
          this.globalService.setSpin(false);
          this.appSnackBar.openSuccessSnackBar(
            `Falha Na Exclusão ${messageError(error)}`,
            'OK'
          );
        }
      );
  }

  savePadrao(padrao: PadraoModel, usuario: UsuarioQuery_05Model) {
    this.globalService.setSpin(true);
    this.inscricaoPadrao = this.padraoService.padraoInsert(padrao).subscribe(
      (data: any) => {
        this.globalService.setSpin(false);
        usuario.tem_padrao = 'S';
        usuario.empresa = this.empresa.razao;
        usuario.local = this.local.razao;
        usuario.inventario = this.inventario.descricao;
      },
      (error: any) => {
        this.globalService.setSpin(false);
        this.appSnackBar.openSuccessSnackBar(
          `Falha Na Inclusão ${messageError(error)}`,
          'OK'
        );
      }
    );
  }

  setValues() {
    this.parametros.setValue({
      empresa: this.empresa.id,
      local: this.local.id,
      inventario: this.inventario.codigo,
    });
  }

  onHome() {
    this.router.navigate(['']);
  }

  onChangeEmpresa() {
    this.onGetLocais();
  }

  onChangeLocal() {
    let idx: number = this.locais.findIndex(
      (obj) => obj.id === this.parametros.value?.local
    );
    if (idx >= 0) {
      this.local = this.locais[idx];
      this.onGetInventarios();
    }
  }

  escolha(opcao: number, usuario: UsuarioQuery_05Model) {
    if (opcao == CadastroAcoes.Inclusao_Ambiente) {
      let padrao = new PadraoModel();
      padrao.id_empresa = usuario.id_empresa;
      padrao.id_usuario = usuario.id;
      padrao.id_empresa_padrao = this.empresa.id;
      padrao.id_local_padrao = this.local.id;
      padrao.id_inv_padrao = this.inventario.codigo;
      padrao.user_insert = this.globalService.getUsuario().id;
      padrao.user_update = 0;
      this.savePadrao(padrao, usuario);
    }
    if (opcao == CadastroAcoes.Exclusao_Ambiente) {
      this.deletePadrao(usuario);
    }
  }
}
