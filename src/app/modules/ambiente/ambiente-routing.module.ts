import { CrudAmbienteComponent } from './crud-ambiente/crud-ambiente.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'ambientes', pathMatch: 'full' },
  { path: 'ambientes', component: CrudAmbienteComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AmbienteRoutingModule {}
