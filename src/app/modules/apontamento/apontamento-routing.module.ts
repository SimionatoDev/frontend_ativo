import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrudApontamentoComponent } from './crud-apontamento/crud-apontamento.component';
import { ApontamentoViewComponent } from './apontamento-view/apontamento-view.component';

const routes: Routes = [
  { path: '', redirectTo: 'apontamentos', pathMatch: 'full' },
  { path: 'apontamentos', component: CrudApontamentoComponent },
  {
    path: 'apontamento/:id_empresa/:id_local/:acao',
    component: ApontamentoViewComponent,
    canActivate: [],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ApontamentoRoutingModule {}
