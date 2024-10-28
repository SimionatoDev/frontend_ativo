import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrudFotoComponent } from './crud-foto/crud-foto.component';

const routes: Routes = [
  { path: '', redirectTo: 'fotos', pathMatch: 'full' },
  { path: 'fotos', component: CrudFotoComponent },
  { path: 'foto', component: CrudFotoComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FotoRoutingModule { }
