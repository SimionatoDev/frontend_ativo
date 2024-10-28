import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InventarioRoutingModule } from './inventario-routing.module';
import { CrudInventarioComponent } from './crud-inventario/crud-inventario.component';
import { InventarioViewComponent } from './inventario-view/inventario-view.component';
import { MaterialModule } from 'src/app/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgxMaskModule } from 'ngx-mask';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { InventarioUsuarioComponent } from './inventario-usuario/inventario-usuario.component';

@NgModule({
  declarations: [
    CrudInventarioComponent,
    InventarioViewComponent,
    InventarioUsuarioComponent,
  ],
  imports: [
    CommonModule,
    InventarioRoutingModule,
    MaterialModule,
    ScrollingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    NgxMaskModule.forChild(),
  ],
})
export class InventarioModule {}
