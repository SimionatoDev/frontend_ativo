import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrudValorComponent } from './crud-valor/crud-valor.component';
import { ViewValorComponent } from './view-valor/view-valor.component';

const routes: Routes = [
  { path: '', redirectTo: 'valores', pathMatch: 'full' },
  { path: 'valores', component: CrudValorComponent },
  {
    path: 'valores/:retorno',
    component: CrudValorComponent,
    canActivate: [],
  },
  {
    path: 'valor/:id_empresa/:id_local/:id_imobilizado/:acao',
    component: ViewValorComponent,
    canActivate: [],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ValorRoutingModule {}
