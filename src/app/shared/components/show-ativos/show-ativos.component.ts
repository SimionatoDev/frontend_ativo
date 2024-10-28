import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { GlobalService } from './../../../services/global.service';
import { Component, OnInit } from '@angular/core';
import { EmpresaPadraoDialogComponent } from './empresa-padrao-dialog/empresa-padrao-dialog.component';
import { EmpresaPadraoData } from './empresa-padrao-dialog/empresa-padrao-data';
import { Subscription } from 'rxjs';
import { EmpresaQuery01Model } from 'src/app/models/empresa-query_01-model';
import { AppSnackbar } from '../../classes/app-snackbar';
import { EmpresaModel } from 'src/app/models/empresa-model';
import { InventarioPadraoData } from './inventario-padrao-dialog/inventario-padrao-data';
import { InventarioPadraoDialogComponent } from './inventario-padrao-dialog/inventario-padrao-dialog.component';
import { InventarioService } from 'src/app/services/inventario.service';
import { Router } from '@angular/router';
import { EmpresaService } from 'src/app/services/empresa.service';
import { InventarioModel } from 'src/app/models/inventario-model';
import { ParametroLocal01 } from 'src/app/parametros/parametro-local01';
import { LocalService } from 'src/app/services/local.service';
import { LocalModel } from 'src/app/models/local-model';
import { messageError } from '../../classes/util';
import { LocalPadraoData } from './local-padrao-dialog/local-padrao-data';
import { LocalPadraoDialogComponent } from './local-padrao-dialog/local-padrao-dialog.component';
import { ParametroEmpresa01 } from 'src/app/parametros/parametro-empresa01';
import { ParametroInventario01 } from 'src/app/parametros/parametro-inventario01';
import { PadraoService } from 'src/app/services/padrao.service';
import { PadraoModel } from 'src/app/models/padrao-model';
import { CadastroAcoes } from '../../classes/cadastro-acoes';

@Component({
  selector: 'app-show-ativos',
  templateUrl: './show-ativos.component.html',
  styleUrls: ['./show-ativos.component.css'],
})
export class ShowAtivosComponent implements OnInit {
  lbInventario: string = 'Não Ativo';
  lbEmpresa: string = 'Não Definida';
  lbLocal: string = 'Não Definida';
  showMensagem: boolean = false;

  inscricaoEmpresas!: Subscription;
  inscricaoGetEmpresa!: Subscription;

  inscricaoLocal!: Subscription;
  inscricaoGetLocal!: Subscription;

  inscricaoInventarios!: Subscription;
  inscricaoGetInventario!: Subscription;

  inscricaoPadraoCrud!: Subscription;

  empresas: EmpresaQuery01Model[] = [];
  locais: LocalModel[] = [];
  inventarios: InventarioModel[] = [];

  idAcao: CadastroAcoes = CadastroAcoes.Edicao;

  constructor(
    private globalService: GlobalService,
    public empresaPadraoDialog: MatDialog,
    public localPadraoDialog: MatDialog,
    public inventarioPadraoDialog: MatDialog,
    public empresaService: EmpresaService,
    public inventarioService: InventarioService,
    public localService: LocalService,
    public padraoService: PadraoService,
    private appSnackBar: AppSnackbar,
    private router: Router
  ) {
    this.globalService.shomMenuEmitter.subscribe((show) => {
      console.log('Trocou o menu');
      this.showMensagem = show;
    });

    console.log('Assinando Change Padrao', this.globalService.getPadrao());
    this.globalService.changePadraoEmitter.subscribe((trocou) => {
      this.lbEmpresa = this.globalService.getPadrao().empresa_razao;
      this.lbLocal = this.globalService.getPadrao().local_razao;
      this.lbInventario = this.globalService.getPadrao().inve_descricao;
      this.getPadrao();
    });
  }

  ngOnInit() {
    this.getPadrao();
  }

  ngOnDestroy(): void {
    this.inscricaoEmpresas?.unsubscribe();
    this.inscricaoGetEmpresa?.unsubscribe();
    this.inscricaoLocal?.unsubscribe();
    this.inscricaoGetLocal?.unsubscribe();
    this.inscricaoPadraoCrud?.unsubscribe();
  }

  onGetEmpresas() {
    let par = new ParametroEmpresa01();

    par.contador = 'N';

    par.tamPagina = 100;

    par.pagina = 1;

    par.orderby = 'Código';

    this.globalService.setSpin(true);
    this.inscricaoEmpresas = this.empresaService
      .getEmpresasParametro_01(par)
      .subscribe(
        (data: EmpresaModel[]) => {
          this.empresas = data;
          this.openGetEmpresa();
        },
        (error: any) => {
          this.empresas = [];
          this.appSnackBar.openFailureSnackBar(
            `Pesquisa Nas Empresas ${messageError(error)}`,
            'OK'
          );
          this.globalService.setSpin(false);
        }
      );
  }

  getEmpresa(id: number, save: boolean) {
    if (id == 0) {
      return;
    }
    this.globalService.setSpin(true);
    this.inscricaoGetEmpresa = this.empresaService.getEmpresa(id).subscribe(
      (data: EmpresaModel) => {
        this.globalService.setSpin(false);
        this.globalService.setEmpresa(data);
        if (save) {
          if (this.idAcao == CadastroAcoes.Inclusao) {
            this.savePadrao();
          } else {
            this.alterPadrao();
          }
        } else {
          this.router.navigate(['/']);
        }
      },
      (error: any) => {
        this.globalService.setSpin(false);
        this.appSnackBar.openFailureSnackBar(
          `Pesquisa Nas Empresas ${messageError(error)}`,
          'OK'
        );
      }
    );
  }

  openGetEmpresa(): void {
    const data: EmpresaPadraoData = new EmpresaPadraoData();

    data.id_empresa = this.globalService.getEmpresa().id;

    data.empresas = this.empresas;

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.id = 'empresa-padrao';
    dialogConfig.width = '600px';
    dialogConfig.data = data;

    const modalDialog = this.empresaPadraoDialog
      .open(EmpresaPadraoDialogComponent, dialogConfig)
      .beforeClosed()
      .subscribe((data: EmpresaPadraoData) => {
        if (typeof data != 'undefined' && data.processar) {
          this.getEmpresa(data.id_empresa, data.save);
        }
      });
  }

  onGetLocais() {
    let par = new ParametroLocal01();

    par.id_empresa = this.globalService.getIdEmpresa();

    par.contador = 'N';

    par.tamPagina = 100;

    par.pagina = 1;

    par.orderby = 'Código';

    this.globalService.setSpin(true);
    this.inscricaoGetLocal = this.localService
      .getLocaisParametro_01(par)
      .subscribe(
        (data: LocalModel[]) => {
          this.globalService.setSpin(false);
          this.locais = [];
          this.locais = data;
          this.openGetLocais();
        },
        (error: any) => {
          this.globalService.setSpin(false);
          this.locais = [];
          /*
          this.appSnackBar.openFailureSnackBar(
            `Pesquisa Nos Locais ${messageError(error)}`,
            'OK'
          );*/
        }
      );
  }

  getLocal(id_local: number, save: boolean) {
    if (id_local == 0) {
      return;
    }
    this.globalService.setSpin(true);
    this.inscricaoGetLocal = this.localService
      .getLocal(this.globalService.getIdEmpresa(), id_local)
      .subscribe(
        (data: LocalModel) => {
          this.globalService.setSpin(false);
          this.globalService.setLocal(data);
          if (save) {
            if (this.idAcao == CadastroAcoes.Inclusao) {
              this.savePadrao();
            } else {
              this.alterPadrao();
            }
          } else {
            this.router.navigate(['/']);
          }
        },
        (error: any) => {
          this.globalService.setSpin(false);
          this.appSnackBar.openFailureSnackBar(
            `Pesquisa Nos Locais ${messageError(error)}`,
            'OK'
          );
        }
      );
  }

  openGetLocais(): void {
    const data: LocalPadraoData = new LocalPadraoData();

    data.id_local = this.globalService.getPadrao().id_local_padrao;

    data.locais = this.locais;

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.id = 'local-padrao';
    dialogConfig.width = '600px';

    dialogConfig.data = data;

    const modalDialog = this.localPadraoDialog
      .open(LocalPadraoDialogComponent, dialogConfig)
      .beforeClosed()
      .subscribe((data: LocalPadraoData) => {
        if (typeof data != 'undefined' && data.processar) {
          this.globalService.padrao.id_local_padrao = data.id_local;
          this.globalService.padrao.local_razao =
            data.razao == null ? 'Local Não Definido!' : data.razao;
          this.getLocal(data.id_local, true);
        }
      });
  }

  onGetInventarios() {
    let par = new ParametroInventario01();

    par.id_empresa = this.globalService.getIdEmpresa();

    par.id_filial = this.globalService.getLocal().id;

    par.contador = 'N';

    par.tamPagina = 100;

    par.pagina = 1;

    par.orderby = 'Descrição';

    this.globalService.setSpin(true);
    this.inscricaoInventarios = this.inventarioService
      .getInventariosParametro_01(par)
      .subscribe(
        (data: any[]) => {
          this.inventarios = data;
          this.OpenGetInventario();
        },
        (error: any) => {
          this.empresas = [];
          this.globalService.setSpin(false);
          /*
          this.appSnackBar.openFailureSnackBar(
            `Pesquisa Nos Inventários ${messageError(error)}`,
            'OK'
          );*/
        }
      );
  }

  OpenGetInventario() {
    const data: InventarioPadraoData = new InventarioPadraoData();

    data.id_empresa = this.globalService.getEmpresa().id;

    data.id_filial = this.globalService.getLocal().id;

    data.id_inventario = this.globalService.getInventario().codigo;

    data.inventarios = this.inventarios;

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.id = 'inventario-padrao';
    dialogConfig.width = '600px';
    dialogConfig.data = data;

    const modalDialog = this.empresaPadraoDialog
      .open(InventarioPadraoDialogComponent, dialogConfig)
      .beforeClosed()
      .subscribe((data: InventarioPadraoData) => {
        if (typeof data != 'undefined' && data.processar) {
          this.globalService.padrao.id_inv_padrao = data.id_inventario;
          this.globalService.padrao.inve_descricao =
            data.descricao == null
              ? 'Inventário Não Definido!'
              : data.descricao;
          this.lbInventario =
            data.descricao == null
              ? 'Inventário Não Definido!'
              : data.descricao;
          this.getInventario(
            data.id_empresa,
            data.id_filial,
            data.id_inventario,
            true
          );
        }
      });
  }

  getInventario(
    id_empresa: number,
    id_local: number,
    id: number,
    save: boolean
  ) {
    if (id == 0) {
      return;
    }
    this.globalService.setSpin(true);
    this.inscricaoGetInventario = this.inventarioService
      .getInventario(id_empresa, id_local, id)
      .subscribe(
        (data: InventarioModel) => {
          this.globalService.setSpin(false);
          this.globalService.setInventario(data);
          if (save) {
            if (this.idAcao == CadastroAcoes.Inclusao) {
              this.savePadrao();
            } else {
              this.alterPadrao();
            }
          } else {
            this.router.navigate(['/']);
          }
        },
        (error: any) => {
          this.globalService.setSpin(false);
          /*
          this.appSnackBar.openFailureSnackBar(
            `Pesquisa Iventários ${messageError(error)}`,
            'OK'
          );
          */
        }
      );
  }

  getPadrao() {
    this.globalService.setSpin(true);
    this.inscricaoGetEmpresa = this.padraoService
      .getPadrao(
        this.globalService.getEmpresa().id,
        this.globalService.getUsuario().id
      )
      .subscribe(
        (data: PadraoModel) => {
          this.globalService.padrao = data;
          this.lbEmpresa = this.globalService.padrao.empresa_razao;
          this.lbLocal = this.globalService.padrao.local_razao;
          this.lbInventario = this.globalService.padrao.inve_descricao;
          this.getEmpresa(this.globalService.padrao.id_empresa_padrao, false);
          this.getLocal(this.globalService.padrao.id_local_padrao, false);
          this.getInventario(
            this.globalService.padrao.id_empresa,
            this.globalService.padrao.id_local_padrao,
            this.globalService.padrao.id_inv_padrao,
            false
          );
        },
        (error: any) => {
          this.globalService.setSpin(false);
          if (error.error.message != 'Nehuma Informação Para Esta Consulta.') {
            this.globalService.padrao = new PadraoModel();
            this.globalService.padrao.id_empresa =
              this.globalService.getEmpresa().id;
            this.globalService.padrao.id_usuario =
              this.globalService.getUsuario().id;
          } else {
            this.appSnackBar.openFailureSnackBar(
              `Pesquisa Nos Padrões ${messageError(error)}`,
              'OK'
            );
          }
        }
      );
  }

  savePadrao() {
    this.globalService.padrao.user_insert = this.globalService.getUsuario().id;
    this.globalService.setSpin(true);
    this.inscricaoPadraoCrud = this.padraoService
      .padraoInsert(this.globalService.padrao)
      .subscribe(
        (data: PadraoModel) => {
          this.globalService.setSpin(false);
          this.router.navigate(['/']);
        },
        (error: any) => {
          this.globalService.setSpin(false);
          this.appSnackBar.openFailureSnackBar(
            `Inserção Padrao ${messageError(error)}`,
            'OK'
          );
          this.router.navigate(['/']);
        }
      );
  }

  alterPadrao() {
    this.globalService.padrao.user_update = this.globalService.getUsuario().id;
    this.globalService.setSpin(true);
    this.inscricaoGetEmpresa = this.padraoService
      .padraoUpdate(this.globalService.padrao)
      .subscribe(
        (data: PadraoModel) => {
          this.globalService.setSpin(false);
          this.lbLocal = this.globalService.getPadrao().local_razao;
          this.router.navigate(['/']);
        },
        (error: any) => {
          this.globalService.setSpin(false);
          this.appSnackBar.openFailureSnackBar(
            `Alteração Padrao ${messageError(error)}`,
            'OK'
          );
          this.router.navigate(['/']);
        }
      );
  }
}
