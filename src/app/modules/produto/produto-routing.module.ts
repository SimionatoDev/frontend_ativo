import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrudProdutoComponent } from './crud-produto/crud-produto.component';
import { ViewProdutoComponent } from './view-produto/view-produto.component';

const routes: Routes = [
  { path: '', redirectTo: 'produtos', pathMatch: 'full' },
  { path: 'produtos', component: CrudProdutoComponent },
  { path: 'produtos/:retorno', component: CrudProdutoComponent },
  {
    path: 'produto/:id_empresa/:id_local/:codigo/:acao',
    component: ViewProdutoComponent,
    canActivate: [],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProdutoRoutingModule {}
