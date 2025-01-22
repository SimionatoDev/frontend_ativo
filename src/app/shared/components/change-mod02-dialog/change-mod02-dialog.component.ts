import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { ImobilizadoinventarioModel } from 'src/app/models/imobilizadoinventario-model';
import { ChangeMod02Data } from './change-mod02-data';
import { GlobalService } from 'src/app/services/global.service';
import { AppSnackbar } from '../../classes/app-snackbar';
import { ImobilizadoinventarioService } from 'src/app/services/imobilizadoinventario.service';
import { OrigemPipe } from '../../pipes/origem.pipe';
import { SimNaoPipe } from '../../pipes/sim-nao.pipe';
import { CondicaoPipePipe } from '../../pipes/condicao-pipe.pipe';
import { DeparaService } from 'src/app/services/depara.service';
import { CadastroAcoes } from '../../classes/cadastro-acoes';
import { ParametroImobilizadoinventario01 } from 'src/app/parametros/parametro-imobilizadoinventario01';
import { messageError } from '../../classes/util';
import { DeParaModel } from 'src/app/models/de-para-model';
import { ParametroSubstituirAtivo } from 'src/app/parametros/parametro-substituir-ativo';

@Component({
  selector: 'app-change-mod02-dialog',
  templateUrl: './change-mod02-dialog.component.html',
  styleUrls: ['./change-mod02-dialog.component.css']
})
export class ChangeMod02DialogComponent implements OnInit {


  inscricaoAcao!: Subscription;
  inscricaoGetImobilizado!:Subscription;
  inscricaoInsereDepara!:Subscription;
  inscricaoProcessarDePara!:Subscription;

  formulario: FormGroup;
  labelCadastro: string = '';
  readOnly: boolean = false;
  gravando: boolean = false;
  focusEntrada  : boolean = false;
  focusCancelar : boolean = false;
  panelOpenState = false;
  destino:ImobilizadoinventarioModel = new ImobilizadoinventarioModel();
  mensagem:string = "";
  itsOK:boolean = false;

  constructor(

    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<ChangeMod02DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ChangeMod02Data,
    private globalService: GlobalService,
    private appSnackBar: AppSnackbar,
    private imoInventarioService: ImobilizadoinventarioService,
    private simNaoPipe: SimNaoPipe,
    private origemPipe:OrigemPipe,
    private condicaoPipePipe:CondicaoPipePipe,
    private deparaSrv:DeparaService
  ) {
    this.formulario = formBuilder.group({
      de: [{ value: '' }],
      deDescricao: [{ value: '' }],
      para: [{ value: '' }],
      paraDescricao: [{ value: '' }],
      }); }


  ngOnInit(): void {
    this.data.processar = false;
    this.setValue();
 }

 ngOnDestroy(): void {
   this.inscricaoAcao?.unsubscribe();
   this.inscricaoGetImobilizado?.unsubscribe();
   this.inscricaoInsereDepara?.unsubscribe();
   this.inscricaoProcessarDePara?.unsubscribe();
 }

 actionFunction() {
   if (this.formulario.valid) {
     this.executaAcao();
   } else {
     this.formulario.markAllAsTouched();
     this.appSnackBar.openSuccessSnackBar(
       `Formulário Com Campos Inválidos.`,
       'OK'
     );
   }
 }

 closeModal() {
   this.dialogRef.close();
 }

 getAcoes() {
   return CadastroAcoes;
 }

 setAcao(op: number) {
   this.focusEntrada = false;
   this.focusCancelar = false;
       this.labelCadastro = `Inclusão`;
       this.readOnly = false;
       this.focusEntrada = true;
 }

 executaAcao() {
   this.itsOK = false;
   this.insereDePara();

 }

 getLabelCancel() {
     return 'Cancelar';
 }

 setValue() {
   this.formulario.setValue({
     de: this.data.ativo.id_imobilizado,
     deDescricao:this.data.ativo.imo_descricao,
     para: "",
     paraDescricao:""
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

 hasValue(campo: string): boolean {
   if (this.formulario.get(campo)?.value == "") {
     return false;
   }
   return true;
}

getImoIven() {
 let par = new ParametroImobilizadoinventario01();

 par.id_empresa = this.globalService.getIdEmpresa();

 par.id_filial = this.globalService.getLocal().id;

 par.id_inventario = this.globalService.getInventario().codigo;

let key = parseInt(this.formulario.value.para, 10);

if (isNaN(key)) {
     par.id_imobilizado = 0;
   } else {
     par.id_imobilizado = key;
 }

 par.pagina = 0;

 this.globalService.setSpin(true);
 this.inscricaoGetImobilizado = this.imoInventarioService
   .getImobilizadosinventariosParametro_01(par)
   .subscribe(
     (data: ImobilizadoinventarioModel[]) => {
       this.globalService.setSpin(false);
       this.destino = data[0];
       this.atualizar();
       this.mensagem = "Tudo OK Para Fazer A Substituição"
       this.itsOK = true;
       this.appSnackBar.openSuccessSnackBar(
        `Atenção! ${this.mensagem}`,
        'OK'
        );
     /*  if (this.destino.imo_origem != "P"){
         this.mensagem = "Este Ativo Não É De Origem 'PLANILHA'";
         this.itsOK = false;
         this.appSnackBar.openFailureSnackBar(
         `Atenção! ${this.mensagem}`,
         'OK'
         );
         this.itsOK = false;
         return
       } */
      /*  if (this.destino.id_lanca != 0){
         this.mensagem = "Este Ativo Já Foi Inventariado!";
         this.itsOK = false;
         this.appSnackBar.openFailureSnackBar(
         `Atenção! ${this.mensagem}`,
         'OK'
         );
         this.itsOK = false;
         return
       } */
     },
     (error: any) => {
       this.globalService.setSpin(false);
       this.destino = new ImobilizadoinventarioModel();
       this.mensagem = "Ativo Não Localizado!";
       this.setValue();
       this.appSnackBar.openFailureSnackBar(
         `Pesquisa Nos Produtos De Inventário ${messageError(error)}`,
         'OK'
       );
     }
   );
}


insereDePara() {

 const depara:DeParaModel = new DeParaModel();

 depara.id_empresa    = this.data.ativo.id_empresa;
 depara.id_local      = this.data.ativo.id_filial;
 depara.id_inventario = this.data.ativo.id_inventario;
 depara.de            = this.data.ativo.id_imobilizado;
 depara.para          = this.destino.id_imobilizado;
 depara.status        = 0;
 depara.user_insert   = this.globalService.getUsuario().id;

 this.globalService.setSpin(true);
 this.inscricaoInsereDepara = this.deparaSrv
   .deparaInsert(depara)
   .subscribe(
     (data: DeParaModel) => {
        this.globalService.setSpin(false);
        this.mensagem = "Solcitação De Substituição Incluída Na Fila.";
        this.TrocarAtivo();
     },
     (error: any) => {
       this.globalService.setSpin(false);
       this.mensagem = "Não Foi Possivel Incluir A Solcitação De Substituição.";
       this.appSnackBar.openFailureSnackBar(
         `Falha Na Inclusão do De Para ${messageError(error)}`,
         'OK'
       );
     }
   );
}

TrocarAtivo() {

 const param:ParametroSubstituirAtivo = new ParametroSubstituirAtivo();

 param.id_empresa    = this.data.ativo.id_empresa;
 param.id_local      = this.data.ativo.id_filial;
 param.id_inventario = this.data.ativo.id_inventario;

 this.globalService.setSpin(true);
 this.inscricaoProcessarDePara = this.deparaSrv
   .substituirAtivo(param)
   .subscribe(
     (data: any) => {
        this.globalService.setSpin(false);
        this.mensagem = "Troca Processada Com Sucesso!"
        this.appSnackBar.openSuccessSnackBar(
         `${this.mensagem}`,
         'OK'
       );
       this.data.processar = true;
       this.closeModal();
     },
     (error: any) => {
       this.globalService.setSpin(false);
       this.mensagem = `Falha Na Troca Do Ativo. ${error.message}`;
       this.appSnackBar.openFailureSnackBar(
         `${this.mensagem}`,
         'OK'
       );
     }
   );
}

pesquisar(){
 this.getImoIven();
}

atualizar(){
 this.formulario.patchValue({
     paraDescricao:this.destino.imo_descricao,
     })
}


}
