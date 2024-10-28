import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FotoRoutingModule } from './foto-routing.module';
import { CrudFotoComponent } from './crud-foto/crud-foto.component';
import { FotoViewComponent } from './foto-view/foto-view.component';


@NgModule({
  declarations: [
    CrudFotoComponent,
    FotoViewComponent,
  ],
  imports: [
    CommonModule,
    FotoRoutingModule
  ]
})
export class FotoModule { }
