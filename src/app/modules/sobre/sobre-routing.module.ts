import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { KeysComponent } from './keys/keys.component';
import { Googleoauth2Component } from './googleoauth2/googleoauth2.component';
import { ParametrosComponent } from './parametros/parametros.component';

const routes: Routes = [
  { path: '', redirectTo: 'oauth2', pathMatch: 'full' },
  { path: 'oauth2', component: Googleoauth2Component },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SobreRoutingModule {}
