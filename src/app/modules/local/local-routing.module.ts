import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrudLocalComponent } from './crud-local/crud-local.component';
import { LocalViewComponent } from './local-view/local-view.component';

const routes: Routes = [
  { path: '', redirectTo: 'locais', pathMatch: 'full' },
  { path: 'locais', component: CrudLocalComponent },
  { path: 'locais/:retorno', component: CrudLocalComponent },
  {
    path: 'local/:id_empresa/:id_local/:acao',
    component: LocalViewComponent,
    canActivate: [],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LocalRoutingModule {}
