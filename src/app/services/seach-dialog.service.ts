import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { SeachDialogComponent } from '../shared/components/seach-dialog/seach-dialog.component';
import { SeachDialogData } from '../shared/components/seach-dialog/seach-dialog-data';
import { CadastroEnum } from '../shared/enum/cadastro-enum.enum';
import { ChangeMod01DialogComponent } from '../shared/components/change-mod01-dialog/change-mod01-dialog.component';
import { Observable } from 'rxjs';
import { GrupoModel } from '../models/grupo-model';
import { CentrocustoModel } from '../models/centrocusto-model';

@Injectable({
  providedIn: 'root'
})
export class SeachDialogService {

  constructor(private searchDialog:MatDialog) { }

  openSearchDialog(cadastro:CadastroEnum) {
    const data: SeachDialogData = new SeachDialogData();
    data.cadastro      = cadastro;
    data.opcaoTodos    = true;
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.id    = 'Pesquisa';
    dialogConfig.width = '1200px';
    dialogConfig.height = '600px';
    dialogConfig.data  =  data;
    return  this.searchDialog.open(SeachDialogComponent, dialogConfig);
  }


}
