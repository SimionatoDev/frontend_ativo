import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LocalPadraoData } from './local-padrao-data';

@Component({
  selector: 'app-local-padrao-dialog',
  templateUrl: './local-padrao-dialog.component.html',
  styleUrls: ['./local-padrao-dialog.component.css'],
})
export class LocalPadraoDialogComponent implements OnInit {
  formulario: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<LocalPadraoData>,
    @Inject(MAT_DIALOG_DATA) public data: LocalPadraoData
  ) {
    this.formulario = formBuilder.group({
      local: [{ value: 0 }, [Validators.min(1)]],
    });
  }

  ngOnInit() {
    this.setValue();
  }

  setValue() {
    this.formulario.setValue({
      local: this.data.id_local,
    });
  }

  actionFunction() {
    this.data.id_local = this.formulario.value.local;
    let idx: number = this.data.locais.findIndex((lo) => {
      return lo.id == this.data.id_local;
    });
    if (idx == -1) {
      this.data.razao = 'Local Não Definido!';
    } else {
      this.data.razao = this.data.locais[idx].razao;
    }
    this.data.processar = true;
    this.closeModal();
  }

  closeModal() {
    this.dialogRef.close();
  }

  itsOk(): boolean {
    if (!isNaN(Number(this.formulario.value.inventario))) {
      return false;
    } else {
      return true;
    }
  }
}
