import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PadraoCadastroRoutingModule } from './padrao-cadastro-routing.module';
import { CrudPadraoCadastroComponent } from './crud-padrao-cadastro/crud-padrao-cadastro.component';
import { MaterialModule } from 'src/app/material/material.module';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgxMaskModule } from 'ngx-mask';


@NgModule({
  declarations: [
    CrudPadraoCadastroComponent
  ],
  imports: [
    CommonModule,
    PadraoCadastroRoutingModule,
    MaterialModule,
    ScrollingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    NgxMaskModule.forChild(),
  ]
})
export class PadraoCadastroModule { }
