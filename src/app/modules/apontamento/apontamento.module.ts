import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ApontamentoRoutingModule } from './apontamento-routing.module';
import { ApontamentoViewComponent } from './apontamento-view/apontamento-view.component';
import { CrudApontamentoComponent } from './crud-apontamento/crud-apontamento.component';
import { MaterialModule } from 'src/app/material/material.module';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgxMaskModule } from 'ngx-mask';

@NgModule({
  declarations: [ApontamentoViewComponent, CrudApontamentoComponent],
  imports: [
    CommonModule,
    ApontamentoRoutingModule,
    MaterialModule,
    ScrollingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    NgxMaskModule.forChild(),
  ],
})
export class ApontamentoModule {}
