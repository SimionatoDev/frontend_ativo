import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrudGrupoComponent } from './crud-grupo/crud-grupo.component';
import { GrupoViewComponent } from './grupo-view/grupo-view.component';
const routes: Routes = [
  { path: '', redirectTo: 'grupos', pathMatch: 'full' },
  { path: 'grupos', component: CrudGrupoComponent },
  { path: 'grupos/:retorno', component: CrudGrupoComponent },
  {
    path: 'grupo/:id_empresa/:id_local/:id_imobilizado/:acao',
    component: GrupoViewComponent,
    canActivate: [],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GrupoRoutingModule {}
