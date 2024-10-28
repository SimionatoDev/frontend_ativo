import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { EmpresaQuery01Model } from 'src/app/models/empresa-query_01-model';
import { InventarioModel } from 'src/app/models/inventario-model';
import { LocalModel } from 'src/app/models/local-model';
import { EmpresaService } from 'src/app/services/empresa.service';
import { ParametroEmpresa01 } from 'src/app/parametros/parametro-empresa01';
import { ParametroInventario01 } from 'src/app/parametros/parametro-inventario01';
import { ParametroLocal01 } from 'src/app/parametros/parametro-local01';
import { GlobalService } from 'src/app/services/global.service';
import { InventarioService } from 'src/app/services/inventario.service';
import { LocalService } from 'src/app/services/local.service';
import { AppSnackbar } from 'src/app/shared/classes/app-snackbar';
import { EmpresaModel } from 'src/app/models/empresa-model';
import { messageError } from 'src/app/shared/classes/util';
import { ParametroImobilizado01 } from 'src/app/parametros/parametro-imobilizado01';
import { ImobilizadoService } from 'src/app/services/imobilizado.service';
import { ParametroImobilizadoinventario01 } from 'src/app/parametros/parametro-imobilizadoinventario01';
import { ImobilizadoinventarioService } from 'src/app/services/imobilizadoinventario.service';
import { ParametroAnexarProduto } from 'src/app/parametros/parametro-anexar-produto';

@Component({
  selector: 'app-anexar-produtos',
  templateUrl: './anexar-produtos.component.html',
  styleUrls: ['./anexar-produtos.component.css'],
})
export class AnexarProdutosComponent implements OnInit {
  inscricaoEmpresas!: Subscription;

  inscricaoLocais!: Subscription;

  inscricaoInventarios!: Subscription;

  inscricaoTotalImobilizados!: Subscription;

  inscricaoTotalAnexados!: Subscription;

  inscricaoAnexar!: Subscription;

  empresas: EmpresaQuery01Model[] = [];
  empresa: EmpresaQuery01Model = new EmpresaQuery01Model();
  locais: LocalModel[] = [];
  local: LocalModel = new LocalModel();
  inventarios: InventarioModel[] = [];
  inventario: InventarioModel = new InventarioModel();

  parametros: FormGroup;
  resumo: FormGroup;

  total_produtos: number = 0;
  total_produtos_anexados: number = 0;
  total_produtos_anexar: number = 0;

  anexar: boolean = false;
  verificado: boolean = false;

  constructor(
    private globalService: GlobalService,
    private formBuilder: FormBuilder,
    private empresaService: EmpresaService,
    private localService: LocalService,
    private inventarioService: InventarioService,
    private imobilizadoService: ImobilizadoService,
    private imoInventarioService: ImobilizadoinventarioService,
    private router: Router,
    private appSnackBar: AppSnackbar
  ) {
    this.parametros = formBuilder.group({
      empresa: [null],
      local: [null],
      inventario: [null],
    });
    this.resumo = formBuilder.group({
      total_produtos: [null],
      total_produtos_anexados: [null],
      total_produtos_anexar: [null],
    });
  }

  ngOnInit(): void {
    this.setValuesResumo();
    this.onGetEmpresas();
  }

  ngOnDestroy(): void {
    this.inscricaoEmpresas?.unsubscribe();
    this.inscricaoLocais?.unsubscribe();
    this.inscricaoInventarios?.unsubscribe();
    this.inscricaoTotalImobilizados?.unsubscribe();
    this.inscricaoTotalAnexados?.unsubscribe();
    this.inscricaoAnexar?.unsubscribe();
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
          this.inventario = this.inventarios[0];
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

  getImobilizadosContador() {
    let par = new ParametroImobilizado01();

    par.id_empresa = this.empresa.id;

    par.id_filial = this.local.id;

    par.contador = 'S';

    this.globalService.setSpin(true);
    this.inscricaoTotalImobilizados = this.imobilizadoService
      .getImobilizadosParametro_01(par)
      .subscribe(
        (data: any) => {
          this.globalService.setSpin(false);
          this.total_produtos = data.total;
          if (this.total_produtos == 0) {
            this.appSnackBar.openFailureSnackBar(
              `Nunhum Produto Cadatrado!`,
              'OK'
            );
          }
          this.resumo.patchValue({
            total_produtos: data.total,
          });
          this.getImoIvenContador();
        },
        (error: any) => {
          this.globalService.setSpin(false);
          this.total_produtos = 0;
          this.total_produtos_anexados = 0;
          this.total_produtos_anexar = 0;
          this.appSnackBar.openFailureSnackBar(
            `Nunhum Produto Cadatrado!`,
            'OK'
          );
        }
      );
  }

  getImoIvenContador() {
    let par = new ParametroImobilizadoinventario01();

    par.id_empresa = this.empresa.id;

    par.id_filial = this.local.id;

    par.id_inventario = this.inventario.codigo;

    par.contador = 'S';

    this.globalService.setSpin(true);
    this.inscricaoTotalAnexados = this.imoInventarioService
      .getImobilizadosinventariosParametro_01(par)
      .subscribe(
        (data: any) => {
          this.globalService.setSpin(false);
          this.total_produtos_anexados = data.total;
          this.total_produtos_anexar =
            this.total_produtos - this.total_produtos_anexados;
          this.resumo.patchValue({
            total_produtos_anexados: this.total_produtos_anexados,
            total_produtos_anexar: this.total_produtos_anexar,
          });
          if (this.total_produtos_anexar > 0) {
            this.anexar = true;
          } else {
            this.anexar = false;
          }
          this.verificado = true;
        },
        (error: any) => {
          this.globalService.setSpin(false);
          this.total_produtos_anexados = 0;
          this.appSnackBar.openFailureSnackBar(
            `Pesquisa Nos Produtos De Inventário ${messageError(error)}`,
            'OK'
          );
        }
      );
  }

  anexarProdutoInventario() {
    let par = new ParametroAnexarProduto();

    par.id_empresa = this.empresa.id;

    par.id_filial = this.local.id;

    par.id_inventario = this.inventario.codigo;

    this.globalService.setSpin(true);
    this.inscricaoAnexar = this.imoInventarioService
      .anexarProdutoInventario(par)
      .subscribe(
        (data: any) => {
          this.globalService.setSpin(false);
          this.verificado = false;
          this.anexar = false;
          this.appSnackBar.openSuccessSnackBar(
            `Produtos Anexados Com Sucesso!`,
            'OK'
          );
        },
        (error: any) => {
          this.globalService.setSpin(false);
          this.total_produtos_anexados = 0;
          this.appSnackBar.openFailureSnackBar(
            `Falha Ao Anexar Produtos No Inventário ${messageError(error)}`,
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

  setValuesResumo() {
    this.resumo.setValue({
      total_produtos: this.total_produtos,
      total_produtos_anexados: this.total_produtos_anexados,
      total_produtos_anexar: this.total_produtos_anexar,
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

  onValidar() {
    this.getImobilizadosContador();
  }

  onProcessar() {
    this.anexarProdutoInventario();
  }

  onCancelar() {
    this.verificado = false;
    this.anexar = false;
  }
}
