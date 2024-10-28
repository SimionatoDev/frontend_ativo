import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NfeRoutingModule } from './nfe-routing.module';
import { CrudNfeComponent } from './crud-nfe/crud-nfe.component';
import { MaterialModule } from 'src/app/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgxMaskModule } from 'ngx-mask';
import { NfeViewComponent } from './nfe-view/nfe-view.component';

@NgModule({
  declarations: [CrudNfeComponent, NfeViewComponent],
  imports: [
    CommonModule,
    NfeRoutingModule,
    MaterialModule,
    ScrollingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    NgxMaskModule.forChild(),
  ],
})
export class NfeModule {}
