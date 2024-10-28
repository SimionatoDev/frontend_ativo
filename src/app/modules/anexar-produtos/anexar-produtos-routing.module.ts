import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnexarProdutosComponent } from './anexar-produtos/anexar-produtos.component';

const routes: Routes = [
  { path: '', redirectTo: 'anexar-produtos', pathMatch: 'full' },
  { path: 'anexar-produtos', component: AnexarProdutosComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AnexarProdutosRoutingModule {}
