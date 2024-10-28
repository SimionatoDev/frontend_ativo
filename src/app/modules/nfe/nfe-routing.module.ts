import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrudNfeComponent } from './crud-nfe/crud-nfe.component';
import { NfeViewComponent } from './nfe-view/nfe-view.component';

const routes: Routes = [
  { path: '', redirectTo: 'nfes', pathMatch: 'full' },
  { path: 'nfes', component: CrudNfeComponent },
  { path: 'nfes/:retorno', component: CrudNfeComponent },
  {
    path: 'nfe/:id_empresa/:id_filial/:cnpj_fornecedor/:razao_fornecedor/:id_imobilizado/:nfe/:serie/:item/:acao',
    component: NfeViewComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NfeRoutingModule {}
