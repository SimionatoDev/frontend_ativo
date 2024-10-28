import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ValorRoutingModule } from './valor-routing.module';
import { CrudValorComponent } from './crud-valor/crud-valor.component';
import { ViewValorComponent } from './view-valor/view-valor.component';
import { MaterialModule } from 'src/app/material/material.module';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgxMaskModule } from 'ngx-mask';

@NgModule({
  declarations: [ViewValorComponent, CrudValorComponent],
  imports: [
    CommonModule,
    ValorRoutingModule,
    MaterialModule,
    ScrollingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    NgxMaskModule.forChild(),
  ],
})
export class ValorModule {}
