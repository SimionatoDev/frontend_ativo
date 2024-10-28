import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConsultaFotoRoutingModule } from './consulta-foto-routing.module';
import { FotoViewComponent } from './foto-view/foto-view.component';
import { MaterialModule } from 'src/app/material/material.module';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgxMaskModule } from 'ngx-mask';

@NgModule({
  declarations: [
    FotoViewComponent,
  ],
  imports: [
    CommonModule,
    ConsultaFotoRoutingModule,
    MaterialModule,
    ScrollingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    NgxMaskModule.forChild(),
  ]
})
export class ConsultaFotoModule { }
