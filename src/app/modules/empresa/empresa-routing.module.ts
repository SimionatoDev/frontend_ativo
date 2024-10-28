import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrudEmpresaComponent } from './crud-empresa/crud-empresa.component';
import { EmpresaViewComponent } from './empresa-view/empresa-view.component';

const routes: Routes = [
  { path: '', redirectTo: 'empresas', pathMatch: 'full' },
  { path: 'empresas', component: CrudEmpresaComponent },
  {
    path: 'empresa/:id/:acao',
    component: EmpresaViewComponent,
    canActivate: [],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmpresaRoutingModule {}
