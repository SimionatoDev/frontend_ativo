import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CentrocustoRoutingModule } from './centrocusto-routing.module';
import { CrudCentrocustoComponent } from './crud-centrocusto/crud-centrocusto.component';
import { CentrocustoViewComponent } from './centrocusto-view/centrocusto-view.component';
import { MaterialModule } from 'src/app/material/material.module';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgxMaskModule } from 'ngx-mask';

@NgModule({
  declarations: [CrudCentrocustoComponent, CentrocustoViewComponent],
  imports: [
    CommonModule,
    CentrocustoRoutingModule,
    MaterialModule,
    ScrollingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    NgxMaskModule.forChild(),
  ],
})
export class CentrocustoModule {}
