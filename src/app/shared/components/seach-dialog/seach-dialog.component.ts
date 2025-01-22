import { CentrocustoService } from 'src/app/services/centrocusto.service';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SeachDialogData } from './seach-dialog-data';
import { SerachModel } from 'src/app/models/serachModel';
import { ParametroGrupo01 } from 'src/app/parametros/parametro-grupo01';
import { GrupoService } from 'src/app/services/grupo.service';
import { GlobalService } from 'src/app/services/global.service';
import { Subscription } from 'rxjs';
import { map,filter,tap,take, distinctUntilChanged, debounceTime} from   'rxjs/operators';
import { ControlePaginas } from '../../classes/controle-paginas';
import { GrupoModel } from 'src/app/models/grupo-model';
import { AppSnackbar } from '../../classes/app-snackbar';
import { CadastroEnum } from '../../enum/cadastro-enum.enum';
import { ParametroCentrocusto01 } from 'src/app/parametros/parametro-centrocusto01';
import { CentrocustoModel } from 'src/app/models/centrocusto-model';

@Component({
  selector: 'app-seach-dialog',
  templateUrl: './seach-dialog.component.html',
  styleUrls: ['./seach-dialog.component.css']
})
export class SeachDialogComponent implements OnInit {

  inscricaoGetDados!: Subscription;
  formulario: FormGroup;
  lsLista:SerachModel[] = [];

  tamPagina = 50;

  controlePaginas: ControlePaginas = new ControlePaginas(this.tamPagina, 0);
  getPrincipais: any;

  constructor(
      private formBuilder: FormBuilder,
      public dialogRef: MatDialogRef<SeachDialogComponent>,
      @Inject(MAT_DIALOG_DATA) public data: SeachDialogData,
      private globalService:GlobalService,
      private grupoService:GrupoService,
      private centrocustoService: CentrocustoService,
      private appSnackBar: AppSnackbar,
  ) {
      this.formulario = formBuilder.group({
      codigo: [{ value: ''}],
      descricao: [{ value: '' }],
    });}


    ngOnInit() {
      this.setValue();
      this.setarDono();
      this.formulario.get("descricao")?.valueChanges.pipe(
        map(value => value.trim().toUpperCase()),
        filter(value => value.length > 0),
        debounceTime(350),
        distinctUntilChanged(),
       ).subscribe((value:string) => {
        this.clearValue("codigo");
        this.data.pesquisarPor = 1;
        this.getCCs("S");
       });

      this.formulario.get("codigo")?.valueChanges.pipe(
        map(value => value.trim().toUpperCase()),
        filter(value => value.length > 0),
        debounceTime(350),
        distinctUntilChanged(),
       ).subscribe((value:string) => {
        this.clearValue("descricao");
        this.data.pesquisarPor = 0;
        this.getCCs("S");
       });
      this.inicializar();
    }

    ngOnDestroy() {
      this.inscricaoGetDados?.unsubscribe();
    }


    setValue() {
      this.formulario.setValue({
        codigo   : "",
        descricao: "",
      });
    }

    clearValue(campo: string){

      if (campo == 'codigo'){
        this.formulario.patchValue({
          codigo: ""
        })
      }
      if (campo == 'descricao')
      this.formulario.patchValue({
        descricao: ''
      })
  }

  clearValueRefresh(campo: string){

    if (campo == 'codigo'){
      this.formulario.patchValue({
        codigo: ""
      })
      this.data.pesquisarPor = 0;
     }
    if (campo == 'descricao'){
      this.formulario.patchValue({
        descricao: ''
      })
      this.data.pesquisarPor = 1;
     }
     this.getCCs();
    }

    hasValue(campo: string): boolean {
    if (this.formulario.get(campo)?.value == "") {
        return false;
    }
    return true;
}

    onTodos() {
      this.data.retornoTodos = true;
      this.dialogRef.close(this.data);
    }

    onEscolher(escolha:any){

      this.data.retorno = escolha;

      this.dialogRef.close(this.data);

    }

    onCancelar(){

      this.data.cancelar = true;

      this.dialogRef.close(this.data);

    }

    touchedOrDirty(campo: string): boolean {
      if (
        this.formulario.get(campo)?.touched ||
        this.formulario.get(campo)?.dirty
      )
        return true;
      return false;
    }

    getValidfield(field: string): boolean {
      return (
        this.formulario.get(field)?.errors?.ValidatorStringLen &&
        this.touchedOrDirty(field)
      );
    }

    getMensafield(field: string): string {
      return this.formulario.get(field)?.errors?.message;
    }


   inicializar(){
    switch (this.data.cadastro){
      case CadastroEnum.Grupo:
           this.getGrupos("S");
           break;
      case CadastroEnum.CC:
           this.getCCs("S");
           break;
    }
}

  setarDono(){
      switch (this.data.cadastro){
      case CadastroEnum.Empresa:
          this.data.dono = "Empresas";
          break;
      case CadastroEnum.Usuario:
            this.data.dono = "Usuários";
          break;
      case CadastroEnum.Cliente:
            this.data.dono = "Clientes";
            break;
      case CadastroEnum.Local:
            this.data.dono = "Locais";
            break;
      case CadastroEnum.Produto:
            this.data.dono = "Produto";
            break;
      case CadastroEnum.Principal:
            this.data.dono = "Principais";
            break;
      case CadastroEnum.Imobilizado:
            this.getImobilizados();
            this.data.dono = "Imobilizados";
            break;
      case CadastroEnum.Nfe:
          this.data.dono = "Notas Fiscais";
            break;
      case CadastroEnum.Valor:
          this.data.dono = "Valores";
            break;
      case CadastroEnum.Grupo:
          this.data.dono = "Grupos";
          this.data.retorno = new GrupoModel();
          break;
      case CadastroEnum.CC:
          this.data.dono = "Centros De Custos";
          this.data.retorno = new CentrocustoModel();
          break;
      case CadastroEnum.Inventario:
          this.data.dono = "Inventários";
          break;
      }
 }


  buscarDados(){
    switch (this.data.cadastro){
      case CadastroEnum.Empresa:
          this.getEmpresas();
          break;
      case CadastroEnum.Usuario:
          this.getUsuários();
          break;
      case CadastroEnum.Cliente:
            this.Clientes();
            break;
      case CadastroEnum.Local:
            this.getLocais();
            break;
      case CadastroEnum.Produto:
            this.getProdutos();
            break;
      case CadastroEnum.Principal:
            this.getPrincipais;
            break;
      case CadastroEnum.Imobilizado:
            this.getImobilizados();
            break;
      case CadastroEnum.Nfe:
            this.getNfes();
            break;
      case CadastroEnum.Valor:
            this.getValores();
            break;
      case CadastroEnum.Grupo:
          this.getGrupos();
          break;
      case CadastroEnum.CC:
          this.getCCs();
          break;
      case CadastroEnum.Inventario:
          this.getInventarios()
          break;
    }
  }



  onChangePage() {
    this.buscarDados();
  }

    getGrupos(contador:string = "N") {

      let par = new ParametroGrupo01();

      par.id_empresa = this.globalService.getEmpresa().id;

      par.id_filial = this.globalService.getLocal().id;

      if(this.data.pesquisarPor == 0){
        let key = parseInt(this.formulario.value.codigo, 10);
        if (isNaN(key)) {
          par.codigo = 0;
        } else {
          par.codigo = key;
        }
      }
      if(this.data.pesquisarPor == 1){
       par.descricao = this.formulario.value.descricao.toUpperCase();
      }
      par.orderby = "";

      if (contador == "S"){

        par.pagina = 0

        par.contador = 'S';


      } else {

        par.pagina = this.controlePaginas.getPaginalAtual();

        par.contador = 'N';

        par.tamPagina = this.tamPagina;

      }
      //this.globalService.setSpin(true);
      this.inscricaoGetDados = this.grupoService
        .getGruposParametro_01(par)
        .subscribe(
          (data: any) => {
            this.lsLista = [];
            //this.globalService.setSpin(false);
            if (contador == "S"){
              this.controlePaginas = new ControlePaginas(
                this.tamPagina,
                data.total == 0 ? 1 : data.total
              );
              this.getGrupos();
            } else {
              (data as GrupoModel[]).forEach(grupo => {
                const gru:SerachModel = new SerachModel();
                gru.codigo = grupo.codigo.toString();
                gru.descricao = grupo.descricao;
                this.lsLista.push(gru);
             });
            }
          },
          (error: any) => {
            //this.globalService.setSpin(false);
            this.lsLista = [];
            this.appSnackBar.openFailureSnackBar(
              `Sem Sucesso Na Pesquisa!`,
              'OK'
            );
          }
        );
    }


    getCCs(contador:string = "N") {

      let par = new ParametroCentrocusto01()

      par.id_empresa = this.globalService.getIdEmpresa();

      par.id_filial = this.globalService.getLocal().id;

      if(this.data.pesquisarPor == 0){
        par.codigo = this.formulario.value.codigo.replace("-","#");
      }
      if(this.data.pesquisarPor == 1){
       par.descricao = this.formulario.value.descricao.toUpperCase();
      }
      par.orderby = "";

      if (contador == "S"){

        par.pagina = 0

        par.contador = 'S';


      } else {

        par.pagina = this.controlePaginas.getPaginalAtual();

        par.contador = 'N';

        par.tamPagina = this.tamPagina;

      }
      //this.globalService.setSpin(true);
      this.inscricaoGetDados = this.centrocustoService
        .getCentroscustosParametro_01(par)
        .subscribe(
          (data: any) => {
            this.lsLista = [];
            //this.globalService.setSpin(false);
            if (contador == "S"){
              this.controlePaginas = new ControlePaginas(
                this.tamPagina,
                data.total == 0 ? 1 : data.total
              );
              this.getCCs();
            } else {
              (data as CentrocustoModel[]).forEach(cc => {
                const gru:SerachModel = new SerachModel();
                gru.codigo = cc.codigo.toString();
                gru.descricao = cc.descricao;
                this.lsLista.push(gru);
             });
            }
          },
          (error: any) => {
            //this.globalService.setSpin(false);
            console.log(error);
            this.lsLista = [];
            this.appSnackBar.openFailureSnackBar(
              `Sem Sucesso Na Pesquisa!`,
              'OK'
            );
          }
        );
    }


    getInventarios() {
      throw new Error('Method not implemented.');
    }
    getValores() {
      throw new Error('Method not implemented.');
    }
    getNfes() {
      throw new Error('Method not implemented.');
    }
    getImobilizados() {
      throw new Error('Method not implemented.');
    }
    getProdutos() {
      throw new Error('Method not implemented.');
    }
    getLocais() {
      throw new Error('Method not implemented.');
    }
    Clientes() {
      throw new Error('Method not implemented.');
    }
    getUsuários() {
      throw new Error('Method not implemented.');
    }
    getEmpresas() {
      throw new Error('Method not implemented.');
    }


}
