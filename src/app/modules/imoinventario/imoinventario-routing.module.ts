import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrudImoinventarioComponent } from './crud-imoinventario/crud-imoinventario.component';
import { ShowFotosComponent } from './show-fotos/show-fotos.component';

const routes: Routes = [
  { path: '', redirectTo: 'imoinventarios', pathMatch: 'full' },
  { path: 'imoinventarios', component: CrudImoinventarioComponent },
  { path: 'imoinventarios/:retorno', component: CrudImoinventarioComponent },
  {
    path: 'imoinventariosfotos/:id_empresa/:id_local/:id_inventario/:id_imobilizado',
    component: ShowFotosComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ImoinventarioRoutingModule {}
