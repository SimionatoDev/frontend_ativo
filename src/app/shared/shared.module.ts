import { ProgressBarComponent } from './components/progress-bar/progress-bar.component';
import { SpinsComponent } from './spins/spins.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SimNaoPipe } from './pipes/sim-nao.pipe';
import { SharedNavegatorComponent } from './components/shared-navegator/shared-navegator.component';
import { MaterialModule } from '../material/material.module';
import { AtivoPipe } from './pipes/ativo.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ShowAtivosComponent } from './components/show-ativos/show-ativos.component';
import { EmpresaPadraoDialogComponent } from './components/show-ativos/empresa-padrao-dialog/empresa-padrao-dialog.component';
import { InventarioPadraoDialogComponent } from './components/show-ativos/inventario-padrao-dialog/inventario-padrao-dialog.component';
import { RespExecDialogComponent } from './components/resp-exec-dialog/resp-exec-dialog.component';
import { QuestionDialogComponent } from './components/question-dialog/question-dialog.component';
import { BarraAcoesComponent } from './components/barra-acoes/barra-acoes.component';
import { EstadoProdutoPipe } from './pipes/estado-produto.pipe';
import { LocalPadraoDialogComponent } from './components/show-ativos/local-padrao-dialog/local-padrao-dialog.component';
import { CadastroAcoesPipe } from './pipes/cadastro-acoes.pipe';
import { SituacaoPipe } from './pipes/situacao.pipe';
import { EmBrancoPipe } from './pipes/em-branco.pipe';
import { ZeroToSpacePipe } from './pipes/zero-to-space.pipe';
import { FirstNamePipe } from './pipes/first-name.pipe';
import { LancaDialogComponent } from './components/lanca-dialog/lanca-dialog.component';
import { SetfocusDirective } from './diretivas/setfocus.directive';
import { ImobilizadoDialogComponent } from './components/imobilizado-dialog/imobilizado-dialog.component';
import { NfeDialogComponent } from './nfe-dialog/nfe-dialog.component';
import { ValoresDialogComponent } from './valores-dialog/valores-dialog.component';
import { OrigemPipe } from './pipes/origem.pipe';
import { BarraAcoesAmbienteComponent } from './components/barra-acoes-ambiente/barra-acoes-ambiente.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { FiltroImoinventarioComponent } from './components/filtro-imoinventario/filtro-imoinventario.component';
import { BrowserFotoComponent } from './components/browser-foto/browser-foto.component';
import { EmailDialogComponent } from './components/email-dialog/email-dialog.component';
import { DownloadDialogComponent } from './components/download-dialog/download-dialog.component';
import { NgxMaskModule } from 'ngx-mask';
import { CcPipePipe } from './pipes/cc-pipe.pipe';
import { CondicaoPipePipe } from './pipes/condicao-pipe.pipe';
import { FiltroCadastroPadraoComponent } from './components/filtro-cadastro-padrao/filtro-cadastro-padrao.component';
import { ChangeMod01DialogComponent } from './components/change-mod01-dialog/change-mod01-dialog.component';
import { LabelValueDirective } from './diretivas/label-value.directive';
import { LabelVerdeVermelhoDirective } from './diretivas/label-verde-vermelho.directive';
import { SeachDialogComponent } from './components/seach-dialog/seach-dialog.component';
import { ChangeMod02DialogComponent } from './components/change-mod02-dialog/change-mod02-dialog.component';
@NgModule({
  declarations: [
    SimNaoPipe,
    SharedNavegatorComponent,
    SpinsComponent,
    AtivoPipe,
    EstadoProdutoPipe,
    CadastroAcoesPipe,
    ProgressBarComponent,
    EmpresaPadraoDialogComponent,
    RespExecDialogComponent,
    QuestionDialogComponent,
    ShowAtivosComponent,
    SharedNavegatorComponent,
    InventarioPadraoDialogComponent,
    LocalPadraoDialogComponent,
    BarraAcoesComponent,
    SituacaoPipe,
    EmBrancoPipe,
    ZeroToSpacePipe,
    FirstNamePipe,
    OrigemPipe,
    LancaDialogComponent,
    SetfocusDirective,
    LabelVerdeVermelhoDirective,
    ImobilizadoDialogComponent,
    NfeDialogComponent,
    ValoresDialogComponent,
    BarraAcoesAmbienteComponent,
    DashboardComponent,
    FiltroImoinventarioComponent,
    BrowserFotoComponent,
    EmailDialogComponent,
    DownloadDialogComponent,
    CcPipePipe,
    CondicaoPipePipe,
    FiltroCadastroPadraoComponent,
    ChangeMod01DialogComponent,
    LabelValueDirective,
    SeachDialogComponent,
    ChangeMod02DialogComponent
  ],
  imports: [CommonModule, MaterialModule, FormsModule, ReactiveFormsModule,
    NgxMaskModule.forChild(),],
  exports: [
    SimNaoPipe,
    CadastroAcoesPipe,
    SharedNavegatorComponent,
    ProgressBarComponent,
    ShowAtivosComponent,
    SpinsComponent,
    SharedNavegatorComponent,
    BarraAcoesComponent,
    BarraAcoesAmbienteComponent,
    EstadoProdutoPipe,
    SituacaoPipe,
    EmBrancoPipe,
    ZeroToSpacePipe,
    FirstNamePipe,
    OrigemPipe,
    SetfocusDirective,
    LabelVerdeVermelhoDirective,
    DashboardComponent,
    FiltroImoinventarioComponent,
    BrowserFotoComponent,
    CcPipePipe,
    CondicaoPipePipe,
    FiltroCadastroPadraoComponent,
    LabelValueDirective,
    ChangeMod02DialogComponent
  ],
})
export class SharedModule {}
