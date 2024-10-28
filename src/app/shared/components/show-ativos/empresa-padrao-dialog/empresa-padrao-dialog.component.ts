import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EmpresaPadraoData } from './empresa-padrao-data';

@Component({
  selector: 'app-empresa-padrao-dialog',
  templateUrl: './empresa-padrao-dialog.component.html',
  styleUrls: ['./empresa-padrao-dialog.component.css'],
})
export class EmpresaPadraoDialogComponent implements OnInit {
  formulario: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<EmpresaPadraoData>,
    @Inject(MAT_DIALOG_DATA) public data: EmpresaPadraoData
  ) {
    this.formulario = formBuilder.group({
      empresa: [{ value: 0 }],
      save: [{ value: false }],
    });
  }

  ngOnInit() {
    this.setValue();
  }

  setValue() {
    this.formulario.setValue({
      empresa: this.data.id_empresa,
      save: false,
    });
  }

  actionFunction() {
    this.data.id_empresa = this.formulario.value.empresa;
    this.data.processar = true;
    this.data.save = this.formulario.value.save;
    this.closeModal();
  }

  closeModal() {
    this.dialogRef.close();
  }

  itsOk(): boolean {
    if (isNaN(Number(this.formulario.value.empresa))) {
      return false;
    } else {
      return true;
    }
  }
}
