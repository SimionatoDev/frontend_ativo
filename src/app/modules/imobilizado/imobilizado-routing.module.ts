import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrudImobilizadoComponent } from './crud-imobilizado/crud-imobilizado.component';
import { ImobilizadoViewComponent } from './imobilizado-view/imobilizado-view.component';

const routes: Routes = [
  { path: '', redirectTo: 'imobilizados', pathMatch: 'full' },
  { path: 'imobilizados', component: CrudImobilizadoComponent },
  { path: 'imobilizados/:retorno', component: CrudImobilizadoComponent },
  {
    path: 'imobilizado/:id_empresa/:id_local/:codigo/:acao',
    component: ImobilizadoViewComponent,
    canActivate: [],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ImobilizadoRoutingModule {}
