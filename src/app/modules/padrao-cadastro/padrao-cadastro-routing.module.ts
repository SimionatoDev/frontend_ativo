import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrudPadraoCadastroComponent } from './crud-padrao-cadastro/crud-padrao-cadastro.component';

const routes: Routes = [
  { path: '', redirectTo: 'cadastro_padrao', pathMatch: 'full' },
  { path: 'cadastro_padrao', component: CrudPadraoCadastroComponent },];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PadraoCadastroRoutingModule { }
