import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ImobilizadoRoutingModule } from './imobilizado-routing.module';
import { CrudImobilizadoComponent } from './crud-imobilizado/crud-imobilizado.component';
import { ImobilizadoViewComponent } from './imobilizado-view/imobilizado-view.component';
import { MaterialModule } from 'src/app/material/material.module';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgxMaskModule } from 'ngx-mask';

@NgModule({
  declarations: [CrudImobilizadoComponent, ImobilizadoViewComponent],
  imports: [
    CommonModule,
    ImobilizadoRoutingModule,
    MaterialModule,
    ScrollingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    NgxMaskModule.forChild(),
  ],
})
export class ImobilizadoModule {}
