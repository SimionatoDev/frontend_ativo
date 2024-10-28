import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UploadExcelComponent } from './upload-excel/upload-excel.component';

const routes: Routes = [
  { path: '', redirectTo: 'upload-excel', pathMatch: 'full' },
  { path: 'upload-excel', component: UploadExcelComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UploadFilesRoutingModule {}
