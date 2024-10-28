import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AmbienteRoutingModule } from './ambiente-routing.module';
import { MaterialModule } from 'src/app/material/material.module';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgxMaskModule } from 'ngx-mask';
import { CrudAmbienteComponent } from './crud-ambiente/crud-ambiente.component';

@NgModule({
  declarations: [CrudAmbienteComponent],
  imports: [
    CommonModule,
    AmbienteRoutingModule,
    MaterialModule,
    ScrollingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    NgxMaskModule.forChild(),
  ],
})
export class AmbienteModule {}
