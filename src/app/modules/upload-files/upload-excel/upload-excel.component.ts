import { GlobalService } from 'src/app/services/global.service';
import { Component, OnInit } from '@angular/core';
import { LocalModel } from 'src/app/models/local-model';
import { EmpresaModel } from 'src/app/models/empresa-model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-upload-excel',
  templateUrl: './upload-excel.component.html',
  styleUrls: ['./upload-excel.component.css'],
})
export class UploadExcelComponent implements OnInit {
  empresa: EmpresaModel = new EmpresaModel();
  local: LocalModel = new LocalModel();
  files: Set<File>;
  constructor(private globalService: GlobalService, private router: Router) {
    this.empresa = this.globalService.getEmpresa();
    this.local = this.globalService.getLocal();
    this.files = new Set();
  }

  ngOnInit(): void {}

  onHome() {
    this.router.navigate(['']);
  }

  onUpLoad(event: any) {
    console.log(event.srcElement.files);
    const selectFiles = <FileList>event.srcElement.files;
    const fileNames = [];

    for (let i = 0; i < selectFiles.length; i++) {
      fileNames.push(selectFiles[i].name);
      this.files.add(selectFiles[i]);
    }
  }
}
