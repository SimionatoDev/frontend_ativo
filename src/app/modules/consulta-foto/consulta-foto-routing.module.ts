import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FotoViewComponent } from './foto-view/foto-view.component';

const routes: Routes = [
  { path: '', redirectTo: 'consulta_fotos', pathMatch: 'full' },
  { path: 'consulta_fotos', component: FotoViewComponent },];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConsultaFotoRoutingModule { }
