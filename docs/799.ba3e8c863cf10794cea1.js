"use strict";(self.webpackChunkinventario=self.webpackChunkinventario||[]).push([[799],{9799:(va,Z,r)=>{r.r(Z),r.d(Z,{PadraoCadastroModule:()=>ua});var p=r(8583),u=r(4655),h=r(2653);class T{constructor(){this.id=0,this.apelido="",this.descricao="",this.id_usuario=0,this.pagina=0,this.tamPagina=50,this.contador="N",this.orderby="",this.sharp=!1}}function A(e,n){var t,o,i;try{let s=0;return s=parseInt(Object(n).codigo,10),e.id=isNaN(s)?0:s,""!==(null===(t=Object(n).orderby)||void 0===t?void 0:t.trim())&&(e.orderby=Object(n).orderby),""!==(null===(o=Object(n).apelido)||void 0===o?void 0:o.trim())&&(e.apelido=Object(n).apelido),""!==(null===(i=Object(n).descricao)||void 0===i?void 0:i.trim())&&(e.descricao=Object(n).descricao),e}catch(s){throw s}}var M=r(3032),m=r(3430),d=r(6809),a=r(7716),S=r(3317),D=r(2340),F=r(1841);let I=(()=>{class e{constructor(t){this.http=t,this.apiURL=D.N.apiURL}getPadroes_Cab(){return this.http.get(`${this.apiURL}Padroes_Cab`)}getPadroes_CabParametro_01(t){return console.log("Info buscar os padr\xf5es"),this.http.post(`${this.apiURL}padroes_cab`,t)}getPadrao_Cab(t){return this.http.get(`${this.apiURL}padrao_cab/${t}`)}padrao_cabInsert(t){return this.http.post(`${this.apiURL}padrao_cab`,t)}padrao_cabUpdate(t){return this.http.put(`${this.apiURL}padrao_cab`,t)}padrao_cabDelete(t){return this.http.delete(`${this.apiURL}padrao_cab/${t}`)}}return e.\u0275fac=function(t){return new(t||e)(a.LFG(F.eN))},e.\u0275prov=a.Yz7({token:e,factory:e.\u0275fac,providedIn:"root"}),e})();var x=r(454),N=r(789),g=r(2238),w=r(9617),L=r(8656),y=r(4838),J=r(7360),H=r(5062),q=r(5330),b=r(8002),C=r(5435),f=r(4395),P=r(7519),c=r(3679),V=r(5626),Y=r(9219),E=r(1095),O=r(1436),U=r(6627),v=r(8295),B=r(7441),R=r(9983),j=r(2458);function k(e,n){if(1&e){const t=a.EpF();a.TgZ(0,"button",7),a.NdJ("click",function(){return a.CHM(t),a.oxw().onGetExcelToEmailOrDownLoad("e-mail")}),a.TgZ(1,"mat-icon"),a._uU(2,"email"),a.qZA(),a.qZA()}}function G(e,n){if(1&e){const t=a.EpF();a.TgZ(0,"button",8),a.NdJ("click",function(){return a.CHM(t),a.oxw().onGetExcelToEmailOrDownLoad("download")}),a.TgZ(1,"mat-icon"),a._uU(2,"cloud_download"),a.qZA(),a.qZA()}}function Q(e,n){if(1&e&&(a.TgZ(0,"mat-option",20),a._uU(1),a.qZA()),2&e){const t=n.$implicit;a.Q6J("value",t.sigla),a.xp6(1),a.hij(" ",t.descricao," ")}}function $(e,n){if(1&e){const t=a.EpF();a.TgZ(0,"button",21),a.NdJ("click",function(){return a.CHM(t),a.oxw(2).clearValue("codigo")}),a.TgZ(1,"mat-icon"),a._uU(2,"close"),a.qZA(),a.qZA()}}function z(e,n){if(1&e){const t=a.EpF();a.TgZ(0,"button",21),a.NdJ("click",function(){return a.CHM(t),a.oxw(2).clearValue("apelido")}),a.TgZ(1,"mat-icon"),a._uU(2,"close"),a.qZA(),a.qZA()}}function W(e,n){if(1&e){const t=a.EpF();a.TgZ(0,"button",21),a.NdJ("click",function(){return a.CHM(t),a.oxw(2).clearValue("descricao")}),a.TgZ(1,"mat-icon"),a._uU(2,"close"),a.qZA(),a.qZA()}}function K(e,n){if(1&e){const t=a.EpF();a.TgZ(0,"form",9),a.TgZ(1,"div",10),a.TgZ(2,"mat-form-field",11),a.TgZ(3,"mat-label"),a._uU(4,"Ordernado Por"),a.qZA(),a.TgZ(5,"mat-select",12),a.NdJ("selectionChange",function(){return a.CHM(t),a.oxw().onChangeParametros()}),a.YNc(6,Q,2,2,"mat-option",13),a.qZA(),a.qZA(),a.TgZ(7,"mat-form-field",14),a.TgZ(8,"mat-label"),a._uU(9,"C\xf3digo"),a.qZA(),a._UZ(10,"input",15),a.YNc(11,$,3,0,"button",16),a.qZA(),a.qZA(),a.TgZ(12,"div",17),a.TgZ(13,"mat-form-field",14),a.TgZ(14,"mat-label"),a._uU(15,"Apelido"),a.qZA(),a._UZ(16,"input",18),a.YNc(17,z,3,0,"button",16),a.qZA(),a.qZA(),a.TgZ(18,"div",17),a.TgZ(19,"mat-form-field",14),a.TgZ(20,"mat-label"),a._uU(21,"Descri\xe7\xe3o"),a.qZA(),a._UZ(22,"input",19),a.YNc(23,W,3,0,"button",16),a.qZA(),a.qZA(),a.qZA()}if(2&e){const t=a.oxw();a.Q6J("formGroup",t.parametros),a.xp6(6),a.Q6J("ngForOf",t.orderby),a.xp6(5),a.Q6J("ngIf",t.hasValue("codigo")),a.xp6(6),a.Q6J("ngIf",t.hasValue("apelido")),a.xp6(6),a.Q6J("ngIf",t.hasValue("descricao"))}}let X=(()=>{class e{constructor(t,o,i,s,l,_,ha,ga){this.formBuilder=t,this.globalService=o,this.localStorageService=i,this.parametrosService=s,this.emailService=l,this.appSnackBar=_,this.EmailDialog=ha,this.DownLoadDialog=ga,this.paramName="teste",this.retorno=!1,this.email=!1,this.download=!1,this.controle_paginas=new m.e(50,0),this.hide=!0,this.change=new a.vpe,this.changeHide=new a.vpe,this.showFiltro=!0,this.executores=[],this.hideAcao="Ocultar",this.orderby=[{sigla:"001",descricao:"Codigo"},{sigla:"002",descricao:"Apelido"},{sigla:"003",descricao:"Descri\xe7\xe3o"}],this.parametro=new h.M,this.enable_filter=!0,this.parametros=t.group({orderby:[{value:""}],codigo:[{value:""}],apelido:[{value:""}],descricao:[{value:""}]}),this.setHide(),this.setValuesNoParam()}ngOnInit(){var t,o,i;this.localStorageService.getParametroModel(this.paramName),null===(t=this.parametros.get("codigo"))||void 0===t||t.valueChanges.pipe((0,b.U)(l=>l.trim()),(0,C.h)(l=>l.length>0),(0,f.b)(350),(0,P.x)()).subscribe(l=>this.onChangeParametros()),null===(o=this.parametros.get("apelido"))||void 0===o||o.valueChanges.pipe((0,b.U)(l=>l.trim().toUpperCase()),(0,C.h)(l=>l.length>0),(0,f.b)(350),(0,P.x)()).subscribe(l=>{this.onChangeParametros()}),null===(i=this.parametros.get("descricao"))||void 0===i||i.valueChanges.pipe((0,b.U)(l=>l.trim().toUpperCase()),(0,C.h)(l=>l.length>0),(0,f.b)(350),(0,P.x)()).subscribe(l=>{this.onChangeParametros()})}ngOnDestroy(){var t,o,i;null===(t=this.inscricaoParametro)||void 0===t||t.unsubscribe(),null===(o=this.inscricaoExcel)||void 0===o||o.unsubscribe(),null===(i=this.inscricaoEmail)||void 0===i||i.unsubscribe()}onGetExcelToEmailOrDownLoad(t){"E-MAIL"==t.toUpperCase()?this.openEmailDialog():this.openDownLoadDialog()}sendMail(t){let o=new q.D;o.id_empresa=this.globalService.getIdEmpresa(),o.id_filial=this.globalService.getLocal().id,o.id_inventario=this.globalService.getInventario().codigo,o.assunto="Relat\xf3rio Dos Ativos Do Invent\xe1rio",o.destinatario=this.globalService.usuario.email,o.mensagem="Mensagem enviada automaticamento por solicita\xe7\xe3o do usu\xe1rio. Favor Verificar Anexo.",o.fileName=t,this.globalService.setSpin(!0),this.inscricaoEmail=this.emailService.sendEmailV2(o).subscribe(i=>{this.globalService.setSpin(!1),this.appSnackBar.openSuccessSnackBar("E-Mail Enviado Com Sucesso!","OK")},i=>{this.globalService.setSpin(!1),this.appSnackBar.openFailureSnackBar(`Pesquisa Nos Produtos De Invent\xe1rio ${(0,d.bZ)(i)}`,"OK")})}setValues(){var t;this.enable_filter=!1,this.parametros.setValue({orderby:(0,d.SL)(this.parametro.getParametro(),"orderby"),codigo:null===(t=(0,d.P0)(this.parametro.getParametro(),"codigo"))||void 0===t?void 0:t.toString(),apelido:(0,d.SL)(this.parametro.getParametro(),"apelido"),descricao:(0,d.SL)(this.parametro.getParametro(),"descricao")}),this.enable_filter=!0}setValuesNoParam(){this.enable_filter=!1,this.parametros.setValue({orderby:"",codigo:"",apelido:"",descricao:""}),this.enable_filter=!0}setHide(){this.hide=!this.hide,this.hideAcao=this.hide?"Mostrar":"Ocultar"}loadParametros(){this.parametro=new h.M,this.parametro.id_empresa=this.globalService.getIdEmpresa(),this.parametro.modulo=this.paramName,this.parametro.assinatura="V1.00 31/10/24 A",this.parametro.id_usuario=this.globalService.usuario.id,this.parametro.parametro='\n         {\n           "codigo":0,\n           "apelido": "",\n           "descricao": "",\n           "orderby":"001",\n           "page": 1,\n           "new": false,\n           "id_retorno":0\n         }';const t=this.localStorageService.getParametroModel(this.paramName);null!==t?(this.parametro.load(t),this.setValues()):this.getParametro()}getParametro(){this.globalService.setSpin(!0);let t=new H.E;t.id_empresa=this.parametro.id_empresa,t.modulo=this.parametro.modulo,t.assinatura=this.parametro.assinatura,t.id_usuario=this.parametro.id_usuario,t.orderby="Usu\xe1rio",console.log("pesquisa",t),this.inscricaoParametro=this.parametrosService.getParametrosParametro01(t).subscribe(o=>{this.globalService.setSpin(!1),this.parametro=new h.M,this.parametro.id_empresa=o[0].id_empresa,this.parametro.modulo=o[0].modulo,this.parametro.id_usuario=o[0].id_usuario,this.parametro.assinatura=o[0].assinatura,this.parametro.parametro=o[0].parametro,this.parametro.user_insert=o[0].user_insert,this.parametro.user_update=o[0].user_update,this.setValues(),this.onChangeParametros(!1)},o=>{this.globalService.setSpin(!1),this.setValuesNoParam(),this.onChangeParametros()})}updateParametros(){this.globalService.setSpin(!0),this.parametro.user_insert=this.globalService.usuario.id,this.parametro.user_update=this.globalService.usuario.id,this.refreshParametro(),this.inscricaoParametro=this.parametrosService.ParametroAtualiza(this.parametro).subscribe(t=>{this.globalService.setSpin(!1),this.appSnackBar.openSuccessSnackBar("Par\xe2metros Atualizados","OK")},t=>{this.globalService.setSpin(!1),this.appSnackBar.openFailureSnackBar(`Grava\xe7\xe3o Dos Parametros ${(0,d.bZ)(t)}`,"OK")})}refreshParametro(t=!0){let o=this.parametro.getParametro();Object(o).codigo=this.parametros.value.codigo,Object(o).apelido=this.parametros.value.apelido.toUpperCase(),Object(o).descricao=this.parametros.value.descricao.toUpperCase(),Object(o).orderby=this.parametros.value.orderby,this.parametro.parametro=JSON.stringify(o)}onChangeParametros(t=!0){this.refreshParametro(t),this.enable_filter&&this.change.emit(this.parametro)}onSaveConfig(){this.updateParametros()}onHide(){this.setHide(),this.changeHide.emit(this.hide)}hasValue(t){var o;return""!=(null===(o=this.parametros.get(t))||void 0===o?void 0:o.value)}clearValue(t){"apelido"==t&&this.parametros.patchValue({apelido:""}),"descricao"==t&&this.parametros.patchValue({descricao:""}),this.onChangeParametros()}ChangeValue(t,o){"apelido"==t&&this.parametros.patchValue({descricao:o}),"descricao"==t&&this.parametros.patchValue({descricao:o})}openEmailDialog(){const t=new J.o;t.titulo="ENVIAR CONSULTA VIA E-MAIL",t.destinatario=this.globalService.usuario.email,t.escopo="T",t.labelBottomNao="Cancelar",t.labelBottonSim="Processar",t.id_empresa=this.globalService.empresa.id,t.id_filial=this.globalService.local.id,t.id_inventario=this.globalService.inventario.codigo,t.pagina=this.controle_paginas.getPaginalAtual(),t.parametro=this.parametro;const o=new g.vA;o.disableClose=!0,o.id="consulta-email",o.width="800px",o.data=t,this.EmailDialog.open(y.G,o).beforeClosed().subscribe(s=>{})}openDownLoadDialog(){console.log("Pagina: ",this.controle_paginas.getPaginalAtual());const t=new L.d;t.titulo="DOWNLOAD DE CONSULTA",t.escopo="T",t.labelBottomNao="Cancelar",t.labelBottonSim="Processar",t.id_empresa=this.globalService.empresa.id,t.id_filial=this.globalService.local.id,t.id_inventario=this.globalService.inventario.codigo,t.pagina=this.controle_paginas.getPaginalAtual(),t.parametro=this.parametro;const o=new g.vA;o.disableClose=!0,o.id="consulta-download",o.width="800px",o.data=t,this.DownLoadDialog.open(w.G,o).beforeClosed().subscribe(s=>{})}NoValidtouchedOrDirty(t){var o,i,s;return!((null===(o=this.parametros.get(t))||void 0===o?void 0:o.valid)||!(null===(i=this.parametros.get(t))||void 0===i?void 0:i.touched)&&!(null===(s=this.parametros.get(t))||void 0===s?void 0:s.dirty))}getMensafield(t){var o,i;return null===(i=null===(o=this.parametros.get(t))||void 0===o?void 0:o.errors)||void 0===i?void 0:i.message}onHoje(t){if(t.checked){let o=new Date(Date.now()).toLocaleString().split(",")[0];this.parametros.patchValue({dtinicial:o,dtfinal:o,hoje:!1}),this.onChangeParametros()}}onLimpar(t){t.checked&&this.parametros.patchValue({dtinicial:"",dtfinal:"",cleardate:!1}),this.onChangeParametros()}}return e.\u0275fac=function(t){return new(t||e)(a.Y36(c.qu),a.Y36(S.U),a.Y36(x.n),a.Y36(V.u),a.Y36(Y.j),a.Y36(N.W),a.Y36(g.uw),a.Y36(g.uw))},e.\u0275cmp=a.Xpm({type:e,selectors:[["app-filtro-cadastro-padrao"]],inputs:{paramName:["PARAMNAME","paramName"],retorno:["RETORNO","retorno"],email:["EMAIL","email"],download:["DOWNLOAD","download"],controle_paginas:["CONTROLE_PAGINAS","controle_paginas"],hide:["HIDE","hide"]},outputs:{change:"changeParametro",changeHide:"changeHide"},decls:12,vars:3,consts:[[1,"div-barra"],[1,"example-spacer"],["mat-icon-button","","aria-label","Example icon-button with share icon ","matTooltipPosition","above","matTooltip","Salvar Par\xe2metros","matTooltipPosition","above",3,"click"],["mat-icon-button","","aria-label","Example icon-button with share icon ","matTooltipPosition","above","matTooltip","Enviar Consulta Por E-Mail","matTooltipPosition","above",3,"click",4,"ngIf"],["mat-icon-button","","aria-label","Example icon-button with share icon ","matTooltipPosition","above","matTooltip","Baixar A Consulta","matTooltipPosition","above",3,"click",4,"ngIf"],["mat-icon-button","","aria-label","Example icon-button with share icon ","matTooltipPosition","above","matTooltip","Mostrar/Esconder","matTooltipPosition","above",3,"click"],["autocomplete","off",3,"formGroup",4,"ngIf"],["mat-icon-button","","aria-label","Example icon-button with share icon ","matTooltipPosition","above","matTooltip","Enviar Consulta Por E-Mail","matTooltipPosition","above",3,"click"],["mat-icon-button","","aria-label","Example icon-button with share icon ","matTooltipPosition","above","matTooltip","Baixar A Consulta","matTooltipPosition","above",3,"click"],["autocomplete","off",3,"formGroup"],[1,"col-med-2"],["field","","appearance","outline",1,"col-max"],["formControlName","orderby",3,"selectionChange"],[3,"value",4,"ngFor","ngForOf"],["appearance","outline",1,"col-max"],["matInput","","formControlName","codigo"],["matSuffix","","mat-icon-button","","aria-label","Clear",3,"click",4,"ngIf"],[1,"col-med-1"],["matInput","","formControlName","apelido",1,"uppercase"],["matInput","","formControlName","descricao",1,"uppercase"],[3,"value"],["matSuffix","","mat-icon-button","","aria-label","Clear",3,"click"]],template:function(t,o){1&t&&(a.TgZ(0,"div",0),a.TgZ(1,"span",1),a._uU(2,"Filtro Da Pesquisa"),a.qZA(),a.TgZ(3,"button",2),a.NdJ("click",function(){return o.onSaveConfig()}),a.TgZ(4,"mat-icon"),a._uU(5,"brightness_high"),a.qZA(),a.qZA(),a.YNc(6,k,3,0,"button",3),a.YNc(7,G,3,0,"button",4),a.TgZ(8,"button",5),a.NdJ("click",function(){return o.onHide()}),a.TgZ(9,"mat-icon"),a._uU(10,"remove_red_eye"),a.qZA(),a.qZA(),a.qZA(),a.YNc(11,K,24,5,"form",6)),2&t&&(a.xp6(6),a.Q6J("ngIf",o.email),a.xp6(1),a.Q6J("ngIf",o.download),a.xp6(4),a.Q6J("ngIf",!o.hide))},directives:[E.lW,O.gM,U.Hw,p.O5,c._Y,c.JL,c.sg,v.KE,v.hX,B.gD,c.JJ,c.u,p.sg,R.Nt,c.Fj,j.ey,v.R9],styles:[".ckeck[_ngcontent-%COMP%]{display:flex;align-content:center;align-items:center;height:60px}.check-margem[_ngcontent-%COMP%]{margin:0 10px}"]}),e})();var aa=r(2522),ta=r(3968),oa=r(7234);function ea(e,n){if(1&e){const t=a.EpF();a.TgZ(0,"div",4),a.TgZ(1,"mat-toolbar"),a.TgZ(2,"span",5),a._uU(3,"Descri\xe7\xe3o Padr\xe3o"),a.qZA(),a.TgZ(4,"app-navegator",6),a.NdJ("changePage",function(){return a.CHM(t),a.oxw().onChangePage()}),a.qZA(),a.TgZ(5,"button",7),a.NdJ("click",function(){return a.CHM(t),a.oxw().novaConsulta()}),a.TgZ(6,"mat-icon"),a._uU(7,"rotate_right"),a.qZA(),a.qZA(),a.TgZ(8,"button",8),a.NdJ("click",function(){return a.CHM(t),a.oxw().onHome()}),a.TgZ(9,"mat-icon"),a._uU(10,"home"),a.qZA(),a.qZA(),a.qZA(),a.qZA()}if(2&e){const t=a.oxw();a.xp6(4),a.Q6J("controle",t.controlePaginas)}}function ia(e,n){if(1&e&&(a.TgZ(0,"tr"),a.TgZ(1,"td"),a.TgZ(2,"div"),a.TgZ(3,"mat-label",12),a._uU(4),a.qZA(),a.qZA(),a.qZA(),a.TgZ(5,"td"),a.TgZ(6,"div"),a.TgZ(7,"mat-label",12),a._uU(8),a.qZA(),a.qZA(),a.qZA(),a.TgZ(9,"td"),a.TgZ(10,"div"),a.TgZ(11,"mat-label",12),a._uU(12),a.qZA(),a.qZA(),a.qZA(),a.TgZ(13,"td",13),a._UZ(14,"barra-acoes"),a.qZA(),a.qZA()),2&e){const t=n.$implicit;a.xp6(4),a.Oqu(t.id),a.xp6(4),a.Oqu(t.apelido),a.xp6(4),a.Oqu(t.descricao)}}function ra(e,n){if(1&e&&(a.TgZ(0,"table",9),a.TgZ(1,"tr",10),a.TgZ(2,"th"),a._uU(3,"C\xf3digo"),a.qZA(),a.TgZ(4,"th"),a._uU(5,"Apelido"),a.qZA(),a.TgZ(6,"th"),a._uU(7,"Descri\xe7\xe3o"),a.qZA(),a.TgZ(8,"th"),a._uU(9,"A\xc7\xd5ES"),a.qZA(),a.qZA(),a.YNc(10,ia,15,3,"tr",11),a.qZA()),2&e){const t=a.oxw();a.xp6(10),a.Q6J("ngForOf",t.apelidos)}}function na(e,n){if(1&e){const t=a.EpF();a.TgZ(0,"mat-toolbar"),a.TgZ(1,"span",5),a._uU(2,"Descri\xe7\xe3o Padr\xe3o"),a.qZA(),a.TgZ(3,"app-navegator",6),a.NdJ("changePage",function(){return a.CHM(t),a.oxw().onChangePage()}),a.qZA(),a.TgZ(4,"button",7),a.NdJ("click",function(){return a.CHM(t),a.oxw().novaConsulta()}),a.TgZ(5,"mat-icon"),a._uU(6,"rotate_right"),a.qZA(),a.qZA(),a.TgZ(7,"button",8),a.NdJ("click",function(){return a.CHM(t),a.oxw().onHome()}),a.TgZ(8,"mat-icon"),a._uU(9,"home"),a.qZA(),a.qZA(),a.qZA()}if(2&e){const t=a.oxw();a.xp6(3),a.Q6J("controle",t.controlePaginas)}}const sa=[{path:"",redirectTo:"cadastro_padrao",pathMatch:"full"},{path:"cadastro_padrao",component:(()=>{class e{constructor(t,o,i,s,l,_){this.globalService=t,this.cabService=o,this.localStorageService=i,this.router=s,this.appSnackBar=l,this.route=_,this.retorno=!1,this.parametro=new h.M,this.tamPagina=50,this.controlePaginas=new m.e(this.tamPagina,this.tamPagina),this.browse=!0,this.idAcao=M.I.Consulta,this.hide=!1,this.targetRowId=0,this.paramName="paramapelido",this.apelidos=[]}ngOnInit(){this.getApelidosContador()}ngOnDestroy(){var t,o;null===(t=this.inscricaoGetDados)||void 0===t||t.unsubscribe(),null===(o=this.inscricaoGetContador)||void 0===o||o.unsubscribe()}getApelidos(){let t=new T;t=A(t,this.parametro.getParametro()),t.contador="N",t.pagina=this.controlePaginas.getPaginalAtual(),this.globalService.setSpin(!0),this.inscricaoGetDados=this.cabService.getPadroes_CabParametro_01(t).subscribe(o=>{this.globalService.setSpin(!1),this.apelidos=o},o=>{this.globalService.setSpin(!1),this.apelidos=[],this.appSnackBar.openFailureSnackBar(`Pesquisa No Padr\xe3o De Cadastros ${(0,d.bZ)(o)}`,"OK")})}getApelidosContador(){let t=new T;t=A(t,this.parametro.getParametro()),t.contador="S",t.tamPagina=this.tamPagina,this.globalService.setSpin(!0),this.inscricaoGetContador=this.cabService.getPadroes_CabParametro_01(t).subscribe(o=>{this.globalService.setSpin(!1);var i=this.controlePaginas.getPaginalAtual();this.controlePaginas=new m.e(this.tamPagina,0==o.total?1:o.total),this.controlePaginas.setPaginaAtual(i),o.total>0?this.getApelidos():(this.apelidos=[],this.controlePaginas=new m.e(this.tamPagina,1)),this.getApelidos()},o=>{console.log(o),this.globalService.setSpin(!1),this.apelidos=[],this.controlePaginas=new m.e(this.tamPagina,1)})}onChangeParametros(t){console.log("change chamdo",t),this.parametro=t;let o=1;var i=this.localStorageService.getNumber("page");console.log("page:",i),null!=i&&(o=i),this.controlePaginas.setPaginaAtual(o),this.getApelidosContador()}onChangeHide(t){this.hide=t}novaConsulta(){this.localStorageService.removeItem("page"),this.controlePaginas=new m.e(this.tamPagina,1),this.getApelidosContador()}onChangePage(){this.localStorageService.removeItem("page"),this.getApelidosContador()}onHome(){this.router.navigate([""])}}return e.\u0275fac=function(t){return new(t||e)(a.Y36(S.U),a.Y36(I),a.Y36(x.n),a.Y36(u.F0),a.Y36(N.W),a.Y36(u.gz))},e.\u0275cmp=a.Xpm({type:e,selectors:[["app-crud-padrao-cadastro"]],decls:7,vars:7,consts:[["class","div-barra",4,"ngIf"],["PARAMNAME","paramapelido",3,"HIDE","EMAIL","DOWNLOAD","CONTROLE_PAGINAS","changeParametro","changeHide"],["class","Browse_Lanc",4,"ngIf"],[4,"ngIf"],[1,"div-barra"],[1,"example-spacer"],[3,"controle","changePage"],["mat-icon-button","","aria-label","Example icon-button with share icon","matTooltip","Atualizar","matTooltipPosition","above",1,"example-icon",3,"click"],["mat-icon-button","","aria-label","Example icon-button with share icon ","matTooltipPosition","above","matTooltip","Retorno","matTooltipPosition","above",3,"click"],[1,"Browse_Lanc"],[1,"coluna-cabec"],[4,"ngFor","ngForOf"],[1,"Browse_Lanc_td"],[1,"acoes"]],template:function(t,o){1&t&&(a.YNc(0,ea,11,1,"div",0),a.TgZ(1,"app-filtro-cadastro-padrao",1),a.NdJ("changeParametro",function(s){return o.onChangeParametros(s)})("changeHide",function(s){return o.onChangeHide(s)}),a.qZA(),a.TgZ(2,"div"),a.TgZ(3,"h2"),a._uU(4,"Nunhuma Informa\xe7\xe3o Para A Consulta"),a.qZA(),a.qZA(),a.YNc(5,ra,11,1,"table",2),a.YNc(6,na,10,1,"mat-toolbar",3)),2&t&&(a.Q6J("ngIf",o.browse),a.xp6(1),a.Q6J("HIDE",o.hide)("EMAIL",!0)("DOWNLOAD",!0)("CONTROLE_PAGINAS",o.controlePaginas),a.xp6(4),a.Q6J("ngIf",o.apelidos.length>0),a.xp6(1),a.Q6J("ngIf",o.apelidos.length>0))},directives:[p.O5,X,aa.Ye,ta.J,E.lW,O.gM,U.Hw,p.sg,v.hX,oa.C],styles:[".content[_ngcontent-%COMP%]{height:95%;overflow:auto}tr[_ngcontent-%COMP%]:nth-child(even){background-color:#f2f2aa}tr[_ngcontent-%COMP%]:hover{background-color:#caa99d}.highlight[_ngcontent-%COMP%]{background-color:#e58b8b}h2[_ngcontent-%COMP%]{color:red}"]}),e})()}];let la=(()=>{class e{}return e.\u0275fac=function(t){return new(t||e)},e.\u0275mod=a.oAB({type:e}),e.\u0275inj=a.cJS({imports:[[u.Bz.forChild(sa)],u.Bz]}),e})();var ca=r(4307),da=r(9243),ma=r(4466),pa=r(8981);let ua=(()=>{class e{}return e.\u0275fac=function(t){return new(t||e)},e.\u0275mod=a.oAB({type:e}),e.\u0275inj=a.cJS({imports:[[p.ez,la,ca.q,da.Cl,c.u5,c.UX,ma.m,pa.yI.forChild()]]}),e})()}}]);