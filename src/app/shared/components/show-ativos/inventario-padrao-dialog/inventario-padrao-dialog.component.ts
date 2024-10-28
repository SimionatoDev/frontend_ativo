import { Component, OnInit, Inject } from '@angular/core';
import { InventarioPadraoData } from './inventario-padrao-data';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-inventario-padrao-dialog',
  templateUrl: './inventario-padrao-dialog.component.html',
  styleUrls: ['./inventario-padrao-dialog.component.css'],
})
export class InventarioPadraoDialogComponent implements OnInit {
  formulario: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<InventarioPadraoData>,
    @Inject(MAT_DIALOG_DATA) public data: InventarioPadraoData
  ) {
    this.formulario = formBuilder.group({
      inventario: [{ value: 0 }, [Validators.min(1)]],
    });
  }

  ngOnInit() {
    this.setValue();
  }

  setValue() {
    this.formulario.setValue({
      inventario: this.data.id_inventario,
      save: false,
    });
  }

  actionFunction() {
    let idx: number = this.data.inventarios.findIndex((inv) => {
      return inv.codigo == this.data.id_inventario;
    });
    if (idx == -1) {
      this.data.descricao = 'Inventário Não Definido!';
    } else {
      this.data.descricao = this.data.inventarios[idx].descricao;
    }
    this.data.id_inventario = this.formulario.value.inventario;
    this.data.processar = true;
    this.closeModal();
  }

  closeModal() {
    this.dialogRef.close();
  }

  itsOk(): boolean {
    if (isNaN(Number(this.formulario.value.inventario))) {
      return false;
    } else {
      return true;
    }
  }
}
