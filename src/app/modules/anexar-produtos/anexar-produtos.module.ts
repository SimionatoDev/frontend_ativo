import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AnexarProdutosRoutingModule } from './anexar-produtos-routing.module';
import { AnexarProdutosComponent } from './anexar-produtos/anexar-produtos.component';
import { MaterialModule } from 'src/app/material/material.module';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgxMaskModule } from 'ngx-mask';

@NgModule({
  declarations: [AnexarProdutosComponent],
  imports: [
    CommonModule,
    AnexarProdutosRoutingModule,
    MaterialModule,
    ScrollingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    NgxMaskModule.forChild(),
  ],
})
export class AnexarProdutosModule {}
