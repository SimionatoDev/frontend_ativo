import { ParametroLancamento02 } from './../../../parametros/parametro-lancamento02';
import { InventarioService } from 'src/app/services/inventario.service';
import { LancamentoService } from 'src/app/services/lancamento.service';
import { GlobalService } from './../../../services/global.service';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ParametroLancamentoUsuario } from 'src/app/parametros/parametros-lancamento-usuarios';
import { messageError } from '../../classes/util';
import { AppSnackbar } from '../../classes/app-snackbar';
import { ResumoLancamentosUsuariosModel } from 'src/app/models/resumo-lancamentos-usuario-model';
import { ResumoInventarioModel } from 'src/app/models/resumo-inventario-model';
import { InventarioModel } from 'src/app/models/inventario-model';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { AmbienteModel } from 'src/app/models/ambiente-model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ListaMeses } from '../../classes/lista-meses';
import { EvolucaoModel } from 'src/app/models/evolucao-Model';

declare var google: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  inscricaoExecutores!: Subscription;
  inscricaoResumo!: Subscription;
  inscricaoAmbiente!: Subscription;
  inscricaoEvolucoes!: Subscription;

  executores: ResumoLancamentosUsuariosModel[] = [];
  resumo: ResumoInventarioModel = new ResumoInventarioModel();
  inventario: InventarioModel = new InventarioModel();
  ambiente: AmbienteModel = new AmbienteModel();

  parametro: FormGroup;

  anos: number[] = [2023, 2024, 2025, 2026, 2027];
  hoje: Date = new Date();
  ano: number = 0;
  mes: number = 0;
  mes_ext: string = '';
  meses: ListaMeses = new ListaMeses();

  evolucoes: EvolucaoModel[] = [];

  constructor(
    private globalService: GlobalService,
    private formBuilder: FormBuilder,
    private lancamentoService: LancamentoService,
    private inventarioService: InventarioService,
    private usuarioService: UsuariosService,
    private appSnackBar: AppSnackbar
  ) {
    google.charts.load('current', { packages: ['corechart'] });
    this.parametro = formBuilder.group({
      ano: [{ value: '' }],
      mes: [{ value: '' }],
    });
  }

  ngOnInit(): void {
    this.inventario = this.globalService.getInventario();
    this.getAmbiente();
  }

  ngOnDestroy() {
    this.inscricaoExecutores?.unsubscribe();
    this.inscricaoResumo?.unsubscribe();
    this.inscricaoAmbiente?.unsubscribe();
    this.inscricaoEvolucoes?.unsubscribe();
  }

  onAtualizar() {
    this.getAmbiente();
  }

  getAmbiente() {
    this.globalService.setSpin(true);
    this.ambiente.id_retorno = 400;
    this.ambiente.mensa_retorno = 'Buscando Dados Do Inventário';
    this.inscricaoAmbiente = this.usuarioService
      .getambiente(
        this.globalService.getEmpresa().id,
        this.globalService.getUsuario().id
      )
      .subscribe(
        (data: AmbienteModel) => {
          this.globalService.setSpin(false);
          this.ambiente = data;
          if (this.ambiente.id_retorno == 200) {
            this.getExecutores();
          }
        },
        (error: any) => {
          this.globalService.setSpin(false);
          this.ambiente = new AmbienteModel();
          this.ambiente.id_retorno = 409;
          this.ambiente.mensa_retorno =
            'Ambiente Não Encontado Ou Incomplento!';
          this.appSnackBar.openFailureSnackBar(
            `Pesquisa Ambiente ${messageError(error)}`,
            'OK'
          );
        }
      );
  }

  getExecutores() {
    let par = new ParametroLancamentoUsuario();

    par.id_empresa = this.globalService.getEmpresa().id;
    par.id_filial = this.globalService.getLocal().id;
    par.id_inventario = this.globalService.getInventario().codigo;

    this.globalService.setSpin(true);
    this.inscricaoExecutores = this.lancamentoService
      .resumolancamentos(par)
      .subscribe(
        (data: ResumoLancamentosUsuariosModel[]) => {
          this.globalService.setSpin(false);
          this.executores = data;
          this.getResumo();
        },
        (error: any) => {
          this.globalService.setSpin(false);
          this.executores = [];
          this.getResumo();
        }
      );
  }

  getResumo() {
    this.globalService.setSpin(true);
    this.inscricaoResumo = this.inventarioService
      .resumoInventario(
        this.globalService.getEmpresa().id,
        this.globalService.getLocal().id,
        this.globalService.getInventario().codigo
      )
      .subscribe(
        (data: ResumoInventarioModel) => {
          this.globalService.setSpin(false);
          this.resumo.descricao = data.descricao;
          this.resumo.responsavel = data.responsavel;
          this.resumo.situacao = data.situacao;
          this.resumo.total_ativos = data.total_ativos;
          this.resumo.total_inventariados = data.total_inventariados;
          this.resumo.situacao_0 = data.situacao_0;
          this.resumo.situacao_1 = data.situacao_1;
          this.resumo.situacao_2 = data.situacao_2;
          this.resumo.situacao_3 = data.situacao_3;
          this.resumo.situacao_4 = data.situacao_4;
          this.resumo.situacao_5 = data.situacao_5;
          this.resumo.fotos = data.fotos;
          if (this.resumo.total_inventariados > 0) {
            let total_fotos: ResumoLancamentosUsuariosModel =
              new ResumoLancamentosUsuariosModel();
            total_fotos.razao = 'TOTAL DE FOTOS';
            total_fotos.total = this.resumo.fotos;
            this.executores.push(total_fotos);
            this.getEvolucoes();
          }
        },
        (error: any) => {
          this.globalService.setSpin(false);
          this.resumo = new ResumoInventarioModel();
          this.appSnackBar.openFailureSnackBar(
            `Pesquisa Resumo Inventarios ${messageError(error)}`,
            'OK'
          );
        }
      );
  }

  getEvolucoes() {
    const par: ParametroLancamento02 = new ParametroLancamento02();
    par.id_empresa = this.globalService.getEmpresa().id;
    par.id_filial = this.globalService.getLocal().id;
    par.id_inventario = this.globalService.getInventario().codigo;
    par.pagina = 1;
    par.tamPagina = 5;
    this.globalService.setSpin(true);
    this.inscricaoEvolucoes = this.lancamentoService.evolucoes(par).subscribe(
      (data: EvolucaoModel[]) => {
        this.globalService.setSpin(false);
        this.evolucoes = data;
        this.Atualizar();
      },
      (error: any) => {
        this.globalService.setSpin(false);
        this.resumo = new ResumoInventarioModel();
        this.appSnackBar.openFailureSnackBar(
          `Pesquisa Evoluções ${messageError(error)}`,
          'OK'
        );
      }
    );
  }
  Atualizar() {
    if (this.globalService.logado) {
      this.buidChartExecutores();
      this.buidChartEvolucao();
    }
  }

  buidChartExecutores() {
    var func = (chart: any) => {
      var horas: number = 0;
      var data = new google.visualization.DataTable();
      data.addColumn('string', 'Topping');
      data.addColumn('number', 'Slices');
      const qtd_inventario =
        this.resumo.situacao_1 +
        this.resumo.situacao_2 +
        this.resumo.situacao_3 +
        this.resumo.situacao_4 +
        this.resumo.situacao_5;
      data.addRows([['Inventariado', qtd_inventario]]);
      data.addRows([['Não Inventariado', this.resumo.situacao_0]]);
      var options = {
        title: `SITUAÇÃO DO INVENTÁRIO `,
        width: 450,
        height: 350,
        colors:["green","red"],
        chartArea:{
          width: '90%',
          height: '90%'
        },
        is3D : true
      };
      chart().draw(data, options);
    };
    var chart = () =>
      new google.visualization.PieChart(document.getElementById('chart_div'));
    var callBack = () => func(chart);
    google.charts.setOnLoadCallback(callBack);
  }

  buidChartEvolucao() {
    var func = (chart: any) => {
      var horas: number = 0;
      var dados = [];
      dados.push(['Data', 'Apontamentos']);
      for (let i = this.evolucoes.length - 1; i >= 0; i--) {
        dados.push([
          this.evolucoes[i].dtlanca.substring(0, 5),
          Number(this.evolucoes[i].total),
        ]);
      }

      /* dados.push(['19/08', Number(this.evolucoes[1].total)]);
      dados.push(['16/08', 61]);
      dados.push(['15/08', 43]);
      dados.push(['14/08', 45]);
      dados.push(['13/08', 22]); */
      var data = google.visualization.arrayToDataTable(dados);
      /* var data = google.visualization.arrayToDataTable([
        ['Data', 'Apontamentos'],
        ['19/08', 13],
        ['16/08', 61],
        ['15/08', 43],
        ['14/08', 45],
        ['13/08', 22],
      ]); */

      var options = {
        title: 'Evolução Dos Apontamentos',
        curveType: 'function',
        legend: { position: 'bottom' },
      };
      chart().draw(data, options);
    };
    var chart = () =>
      new google.visualization.LineChart(document.getElementById('chart_div2'));
    var callBack = () => func(chart);
    google.charts.setOnLoadCallback(callBack);
  }

  getTextoAtivos(): String {
    return this.resumo.total_ativos == 0
      ? 'Nenhum Ativo Anexado Neste Invetário'
      : `${this.resumo.total_inventariados}/${this.resumo.total_ativos}`;
  }

  onParametrosChange() {}
}
