"use strict";(self.webpackChunkinventario=self.webpackChunkinventario||[]).push([[567],{9567:(S,b,r)=>{r.r(b),r.d(b,{ImobilizadoModule:()=>To});var h=r(8583),u=r(4655),f=r(9243),_=r(2653),d=r(2979),Z=r(2174),n=r(9134),g=r(5062),l=r(3032),z=r(3430),m=r(6809),o=r(7716),p=r(3679),U=r(3317),q=r(5884),R=r(5626),y=r(7466),E=r(2704),J=r(789),G=r(2522),Q=r(3968),D=r(1095),B=r(1436),F=r(6627),I=r(8295),w=r(7441),V=r(2458),L=r(9983),j=r(7234),M=r(34);function k(a,s){if(1&a&&(o.TgZ(0,"mat-option",18),o._uU(1),o.qZA()),2&a){const i=s.$implicit;o.Q6J("value",i),o.xp6(1),o.hij(" ",i," ")}}function K(a,s){if(1&a&&(o.TgZ(0,"mat-option",18),o._uU(1),o.qZA()),2&a){const i=s.$implicit;o.Q6J("value",i),o.xp6(1),o.hij(" ",i," ")}}function H(a,s){if(1&a&&(o.TgZ(0,"mat-option",18),o._uU(1),o.qZA()),2&a){const i=s.$implicit;o.Q6J("value",i.codigo),o.xp6(1),o.hij(" ",i.descricao," ")}}function W(a,s){if(1&a){const i=o.EpF();o.TgZ(0,"mat-form-field",19),o.TgZ(1,"mat-label"),o._uU(2,"Escolha O Grupo"),o.qZA(),o.TgZ(3,"mat-select",20),o.NdJ("selectionChange",function(){return o.CHM(i),o.oxw().onChangeParametros()}),o.YNc(4,H,2,2,"mat-option",10),o.qZA(),o.qZA()}if(2&a){const i=o.oxw();o.xp6(4),o.Q6J("ngForOf",i.grupos)}}function X(a,s){if(1&a&&(o.TgZ(0,"mat-option",18),o._uU(1),o.qZA()),2&a){const i=s.$implicit;o.Q6J("value",i.codigo),o.xp6(1),o.hij(" ",i.descricao," ")}}function oo(a,s){if(1&a){const i=o.EpF();o.TgZ(0,"mat-form-field",19),o.TgZ(1,"mat-label"),o._uU(2,"Centro De Custo"),o.qZA(),o.TgZ(3,"mat-select",21),o.NdJ("selectionChange",function(){return o.CHM(i),o.oxw().onChangeParametros()}),o.YNc(4,X,2,2,"mat-option",10),o.qZA(),o.qZA()}if(2&a){const i=o.oxw();o.xp6(4),o.Q6J("ngForOf",i.ccs)}}function io(a,s){1&a&&(o.TgZ(0,"mat-form-field",22),o.TgZ(1,"mat-label"),o._uU(2,"Descri\xe7\xe3o"),o.qZA(),o._UZ(3,"input",23),o.qZA())}function to(a,s){if(1&a){const i=o.EpF();o.TgZ(0,"tr"),o.TgZ(1,"td"),o.TgZ(2,"div"),o.TgZ(3,"mat-label",24),o._uU(4),o.qZA(),o.qZA(),o.TgZ(5,"div"),o.TgZ(6,"mat-label",24),o._uU(7),o.ALo(8,"origem"),o.qZA(),o.qZA(),o.qZA(),o.TgZ(9,"td"),o.TgZ(10,"div"),o.TgZ(11,"mat-label",24),o._uU(12),o.qZA(),o.qZA(),o.TgZ(13,"div"),o.TgZ(14,"mat-label",24),o._uU(15),o.qZA(),o.qZA(),o.qZA(),o.TgZ(16,"td"),o.TgZ(17,"div"),o.TgZ(18,"mat-label",24),o._uU(19),o.qZA(),o.qZA(),o.qZA(),o.TgZ(20,"td",25),o.TgZ(21,"barra-acoes",26),o.NdJ("changeOpcao",function(e){const v=o.CHM(i).$implicit;return o.oxw().escolha(e,v)}),o.qZA(),o.qZA(),o.qZA()}if(2&a){const i=s.$implicit;o.xp6(4),o.Oqu(i.codigo),o.xp6(3),o.Oqu(o.lcZ(8,8,i.origem)),o.xp6(5),o.Oqu(i.grupo_descricao),o.xp6(3),o.Oqu(i.cc_descricao),o.xp6(4),o.Oqu(i.descricao),o.xp6(2),o.Q6J("BARRA_ATIVIDADES",!1)("EXCLUIR","M"==i.origem)("ALTERAR","M"==i.origem)}}let $=(()=>{class a{constructor(i,t,e,c,v,A,x,T,C,N){this.formBuilder=i,this.globalService=t,this.imobilizadoService=e,this.parametrosService=c,this.grupoService=v,this.centrocustoService=A,this.router=x,this.appSnackBar=T,this.route=C,this.ngZone=N,this.imobilizados=[],this.grupos=[],this.ccs=[],this.erro="",this.opcoesOrdenacao=[],this.opcoesCampo=[],this.tamPagina=50,this.controlePaginas=new z.e(this.tamPagina,0),this.retorno=!1,this.parametro=new _.M,this.parametros=i.group({ordenacao:[null],campo:[null],filtro:[null],grupo:[],cc:[]}),this.inscricaoRota=C.params.subscribe(zo=>{void 0===zo.retorno?this.retorno=!1:(this.retorno=!0,this.globalService.estadoFind("imobilizado"))}),this.loadParametros()}ngOnInit(){}ngOnDestroy(){var i,t,e,c,v,A;null===(i=this.inscricaoGetAll)||void 0===i||i.unsubscribe(),null===(t=this.inscricaoGetFiltro)||void 0===t||t.unsubscribe(),null===(e=this.inscricaoGetGrupo)||void 0===e||e.unsubscribe(),null===(c=this.inscricaoGetCc)||void 0===c||c.unsubscribe(),null===(v=this.inscricaoRota)||void 0===v||v.unsubscribe(),null===(A=this.inscricaoParametro)||void 0===A||A.unsubscribe()}escolha(i,t){if(void 0!==t){let e=this.parametro.getParametro();Object(e).new=!1,Object(e).id_retorno=t.codigo,Object(e).page=this.controlePaginas.getPaginalAtual(),Object(e).op_ordenacao=this.opcoesOrdenacao.findIndex(c=>this.parametros.value.ordenacao==c),Object(e).op_pesquisar=this.opcoesCampo.findIndex(c=>this.parametros.value.campo==c),Object(e).descricao=this.parametros.value.filtro,this.parametro.parametro=JSON.stringify(e),this.globalService.estadoSave(this.parametro),this.router.navigate(["/imobilizados/imobilizado",t.id_empresa,t.id_filial,t.codigo,i])}else{let e=this.parametro.getParametro();Object(e).new=!1,Object(e).id_retorno=0,Object(e).page=this.controlePaginas.getPaginalAtual(),Object(e).op_ordenacao=this.opcoesOrdenacao.findIndex(c=>this.parametros.value.ordenacao==c),Object(e).op_pesquisar=this.opcoesCampo.findIndex(c=>this.parametros.value.campo==c),Object(e).descricao=this.parametros.value.filtro,this.parametro.parametro=JSON.stringify(e),this.globalService.estadoSave(this.parametro),this.router.navigate(["/imobilizados/imobilizado",this.globalService.getIdEmpresa(),this.globalService.getLocal().id,0,i])}}getAcoes(){return l.I}setValues(){this.parametros.setValue({ordenacao:this.opcoesOrdenacao[(0,m.P0)(this.parametro.getParametro(),"op_ordenacao")],campo:this.opcoesCampo[(0,m.P0)(this.parametro.getParametro(),"op_pesquisar")],filtro:(0,m.SL)(this.parametro.getParametro(),"descricao"),grupo:0,cc:0})}getGrupos(){let i=new Z.t;i.id_empresa=this.globalService.getIdEmpresa(),i.id_filial=this.globalService.getLocal().id,i.orderby="Grupo",this.globalService.setSpin(!0),this.inscricaoGetGrupo=this.grupoService.getGruposParametro_01(i).subscribe(t=>{this.globalService.setSpin(!1),this.grupos=t,this.parametros.patchValue({grupo:this.grupos[0].codigo}),this.getCentroCustos()},t=>{this.globalService.setSpin(!1),this.grupos=[],this.appSnackBar.openFailureSnackBar(`Pesquisa Nos Grupos ${(0,m.bZ)(t)}`,"OK")})}getCentroCustos(){let i=new d.D;i.id_empresa=this.globalService.getIdEmpresa(),i.id_filial=this.globalService.getLocal().id,i.orderby="Descri\xe7\xe3o",this.globalService.setSpin(!0),this.inscricaoGetCc=this.centrocustoService.getCentroscustosParametro_01(i).subscribe(t=>{this.globalService.setSpin(!1),this.ccs=t,this.parametros.patchValue({cc:this.ccs[0].codigo}),this.getImobilizadosContador()},t=>{this.globalService.setSpin(!1),this.ccs=[],this.appSnackBar.openFailureSnackBar(`Pesquisa Nos Grupos ${(0,m.bZ)(t)}`,"OK")})}isGrupo(){return"Grupo"==this.parametros.value.campo}isCc(){return"Centro Custo"==this.parametros.value.campo}isNoCombo(){return"Centro Custo"!==this.parametros.value.campo&&"Grupo"!==this.parametros.value.campo}getImobilizados(){let i=new n.C;if(i.id_empresa=this.globalService.getIdEmpresa(),i.id_filial=this.globalService.getLocal().id,"C\xf3digo"==this.parametros.value.campo){let t=parseInt(this.parametros.value.filtro,10);i.codigo=isNaN(t)?0:t}"Descri\xe7\xe3o"==this.parametros.value.campo&&(i.descricao=this.parametros.value.filtro.toUpperCase()),"Grupo"==this.parametros.value.campo&&(i.grupo_cod=this.parametros.value.grupo),"Centro Custo"==this.parametros.value.campo&&(i.cc_cod=this.parametros.value.cc),i.orderby=this.parametros.value.ordenacao,i.pagina=this.controlePaginas.getPaginalAtual(),i.contador="N",i.tamPagina=this.tamPagina,this.globalService.setSpin(!0),this.inscricaoGetFiltro=this.imobilizadoService.getImobilizadosParametro_01(i).subscribe(t=>{this.globalService.setSpin(!1),this.imobilizados=[],this.imobilizados=t;const e=this.imobilizados.findIndex(v=>v.codigo==(0,m.P0)(this.parametro.getParametro(),"id_retorno"));setTimeout(()=>this.viewPort.scrollToIndex(e),10),this.retorno=!1;let c=this.parametro.getParametro();Object(c).id_retorno=0,Object(c).new=!1,this.parametro.parametro=JSON.stringify(c)},t=>{let e=this.parametro.getParametro();Object(e).id_retorno=0,Object(e).new=!1,this.retorno=!1,this.globalService.setSpin(!1),this.imobilizados=[],this.appSnackBar.openFailureSnackBar(`Pesquisa Nos Locais ${(0,m.bZ)(t)}`,"OK")})}getImobilizadosContador(){let i=new n.C;if(i.id_empresa=this.globalService.getIdEmpresa(),i.id_filial=this.globalService.getLocal().id,i.orderby="C\xf3digo","C\xf3digo"==this.parametros.value.campo){let t=parseInt(this.parametros.value.filtro,10);i.codigo=isNaN(t)?0:t}"Descri\xe7\xe3o"==this.parametros.value.campo&&(i.descricao=this.parametros.value.filtro.toUpperCase()),"Grupo"==this.parametros.value.campo&&(i.grupo_cod=this.parametros.value.grupo),"Centro Custo"==this.parametros.value.campo&&(i.cc_cod=this.parametros.value.cc),i.orderby=this.parametros.value.ordenacao,i.contador="S",i.tamPagina=this.tamPagina,this.globalService.setSpin(!0),this.inscricaoGetFiltro=this.imobilizadoService.getImobilizadosParametro_01(i).subscribe(t=>{if(this.globalService.setSpin(!1),this.controlePaginas=new z.e(this.tamPagina,0==t.total?1:t.total),this.retorno)if((0,m.xc)(this.parametro.getParametro(),"new"))this.controlePaginas.goLast();else{let e=this.parametro.getParametro();this.controlePaginas.setPaginaAtual(Object(e).page)}this.getImobilizados()},t=>{this.globalService.setSpin(!1),this.controlePaginas=new z.e(this.tamPagina,0),this.appSnackBar.openFailureSnackBar(`Pesquisa Nos Imobilizados ${(0,m.bZ)(t)}`,"OK")})}getTexto(){return m.fd}onChangePage(){this.getImobilizados()}onChangeParametros(){this.getImobilizadosContador()}onHome(){this.router.navigate([""])}onSaveConfig(){this.updateParametros()}loadParametros(){if(this.parametro=new _.M,this.parametro.id_empresa=this.globalService.getIdEmpresa(),this.parametro.modulo="imobilizado",this.parametro.assinatura="V1.00 15/12/23",this.parametro.id_usuario=this.globalService.usuario.id,this.parametro.parametro='\n       {\n         "op_ordenacao": 0,\n         "ordenacao": ["C\xf3digo", "Descri\xe7\xe3o","Grupo","Centro Custo"],\n         "op_pesquisar": 1,\n         "pesquisar": ["C\xf3digo", "Descri\xe7\xe3o","Grupo","Centro Custo"],\n         "descricao": "",\n         "page": 1,\n         "new": false,\n         "id_retorno":0\n       }',this.opcoesOrdenacao=(0,m.FO)(this.parametro.getParametro(),"ordenacao"),this.opcoesCampo=(0,m.FO)(this.parametro.getParametro(),"pesquisar"),this.retorno&&null!==this.globalService.estadoFind("imobilizado")){const i=this.globalService.estadoFind("imobilizado");if(null!=i){if((0,m.xc)(i.getParametro(),"new")){let t=this.parametro.getParametro();Object(t).id_retorno=(0,m.P0)(i.getParametro(),"id_retorno"),this.parametro.parametro=JSON.stringify(t),this.setPosicaoInclusao()}else this.controlePaginas.setPaginaAtual((0,m.P0)(i.getParametro(),"page")),this.parametro.setParametro(i.getParametro());this.globalService.estadoDelete(i),this.setValues(),this.getGrupos()}}else this.getParametro()}setPosicaoInclusao(){const i=this.parametro.getParametro();Object(i).op_ordenacao=0,Object(i).op_pesquisar=0,Object(i).descricao="",Object(i).new=!0,this.parametro.setParametro(i)}getParametro(){this.globalService.setSpin(!0);let i=new g.E;i.id_empresa=this.parametro.id_empresa,i.modulo=this.parametro.modulo,i.assinatura=this.parametro.assinatura,i.id_usuario=this.parametro.id_usuario,i.orderby="Usu\xe1rio",this.inscricaoParametro=this.parametrosService.getParametrosParametro01(i).subscribe(t=>{this.globalService.setSpin(!1),this.parametro=new _.M,this.parametro.id_empresa=t[0].id_empresa,this.parametro.modulo=t[0].modulo,this.parametro.id_usuario=t[0].id_usuario,this.parametro.assinatura=t[0].assinatura,this.parametro.parametro=t[0].parametro,this.parametro.user_insert=t[0].user_insert,this.parametro.user_update=t[0].user_update,this.opcoesOrdenacao=(0,m.FO)(this.parametro.getParametro(),"ordenacao"),this.opcoesCampo=(0,m.FO)(this.parametro.getParametro(),"pesquisar"),this.setValues(),this.getGrupos()},t=>{this.globalService.setSpin(!1),this.setValues(),this.getGrupos()})}updateParametros(){this.globalService.setSpin(!0),this.parametro.user_insert=this.globalService.usuario.id,this.parametro.user_update=this.globalService.usuario.id;let i=this.parametro.getParametro();Object(i).op_ordenacao=this.opcoesOrdenacao.findIndex(t=>this.parametros.value.ordenacao==t),Object(i).op_pesquisar=this.opcoesCampo.findIndex(t=>this.parametros.value.campo==t),Object(i).descricao=this.parametros.value.filtro,Object(i).page=0,Object(i).new=!1,this.parametro.parametro=JSON.stringify(i),this.inscricaoParametro=this.parametrosService.ParametroAtualiza(this.parametro).subscribe(t=>{this.globalService.setSpin(!1),this.appSnackBar.openSuccessSnackBar("Par\xe2metros Atualizados","OK")},t=>{this.globalService.setSpin(!1),this.appSnackBar.openFailureSnackBar(`Grava\xe7\xe3o Dos Parametros ${(0,m.bZ)(t)}`,"OK")})}}return a.\u0275fac=function(i){return new(i||a)(o.Y36(p.qu),o.Y36(U.U),o.Y36(q.i),o.Y36(R.u),o.Y36(y.Z),o.Y36(E.T),o.Y36(u.F0),o.Y36(J.W),o.Y36(u.gz),o.Y36(o.R0b))},a.\u0275cmp=o.Xpm({type:a,selectors:[["app-crud-imobilizado"]],viewQuery:function(i,t){if(1&i&&o.Gf(f.N7,5),2&i){let e;o.iGM(e=o.CRH())&&(t.viewPort=e.first)}},decls:44,vars:10,consts:[[1,"div-barra"],[1,"example-spacer"],[3,"controle","changePage"],["mat-icon-button","","aria-label","Example icon-button with share icon","matTooltip","Atualizar","matTooltipPosition","above",1,"example-icon",3,"click"],["mat-icon-button","","aria-label","Example icon-button with share icon ","matTooltipPosition","above","matTooltip","Salvar Par\xe2metros","matTooltipPosition","above",3,"click"],["mat-icon-button","","aria-label","Example icon-button with share icon ","matTooltipPosition","above","matTooltip","Retorno","matTooltipPosition","above",3,"click"],["mat-icon-button","","aria-label","Example icon-button with share icon ","matTooltipPosition","above",3,"matTooltip","click"],["autocomplete","off",1,"col-med-4",3,"formGroup"],["field","","appearance","outline",1,"col-max"],["formControlName","ordenacao",3,"selectionChange"],[3,"value",4,"ngFor","ngForOf"],["formControlName","campo",3,"selectionChange"],["field","","appearance","outline","class","col-max column-span-2",4,"ngIf"],["appearance","outline","class","col-max column-span-2",4,"ngIf"],[1,"content",3,"itemSize"],[1,"Browse_Lanc"],[1,"coluna-cabec"],[4,"cdkVirtualFor","cdkVirtualForOf"],[3,"value"],["field","","appearance","outline",1,"col-max","column-span-2"],["formControlName","grupo",3,"selectionChange"],["formControlName","cc",3,"selectionChange"],["appearance","outline",1,"col-max","column-span-2"],["matInput","","formControlName","filtro","oninput","this.value = this.value.toUpperCase()"],[1,"Browse_Lanc_td"],[1,"acoes"],[3,"BARRA_ATIVIDADES","EXCLUIR","ALTERAR","changeOpcao"]],template:function(i,t){1&i&&(o.TgZ(0,"div",0),o.TgZ(1,"mat-toolbar"),o.TgZ(2,"span",1),o._uU(3,"Imobilizados:"),o.qZA(),o.TgZ(4,"app-navegator",2),o.NdJ("changePage",function(){return t.onChangePage()}),o.qZA(),o.TgZ(5,"button",3),o.NdJ("click",function(){return t.getImobilizadosContador()}),o.TgZ(6,"mat-icon"),o._uU(7,"rotate_right"),o.qZA(),o.qZA(),o.TgZ(8,"button",4),o.NdJ("click",function(){return t.onSaveConfig()}),o.TgZ(9,"mat-icon"),o._uU(10,"brightness_high"),o.qZA(),o.qZA(),o.TgZ(11,"button",5),o.NdJ("click",function(){return t.onHome()}),o.TgZ(12,"mat-icon"),o._uU(13,"home"),o.qZA(),o.qZA(),o.TgZ(14,"button",6),o.NdJ("click",function(){return t.escolha(t.getAcoes().Inclusao)}),o.TgZ(15,"mat-icon"),o._uU(16,"add_circle_outline"),o.qZA(),o.qZA(),o.qZA(),o.qZA(),o.TgZ(17,"div"),o.TgZ(18,"form",7),o.TgZ(19,"mat-form-field",8),o.TgZ(20,"mat-label"),o._uU(21,"Ordena\xe7\xe3o"),o.qZA(),o.TgZ(22,"mat-select",9),o.NdJ("selectionChange",function(){return t.onChangeParametros()}),o.YNc(23,k,2,2,"mat-option",10),o.qZA(),o.qZA(),o.TgZ(24,"mat-form-field",8),o.TgZ(25,"mat-label"),o._uU(26,"Pesquisar Por"),o.qZA(),o.TgZ(27,"mat-select",11),o.NdJ("selectionChange",function(){return t.onChangeParametros()}),o.YNc(28,K,2,2,"mat-option",10),o.qZA(),o.qZA(),o.YNc(29,W,5,1,"mat-form-field",12),o.YNc(30,oo,5,1,"mat-form-field",12),o.YNc(31,io,4,0,"mat-form-field",13),o.qZA(),o.qZA(),o.TgZ(32,"cdk-virtual-scroll-viewport",14),o.TgZ(33,"table",15),o.TgZ(34,"tr",16),o.TgZ(35,"th"),o._uU(36,"Cod."),o.qZA(),o.TgZ(37,"th"),o._uU(38,"Grupo/Centro Custo"),o.qZA(),o.TgZ(39,"th"),o._uU(40,"Descri\xe7\xe3o"),o.qZA(),o.TgZ(41,"th"),o._uU(42,"A\xc7\xd5ES"),o.qZA(),o.qZA(),o.YNc(43,to,22,10,"tr",17),o.qZA(),o.qZA()),2&i&&(o.xp6(4),o.Q6J("controle",t.controlePaginas),o.xp6(10),o.Q6J("matTooltip",t.getTexto().incluir),o.xp6(4),o.Q6J("formGroup",t.parametros),o.xp6(5),o.Q6J("ngForOf",t.opcoesOrdenacao),o.xp6(5),o.Q6J("ngForOf",t.opcoesCampo),o.xp6(1),o.Q6J("ngIf",t.isGrupo()),o.xp6(1),o.Q6J("ngIf",t.isCc()),o.xp6(1),o.Q6J("ngIf",t.isNoCombo()),o.xp6(1),o.Q6J("itemSize",50),o.xp6(11),o.Q6J("cdkVirtualForOf",t.imobilizados))},directives:[G.Ye,Q.J,D.lW,B.gM,F.Hw,p._Y,p.JL,p.sg,I.KE,I.hX,w.gD,p.JJ,p.u,h.sg,h.O5,f.N7,f.xd,f.x0,V.ey,L.Nt,p.Fj,j.C],pipes:[M.A],styles:[".content[_ngcontent-%COMP%]{height:60%;overflow:auto}tr[_ngcontent-%COMP%]:nth-child(even){background-color:#f2f2aa}tr[_ngcontent-%COMP%]:hover{background-color:#caa99d}"]}),a})();var O=r(8239),Y=r(9267),P=r(7260),ao=r(5906);function eo(a,s){if(1&a){const i=o.EpF();o.TgZ(0,"button",16),o.NdJ("click",function(){return o.CHM(i),o.oxw().onSubmit()}),o.TgZ(1,"mat-icon"),o._uU(2,"check"),o.qZA(),o._uU(3),o.qZA()}if(2&a){const i=o.oxw();o.xp6(3),o.hij(" ",i.acao," ")}}function ro(a,s){if(1&a&&(o.TgZ(0,"mat-error"),o._uU(1),o.qZA()),2&a){const i=o.oxw();o.xp6(1),o.Oqu(i.getMensafield("descricao"))}}function so(a,s){if(1&a&&(o.TgZ(0,"mat-option",20),o._uU(1),o.qZA()),2&a){const i=s.$implicit;o.Q6J("value",i.codigo),o.xp6(1),o.hij(" ",i.descricao," ")}}function no(a,s){if(1&a&&(o.TgZ(0,"mat-error"),o._uU(1),o.qZA()),2&a){const i=o.oxw(2);o.xp6(1),o.Oqu(i.getMensafield("grupo"))}}function lo(a,s){if(1&a&&(o.TgZ(0,"mat-form-field",17),o.TgZ(1,"mat-label"),o._uU(2,"Grupo"),o.qZA(),o.TgZ(3,"mat-select",18),o.YNc(4,so,2,2,"mat-option",19),o.qZA(),o.YNc(5,no,2,1,"mat-error",11),o.qZA()),2&a){const i=o.oxw();o.xp6(4),o.Q6J("ngForOf",i.grupos),o.xp6(1),o.Q6J("ngIf",i.NoValidtouchedOrDirty("grupo"))}}function co(a,s){if(1&a&&(o.TgZ(0,"mat-form-field",17),o.TgZ(1,"mat-label"),o._uU(2,"Grupo"),o.qZA(),o._UZ(3,"input",21),o.qZA()),2&a){const i=o.oxw();o.xp6(3),o.Q6J("readonly",i.readOnly)}}function mo(a,s){if(1&a&&(o.TgZ(0,"mat-option",20),o._uU(1),o.qZA()),2&a){const i=s.$implicit;o.Q6J("value",i.codigo),o.xp6(1),o.hij(" ",i.descricao," ")}}function uo(a,s){if(1&a&&(o.TgZ(0,"mat-error"),o._uU(1),o.qZA()),2&a){const i=o.oxw(2);o.xp6(1),o.Oqu(i.getMensafield("cc"))}}function po(a,s){if(1&a&&(o.TgZ(0,"mat-form-field",17),o.TgZ(1,"mat-label"),o._uU(2,"Centro De Custo"),o.qZA(),o.TgZ(3,"mat-select",22),o.YNc(4,mo,2,2,"mat-option",19),o.qZA(),o.YNc(5,uo,2,1,"mat-error",11),o.qZA()),2&a){const i=o.oxw();o.xp6(4),o.Q6J("ngForOf",i.ccs),o.xp6(1),o.Q6J("ngIf",i.NoValidtouchedOrDirty("cc"))}}function go(a,s){if(1&a&&(o.TgZ(0,"mat-form-field",17),o.TgZ(1,"mat-label"),o._uU(2,"Centro De Custo"),o.qZA(),o._UZ(3,"input",23),o.qZA()),2&a){const i=o.oxw();o.xp6(3),o.Q6J("readonly",i.readOnly)}}function ho(a,s){if(1&a&&(o.TgZ(0,"mat-option",20),o._uU(1),o.qZA()),2&a){const i=s.$implicit;o.Q6J("value",i.idx),o.xp6(1),o.hij(" ",i.descricao," ")}}function fo(a,s){if(1&a&&(o.TgZ(0,"mat-error"),o._uU(1),o.qZA()),2&a){const i=o.oxw(2);o.xp6(1),o.Oqu(i.getMensafield("condicao"))}}function bo(a,s){if(1&a&&(o.TgZ(0,"mat-form-field",24),o.TgZ(1,"mat-label"),o._uU(2,"Condicao"),o.qZA(),o.TgZ(3,"mat-select",25),o.YNc(4,ho,2,2,"mat-option",19),o.qZA(),o.YNc(5,fo,2,1,"mat-error",11),o.qZA()),2&a){const i=o.oxw();o.xp6(4),o.Q6J("ngForOf",i.lsCondicoes),o.xp6(1),o.Q6J("ngIf",i.NoValidtouchedOrDirty("condicao"))}}function _o(a,s){if(1&a&&(o.TgZ(0,"mat-form-field",24),o.TgZ(1,"mat-label"),o._uU(2,"Condicao"),o.qZA(),o._UZ(3,"input",26),o.qZA()),2&a){const i=o.oxw();o.xp6(3),o.Q6J("readonly",i.readOnly)}}function vo(a,s){if(1&a&&(o.TgZ(0,"mat-error"),o._uU(1),o.qZA()),2&a){const i=o.oxw();o.xp6(1),o.Oqu(i.getMensafield("apelido"))}}const Co=[{path:"",redirectTo:"imobilizados",pathMatch:"full"},{path:"imobilizados",component:$},{path:"imobilizados/:retorno",component:$},{path:"imobilizado/:id_empresa/:id_local/:codigo/:acao",component:(()=>{class a{constructor(i,t,e,c,v,A,x,T){this.formBuilder=i,this.imobilizadoService=t,this.grupoService=e,this.ccService=c,this.route=v,this.router=A,this.appSnackBar=x,this.globalService=T,this.imobilizado=new P.G,this.ccs=[],this.grupos=[],this.acao="Sem Defini\xe7\xe3o",this.idAcao=l.I.Inclusao,this.readOnly=!0,this.labelCadastro="",this.lsCondicoes=[],this.formulario=i.group({codigo:[{value:""},[p.kI.required,p.kI.min(1)]],descricao:[{value:""},[(0,Y.S)(1,80,!0)]],grupo:[{value:""}],grupo_:[{value:""}],cc:[{value:""}],cc_:[{value:""}],condicao:[{value:""}],condicao_:[{value:""}],apelido:[{value:""},[(0,Y.S)(0,30,!1)]]}),this.imobilizado=new P.G,this.inscricaoRota=v.params.subscribe(C=>{this.imobilizado.id_empresa=C.id_empresa,this.imobilizado.id_filial=C.id_local,this.imobilizado.codigo=C.codigo,this.idAcao=C.acao,this.setAcao(C.acao)}),T.getCondicoes().forEach(C=>{if(C.idx>0){let N=new ao.H(C.idx,C.descricao);this.lsCondicoes.push(N)}})}ngOnInit(){this.idAcao==l.I.Inclusao&&(this.imobilizado=new P.G),this.setValue(),this.getGrupos()}ngOnDestroy(){var i,t,e,c;null===(i=this.inscricaoRota)||void 0===i||i.unsubscribe(),null===(t=this.inscricaoAcao)||void 0===t||t.unsubscribe(),null===(e=this.inscricaoGrupo)||void 0===e||e.unsubscribe(),null===(c=this.inscricaoCC)||void 0===c||c.unsubscribe()}onSubmit(){this.formulario.valid?this.executaAcao():(this.formulario.markAllAsTouched(),this.appSnackBar.openSuccessSnackBar("Formul\xe1rio Com Campos Inv\xe1lidos.","OK"))}onRetorno(){const i=this.globalService.estadoFind("imobilizado");if(null!=i){let t=i.getParametro();Object(t).new=this.idAcao==l.I.Inclusao,Object(t).id_retorno=this.imobilizado.codigo,i.parametro=JSON.stringify(t),this.globalService.estadoSave(i)}this.router.navigate(["/imobilizados/imobilizados","SIM"])}onCancel(){const i=this.globalService.estadoFind("imobilizado");if(null!=i){let t=i.getParametro();Object(t).new=!1,Object(t).id_retorno=this.idAcao==l.I.Consulta?this.imobilizado.codigo:0,i.parametro=JSON.stringify(t),this.globalService.estadoSave(i)}this.router.navigate(["/imobilizados/imobilizados","SIM"])}getImobilizado(){this.globalService.setSpin(!0),this.inscricaoAcao=this.imobilizadoService.getImobilizado(this.imobilizado.id_empresa,this.imobilizado.id_filial,this.imobilizado.codigo).subscribe(i=>{this.globalService.setSpin(!1),this.imobilizado=i,console.log("IMOBILIZADO",this.imobilizado),this.setValue()},i=>{this.globalService.setSpin(!1),this.appSnackBar.openFailureSnackBar(`Pesquisa Nos Imobilizados ${i.error.tabela} - ${i.error.erro} - ${i.error.message}`,"OK")})}getGrupos(){let i=new Z.t;i.id_empresa=this.globalService.getIdEmpresa(),i.id_filial=this.globalService.getLocal().id,i.orderby="Descri\xe7\xe3o",i.pagina=0,i.contador="N",i.tamPagina=0,this.globalService.setSpin(!0),this.inscricaoGrupo=this.grupoService.getGruposParametro_01(i).subscribe(t=>{this.globalService.setSpin(!1),this.grupos=[],this.grupos=t,this.getCentrosCustos()},t=>{this.globalService.setSpin(!1),console.log(t),this.grupos=[],this.appSnackBar.openFailureSnackBar(`Pesquisa Nos Grupos ${(0,m.bZ)(t)}`,"OK")})}getCentrosCustos(){let i=new d.D;i.id_empresa=this.globalService.getIdEmpresa(),i.id_filial=this.globalService.getLocal().id,i.orderby="Descri\xe7\xe3o",i.pagina=0,i.contador="N",i.tamPagina=0,this.globalService.setSpin(!0),this.inscricaoCC=this.ccService.getCentroscustosParametro_01(i).subscribe(t=>{this.globalService.setSpin(!1),this.ccs=[],this.ccs=t,this.idAcao!==l.I.Inclusao&&(this.idAcao==l.I.Inclusao?(this.imobilizado.id_empresa=this.globalService.getIdEmpresa(),this.imobilizado.id_filial=this.globalService.getLocal().id,this.setValue()):this.getImobilizado())},t=>{this.globalService.setSpin(!1),console.log(t),this.ccs=[],this.appSnackBar.openFailureSnackBar(`Pesquisa Nos Centros De Custos => ${(0,m.bZ)(t)}`,"OK")})}setValue(){let i=this.lsCondicoes.findIndex(t=>t.idx==this.imobilizado.condicao);-1==i&&(i=this.lsCondicoes.length-1),this.formulario.setValue({codigo:this.imobilizado.codigo,descricao:this.imobilizado.descricao,grupo:this.imobilizado.cod_grupo,grupo_:this.idAcao==l.I.Consulta||this.idAcao==l.I.Exclusao?this.imobilizado.grupo_descricao:"",cc:this.imobilizado.cod_cc,cc_:this.idAcao==l.I.Consulta||this.idAcao==l.I.Exclusao?this.imobilizado.cc_descricao:"",condicao:this.imobilizado.condicao,condicao_:this.idAcao==l.I.Consulta||this.idAcao==l.I.Exclusao?this.lsCondicoes[i].descricao:"",apelido:this.imobilizado.apelido})}getLabelCancel(){return this.idAcao==l.I.Consulta?"Voltar":"Cancelar"}setAcao(i){switch(+i){case l.I.Inclusao:this.acao="Gravar",this.labelCadastro="Imobilizados - Inclus\xe3o.",this.readOnly=!1;break;case l.I.Edicao:this.acao="Gravar",this.labelCadastro="Imobilizados - Altera\xe7\xe3o.",this.readOnly=!1;break;case l.I.Consulta:this.acao="Voltar",this.labelCadastro="Imobilizados - Consulta.",this.readOnly=!0;break;case l.I.Exclusao:this.acao="Excluir",this.labelCadastro="Imobilizados - Exclus\xe3o.",this.readOnly=!0}}executaAcao(){var i=this;switch(this.imobilizado.codigo=this.formulario.value.codigo,this.imobilizado.descricao=this.formulario.value.descricao,this.imobilizado.cod_grupo=this.formulario.value.grupo,this.imobilizado.cod_cc=this.formulario.value.cc,this.imobilizado.condicao=this.formulario.value.condicao,this.imobilizado.apelido=this.formulario.value.apelido,+this.idAcao){case l.I.Inclusao:this.imobilizado.origem="M",this.imobilizado.user_insert=this.globalService.getUsuario().id,this.globalService.setSpin(!0),this.inscricaoAcao=this.imobilizadoService.imobilizadoInsertInv(this.imobilizado).subscribe(function(){var t=(0,O.Z)(function*(e){i.imobilizado.codigo=e.codigo,i.globalService.setSpin(!1),i.onRetorno()});return function(e){return t.apply(this,arguments)}}(),t=>{this.globalService.setSpin(!1),this.appSnackBar.openFailureSnackBar(`Erro Na Inclus\xe3o ${(0,m.bZ)(t)}`,"OK")});break;case l.I.Edicao:this.globalService.setSpin(!0),this.imobilizado.user_update=this.globalService.getUsuario().id,this.inscricaoAcao=this.imobilizadoService.imobilizadoUpdate(this.imobilizado).subscribe(function(){var t=(0,O.Z)(function*(e){i.globalService.setSpin(!1),i.onRetorno()});return function(e){return t.apply(this,arguments)}}(),t=>{this.globalService.setSpin(!1),this.appSnackBar.openFailureSnackBar(`Erro Na Altera\xe7\xe3o ${(0,m.bZ)(t)}`,"OK")});break;case l.I.Exclusao:this.globalService.setSpin(!0),this.inscricaoAcao=this.imobilizadoService.imobilizadoDelete(this.imobilizado.id_empresa,this.imobilizado.id_filial,this.imobilizado.codigo).subscribe(function(){var t=(0,O.Z)(function*(e){i.globalService.setSpin(!1),i.onRetorno()});return function(e){return t.apply(this,arguments)}}(),t=>{this.globalService.setSpin(!1),console.log(t),this.appSnackBar.openFailureSnackBar(`Erro Na Exclus\xe3o ${(0,m.bZ)(t)}`,"OK")})}}getAcoes(){return l.I}NoValidtouchedOrDirty(i){var t,e,c;return!((null===(t=this.formulario.get(i))||void 0===t?void 0:t.valid)||!(null===(e=this.formulario.get(i))||void 0===e?void 0:e.touched)&&!(null===(c=this.formulario.get(i))||void 0===c?void 0:c.dirty))}getMensafield(i){var t,e;return null===(e=null===(t=this.formulario.get(i))||void 0===t?void 0:t.errors)||void 0===e?void 0:e.message}}return a.\u0275fac=function(i){return new(i||a)(o.Y36(p.qu),o.Y36(q.i),o.Y36(y.Z),o.Y36(E.T),o.Y36(u.gz),o.Y36(u.F0),o.Y36(J.W),o.Y36(U.U))},a.\u0275cmp=o.Xpm({type:a,selectors:[["app-imobilizado-view"]],decls:35,vars:15,consts:[[1,"div-barra"],[1,"example-spacer"],[1,"button-container-right"],["mat-raised-button","","color","primary",3,"click",4,"ngIf"],["mat-raised-button","","color","accent",3,"click"],["autocomplete","off",3,"formGroup"],[1,"col-med-3"],["appearance","outline",1,"col-max"],["matInput","","formControlName","codigo",3,"readonly"],["appearance","outline",1,"col-max","column-span-2"],["matInput","","formControlName","descricao","oninput","this.value = this.value.toUpperCase()",3,"readonly"],[4,"ngIf"],[1,"col-med-2"],["field","","appearance","outline","class","col-max column-span-2",4,"ngIf"],["field","","appearance","outline","class","col-max",4,"ngIf"],["matInput","","formControlName","apelido","oninput","this.value = this.value.toUpperCase()",3,"readonly"],["mat-raised-button","","color","primary",3,"click"],["field","","appearance","outline",1,"col-max","column-span-2"],["formControlName","grupo"],[3,"value",4,"ngFor","ngForOf"],[3,"value"],["matInput","","formControlName","grupo_",3,"readonly"],["formControlName","cc"],["matInput","","formControlName","cc_",3,"readonly"],["field","","appearance","outline",1,"col-max"],["formControlName","condicao"],["matInput","","formControlName","condicao_",3,"readonly"]],template:function(i,t){1&i&&(o.TgZ(0,"div",0),o.TgZ(1,"mat-toolbar"),o.TgZ(2,"span",1),o.TgZ(3,"mat-label"),o._uU(4),o.qZA(),o.qZA(),o.TgZ(5,"div",2),o.YNc(6,eo,4,1,"button",3),o.TgZ(7,"button",4),o.NdJ("click",function(){return t.onCancel()}),o.TgZ(8,"mat-icon"),o._uU(9,"cancel"),o.qZA(),o._uU(10),o.qZA(),o.qZA(),o.qZA(),o.qZA(),o.TgZ(11,"form",5),o.TgZ(12,"div",6),o.TgZ(13,"mat-form-field",7),o.TgZ(14,"mat-label"),o._uU(15,"C\xf3digo"),o.qZA(),o._UZ(16,"input",8),o.qZA(),o.TgZ(17,"mat-form-field",9),o.TgZ(18,"mat-label"),o._uU(19,"Descri\xe7\xe3o"),o.qZA(),o._UZ(20,"input",10),o.YNc(21,ro,2,1,"mat-error",11),o.qZA(),o.qZA(),o.TgZ(22,"div",12),o.YNc(23,lo,6,2,"mat-form-field",13),o.YNc(24,co,4,1,"mat-form-field",13),o.YNc(25,po,6,2,"mat-form-field",13),o.YNc(26,go,4,1,"mat-form-field",13),o.qZA(),o.TgZ(27,"div",12),o.YNc(28,bo,6,2,"mat-form-field",14),o.YNc(29,_o,4,1,"mat-form-field",14),o.TgZ(30,"mat-form-field",7),o.TgZ(31,"mat-label"),o._uU(32,"Apelido"),o.qZA(),o._UZ(33,"input",15),o.YNc(34,vo,2,1,"mat-error",11),o.qZA(),o.qZA(),o.qZA()),2&i&&(o.xp6(4),o.Oqu(t.labelCadastro),o.xp6(2),o.Q6J("ngIf",3!=t.idAcao),o.xp6(4),o.hij(" ",t.getLabelCancel()," "),o.xp6(1),o.Q6J("formGroup",t.formulario),o.xp6(5),o.Q6J("readonly",t.idAcao!=t.getAcoes().Inclusao),o.xp6(4),o.Q6J("readonly",t.readOnly),o.xp6(1),o.Q6J("ngIf",t.NoValidtouchedOrDirty("descricao")),o.xp6(2),o.Q6J("ngIf",t.idAcao!=t.getAcoes().Consulta&&t.idAcao!=t.getAcoes().Exclusao&&t.idAcao!=t.getAcoes().Atualizacao),o.xp6(1),o.Q6J("ngIf",t.idAcao==t.getAcoes().Consulta||t.idAcao==t.getAcoes().Exclusao),o.xp6(1),o.Q6J("ngIf",t.idAcao!=t.getAcoes().Consulta&&t.idAcao!=t.getAcoes().Exclusao&&t.idAcao!=t.getAcoes().Atualizacao),o.xp6(1),o.Q6J("ngIf",t.idAcao==t.getAcoes().Consulta||t.idAcao==t.getAcoes().Exclusao),o.xp6(2),o.Q6J("ngIf",t.idAcao!=t.getAcoes().Consulta&&t.idAcao!=t.getAcoes().Exclusao&&t.idAcao!=t.getAcoes().Atualizacao),o.xp6(1),o.Q6J("ngIf",t.idAcao==t.getAcoes().Consulta||t.idAcao==t.getAcoes().Exclusao),o.xp6(4),o.Q6J("readonly",t.readOnly),o.xp6(1),o.Q6J("ngIf",t.NoValidtouchedOrDirty("apelido")))},directives:[G.Ye,I.hX,h.O5,D.lW,F.Hw,p._Y,p.JL,p.sg,I.KE,L.Nt,p.Fj,p.JJ,p.u,I.TO,w.gD,h.sg,V.ey],styles:[""]}),a})(),canActivate:[]}];let Zo=(()=>{class a{}return a.\u0275fac=function(i){return new(i||a)},a.\u0275mod=o.oAB({type:a}),a.\u0275inj=o.cJS({imports:[[u.Bz.forChild(Co)],u.Bz]}),a})();var Ao=r(7666),So=r(4466),Io=r(8981);let To=(()=>{class a{}return a.\u0275fac=function(i){return new(i||a)},a.\u0275mod=o.oAB({type:a}),a.\u0275inj=o.cJS({imports:[[h.ez,Zo,Ao.q,f.Cl,p.u5,p.UX,So.m,Io.yI.forChild()]]}),a})()},2979:(S,b,r)=>{r.d(b,{D:()=>h});class h{constructor(){this.id_empresa=0,this.id_filial=0,this.codigo="",this.descricao="",this.pagina=0,this.tamPagina=50,this.contador="N",this.orderby="",this.sharp=!1}}},2174:(S,b,r)=>{r.d(b,{t:()=>h});class h{constructor(){this.id_empresa=0,this.id_filial=0,this.codigo=0,this.descricao="",this.pagina=0,this.tamPagina=50,this.contador="N",this.orderby="",this.sharp=!1}}},2704:(S,b,r)=>{r.d(b,{T:()=>_});var h=r(2340),u=r(7716),f=r(1841);let _=(()=>{class d{constructor(n){this.http=n,this.apiURL=h.N.apiURL}getCentroscustos(){return this.http.get(`${this.apiURL}Centroscustos`)}getCentroscustosParametro_01(n){return this.http.post(`${this.apiURL}centroscustos`,n)}getCentrocusto(n,g,l){return this.http.get(`${this.apiURL}centrocusto/${n}/${g}/${l}`)}centrocustoInsert(n){return this.http.post(`${this.apiURL}centrocusto`,n)}centrocustoUpdate(n){return this.http.put(`${this.apiURL}centrocusto`,n)}centrocustoDelete(n,g,l){return this.http.delete(`${this.apiURL}centrocusto/${n}/${g}/${l}`)}}return d.\u0275fac=function(n){return new(n||d)(u.LFG(f.eN))},d.\u0275prov=u.Yz7({token:d,factory:d.\u0275fac,providedIn:"root"}),d})()},7466:(S,b,r)=>{r.d(b,{Z:()=>_});var h=r(2340),u=r(7716),f=r(1841);let _=(()=>{class d{constructor(n){this.http=n,this.apiURL=h.N.apiURL}getGrupos(){return this.http.get(`${this.apiURL}Grupos`)}getGruposParametro_01(n){return this.http.post(`${this.apiURL}grupos`,n)}getGrupo(n,g,l){return this.http.get(`${this.apiURL}grupo/${n}/${g}/${l}`)}grupoInsert(n){return this.http.post(`${this.apiURL}grupo`,n)}grupoUpdate(n){return this.http.put(`${this.apiURL}grupo`,n)}grupoDelete(n,g,l){return this.http.delete(`${this.apiURL}grupo/${n}/${g}/${l}`)}}return d.\u0275fac=function(n){return new(n||d)(u.LFG(f.eN))},d.\u0275prov=u.Yz7({token:d,factory:d.\u0275fac,providedIn:"root"}),d})()},9267:(S,b,r)=>{function h(u,f,_=!1){return d=>{let Z="",n=!0;const g=d.value;return _||null!=g?_&&null==g||_&&0==g.length?{ValidatorStringLen:!0,message:"Dado Obrigat\xf3rio"}:_||0!=g.length?(u>0&&g.length<u&&(Z=`Campo Dever\xe1 Ter No Minimo ${u} Caracteres.`,n=!1),f>0&&g.length>f&&(Z=`Campo Dever\xe1 Ter No M\xe1ximo ${f} Caracteres.`,n=!1),n?null:{ValidatorStringLen:!0,message:Z}):null:null}}r.d(b,{S:()=>h})}}]);