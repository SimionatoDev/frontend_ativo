import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrudCentrocustoComponent } from './crud-centrocusto/crud-centrocusto.component';
import { CentrocustoViewComponent } from './centrocusto-view/centrocusto-view.component';

const routes: Routes = [
  { path: '', redirectTo: 'centroscustos', pathMatch: 'full' },
  { path: 'centroscustos', component: CrudCentrocustoComponent },
  { path: 'centroscustos/:retorno', component: CrudCentrocustoComponent },
  {
    path: 'centrocusto/:id_empresa/:id_local/:codigo/:acao',
    component: CentrocustoViewComponent,
    canActivate: [],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CentrocustoRoutingModule {}
