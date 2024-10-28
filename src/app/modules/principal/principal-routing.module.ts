import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrudPrincipalComponent } from './crud-principal/crud-principal.component';
import { PrincipalViewComponent } from './principal-view/principal-view.component';

const routes: Routes = [
  { path: '', redirectTo: 'principais', pathMatch: 'full' },
  { path: 'principais', component: CrudPrincipalComponent },
  { path: 'principais/:retorno', component: CrudPrincipalComponent },
  {
    path: 'principal/:id_empresa/:id_local/:codigo/:acao',
    component: PrincipalViewComponent,
    canActivate: [],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PrincipalRoutingModule {}
