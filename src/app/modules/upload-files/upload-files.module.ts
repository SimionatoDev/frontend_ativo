import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UploadFilesRoutingModule } from './upload-files-routing.module';
import { UploadExcelComponent } from './upload-excel/upload-excel.component';
import { MaterialModule } from 'src/app/material/material.module';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgxMaskModule } from 'ngx-mask';

@NgModule({
  declarations: [UploadExcelComponent],
  imports: [
    CommonModule,
    UploadFilesRoutingModule,
    MaterialModule,
    ScrollingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    NgxMaskModule.forChild(),
  ],
})
export class UploadFilesModule {}
