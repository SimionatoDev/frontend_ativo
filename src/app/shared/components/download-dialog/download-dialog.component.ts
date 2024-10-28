import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Escopo } from '../../classes/escopo';
import { ImobilizadoinventarioService } from 'src/app/services/imobilizadoinventario.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AppSnackbar } from '../../classes/app-snackbar';
import { DownloadDialogData } from './download-dialog-data';
import { ParametroImobilizadoinventario01 } from 'src/app/parametros/parametro-imobilizadoinventario01';
import { messageError } from '../../classes/util';
import { FileService } from 'src/app/services/file.service';
import { ParametroDownloadfile } from 'src/app/parametros/parametro-downloadfile';

@Component({
  selector: 'app-download-dialog',
  templateUrl: './download-dialog.component.html',
  styleUrls: ['./download-dialog.component.css']
})
export class DownloadDialogComponent implements OnInit {

  inscricaoDownLoad!: Subscription;
  inscricaoExcel!: Subscription;

  showSpin:boolean = false;
  formulario: FormGroup;
  escopos:Escopo[] = [{sigla:"T", descricao : "Toda Consulta"},{sigla:"P", descricao : "Página Atual"}]
  processando:string = "Aguardando Definições";

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<DownloadDialogComponent>,
    public imoInventarioService:ImobilizadoinventarioService,
    private fileService:FileService,
    private appSnackBar: AppSnackbar,
    @Inject(MAT_DIALOG_DATA) public data: DownloadDialogData
  ) {
    this.formulario = formBuilder.group({
      escopo: [{ value: '' }]
    });
   }

   ngOnInit(): void {
    this.data.resposta = 'N';
    this.setValue();
  }

  ngOnDestroy(): void {
    this.inscricaoDownLoad?.unsubscribe();
    this.inscricaoExcel?.unsubscribe();
  }


  closeModal() {
    this.dialogRef.close();
  }


  setValue() {
    this.formulario.setValue({
      escopo: this.data.escopo
    });
  }


  onProcessar(){
    if (this.formulario.valid) {
      this.data.escopo       = this.formulario.value.escopo;
      this.GerarExcel();
    } else {
      this.formulario.markAllAsTouched();
      this.appSnackBar.openSuccessSnackBar(
        `Formulário Com Campos Inválidos.`,
        'OK'
      );
    }
  }

  GerarExcel() {

    let par = new ParametroImobilizadoinventario01();

    par.id_empresa = this.data.id_empresa;

    par.id_filial = this.data.id_filial;

    par.id_inventario = this.data.id_inventario;

    par = this.atualizaParametro(par);

    par.contador = 'N';

    par.pagina = this.data.escopo == "T" ? 0 : this.data.pagina;

    par.orderby = 'Imobilizado';

    this.processando = "Gerando Consulta Em Excel!";

    this.showSpin = true;

    this.inscricaoExcel = this.imoInventarioService
      .getExcelv2(par)
      .subscribe(
        (data: any) => {
          this.showSpin = false;
          console.log(data);
          this.downLoad(data.filename);
        },
        (error: any) => {
          this.showSpin = false;
          this.appSnackBar.openFailureSnackBar(
            `Pesquisa Nos Produtos De Inventário ${messageError(error)}`,
            'OK'
          );
        }
      );
  }

  downLoad(fileName:string) {


    let par = new ParametroDownloadfile();

    par.id_empresa = this.data.id_empresa;

    par.id_filial = this.data.id_filial;

    par.id_inventario = this.data.id_inventario;

    par.fileName = fileName;

    const url = this.fileService.urlDowLoad(par);

    //window.open(url, '_blank');

    window.open(url);

    this.closeModal();

  }

  atualizaParametro(par : ParametroImobilizadoinventario01 ) : ParametroImobilizadoinventario01{

    let config = this.data.parametro.getParametro();

    let key:number = 0;

    if (Object(config).cc !== '') {
      par.id_cc = Object(config).cc;
    }
    if (Object(config).cc_novo !== '') {
      par.new_cc = Object(config).cc_novo;
    }

    key = parseInt(Object(config).id_grupo, 10);

    if (isNaN(key)) {
      par.id_grupo = 0;
    } else {
      par.id_grupo = key;
    }

    key = parseInt(Object(config).situacao, 10);

    if (isNaN(key)) {
      par.status = 0;
    } else {
      par.status = key;
    }

    key = parseInt(Object(config).codigo, 10);

    if (isNaN(key)) {
      par.id_imobilizado = 0;
    } else {
      par.id_imobilizado = key;
    }

    key = parseInt(Object(config).novo, 10);

    if (isNaN(key)) {
      par.new_codigo = 0;
    } else {
      par.new_codigo = key;
    }

    key = parseInt(Object(config).condicao, 10);

    if (isNaN(key)) {
      par.condicao = 0;
    } else {
      par.condicao = key;
    }

    if (Object(config).book.trim() !== '') {
      par.book = Object(config).book;
    }

    if (Object(config).descricao.trim() !== '') {
      par.descricao = Object(config).descricao;
    }

    if (Object(config).observacao.trim() !== '') {
      par.observacao = Object(config).observacao;
    }

    key = parseInt(Object(config).executor, 10);

    if (isNaN(key)) {
      par.id_usuario = 0;
    } else {
      par.id_usuario = key;
    }

    if (Object(config).origem.trim() !== '') {
      par.origem = Object(config).origem;
    }

    return par;
  }



}
