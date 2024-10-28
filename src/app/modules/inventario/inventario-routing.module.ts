import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrudInventarioComponent } from './crud-inventario/crud-inventario.component';
import { InventarioViewComponent } from './inventario-view/inventario-view.component';
import { InventarioUsuarioComponent } from './inventario-usuario/inventario-usuario.component';

const routes: Routes = [
  { path: '', redirectTo: 'inventarios', pathMatch: 'full' },
  { path: 'inventarios', component: CrudInventarioComponent },
  { path: 'inventarios/:retorno', component: CrudInventarioComponent },
  {
    path: 'inventario/:id_empresa/:id_local/:codigo/:acao',
    component: InventarioViewComponent,
  },
  {
    path: 'usuarios/:id_empresa/:id_local/:codigo',
    component: InventarioUsuarioComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InventarioRoutingModule {}
