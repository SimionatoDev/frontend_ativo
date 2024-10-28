import { Component, Inject, OnInit } from '@angular/core';
import { EmailDialogData } from './email-dialog-data';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ValidatorStringLen } from '../../Validators/validator-string-len';
import { Escopo } from '../../classes/escopo';
import { EmailService } from 'src/app/services/email.service';
import { Subscription } from 'rxjs';
import { ParametroImobilizadoinventario01 } from 'src/app/parametros/parametro-imobilizadoinventario01';
import { ImobilizadoinventarioService } from 'src/app/services/imobilizadoinventario.service';
import { AppSnackbar } from '../../classes/app-snackbar';
import { messageError } from '../../classes/util';
import { ParametroSendemailv2 } from 'src/app/parametros/parametro-sendemailv2';

@Component({
  selector: 'app-email-dialog',
  templateUrl: './email-dialog.component.html',
  styleUrls: ['./email-dialog.component.css']
})
export class EmailDialogComponent implements OnInit {

  inscricaoEmail!: Subscription;
  inscricaoExcel!: Subscription;

  showSpin:boolean = false;
  formulario: FormGroup;
  escopos:Escopo[] = [{sigla:"T", descricao : "Toda Consulta"},{sigla:"P", descricao : "Página Atual"}]
  processando:string = "Aguardando Definições";
  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<EmailDialogComponent>,
    public emailService:EmailService,
    public imoInventarioService:ImobilizadoinventarioService,
    private appSnackBar: AppSnackbar,
    @Inject(MAT_DIALOG_DATA) public data: EmailDialogData,

  ) {

    this.formulario = formBuilder.group({
      destinatario: [{ value: '' },[ValidatorStringLen(1,500, true)]],
      escopo: [{ value: '' }]
    });

  }

  ngOnInit(): void {
    this.data.resposta = 'N';
    this.setValue();
  }

  ngOnDestroy(): void {
    this.inscricaoEmail?.unsubscribe();
    this.inscricaoExcel?.unsubscribe();
  }


  closeModal() {
    this.dialogRef.close();
  }


  setValue() {
    this.formulario.setValue({
      destinatario: this.data.destinatario,
      escopo: this.data.escopo
    });
  }

  NoValidtouchedOrDirty(campo: string): boolean {
    if (
      !this.formulario.get(campo)?.valid &&
      (this.formulario.get(campo)?.touched || this.formulario.get(campo)?.dirty)
    ) {
      return true;
    }
    return false;
  }

  getMensafield(field: string): string {
    return this.formulario.get(field)?.errors?.message;
  }

  onProcessar(){
    if (this.formulario.valid) {
      this.data.destinatario = this.formulario.value.destinatario;
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
          this.sendMail(data.filename);
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

  sendMail(fileName:string) {

    let par = new ParametroSendemailv2();

    par.id_empresa = this.data.id_empresa;

    par.id_filial = this.data.id_filial;

    par.id_inventario = this.data.id_inventario;

    par.assunto = "Relatório Dos Ativos Do Inventário";

    par.destinatario =  this.data.destinatario;

    par.mensagem     = "Mensagem enviada automaticamento por solicitação do usuário. Favor Verificar Anexo."

    par.fileName = fileName;

    this.processando = "Enviando E-MAIL";

    this.showSpin = true;

    this.inscricaoEmail = this.emailService
      .sendEmailV2(par)
      .subscribe(
        (data: any) => {
          this.showSpin = false;
          this.appSnackBar.openSuccessSnackBar(
            data.message,
            'OK'
          );
          this.closeModal();
        },
        (error: any) => {
          this.showSpin = false;
          this.appSnackBar.openFailureSnackBar(
            `Falha Ao Enviar O E-Mail ${messageError(error)}`,
            'OK'
          );
        }
      );
  }


}
