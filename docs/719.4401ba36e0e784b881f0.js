"use strict";(self.webpackChunkinventario=self.webpackChunkinventario||[]).push([[719],{8786:(f,u,a)=>{a.d(u,{P:()=>r});class r{constructor(){this.id_empresa=0,this.id_filial=0,this.codigo="",this.descricao="",this.user_insert=0,this.user_update=0}}},604:(f,u,a)=>{a.d(u,{b:()=>r});class r{constructor(){this.id_empresa=0,this.id_filial=0,this.codigo=0,this.descricao="",this.user_insert=0,this.user_update=0}}},2653:(f,u,a)=>{a.d(u,{M:()=>r});class r{constructor(){this.id_empresa=0,this.modulo="",this.assinatura="",this.id_usuario=0,this.parametro="",this.user_insert=0,this.user_update=0}load(m){this.id_empresa=m.id_empresa,this.modulo=m.modulo,this.assinatura=m.assinatura,this.id_usuario=m.id_usuario,this.parametro=m.parametro,this.user_insert=m.user_insert,this.user_update=m.user_update}getParametro(){try{return JSON.parse(this.parametro)}catch(m){return JSON.parse('{"mensagem":"error"}')}}setParametro(m){this.parametro=JSON.stringify(m)}}},6719:(f,u,a)=>{a.r(u),a.d(u,{BookModule:()=>dt});var r=a(8583),p=a(4655),m=a(8786),d=a(604),l=a(2979),v=a(2174),i=a(3430),g=a(4405),c=a(6809),_=a(1606),C=a(2653),L=a(5062),O=a(1543),A=a(9243),$=a(8495),x=a(4635),B=a(3075),t=a(7716),b=a(3679),M=a(3317),w=a(7466),F=a(2704),R=a(5626),k=a(6288),z=a(6081),q=a(789),J=a(2522),D=a(3968),y=a(1095),V=a(1436),G=a(6627),E=a(8295),j=a(7441),Y=a(9983),K=a(2458),Q=a(34),W=a(9334),H=a(6348),X=a(381),tt=a(980);function ot(n,h){if(1&n&&(t.TgZ(0,"mat-option",29),t._uU(1),t.qZA()),2&n){const o=h.$implicit;t.Q6J("value",o.codigo),t.xp6(1),t.hij(" ",o.descricao," ")}}function at(n,h){if(1&n&&(t.TgZ(0,"mat-option",29),t._uU(1),t.qZA()),2&n){const o=h.$implicit;t.Q6J("value",o.codigo),t.xp6(1),t.hij(" ",o.descricao," ")}}function et(n,h){if(1&n&&(t.TgZ(0,"mat-option",29),t._uU(1),t.qZA()),2&n){const o=h.$implicit;t.Q6J("value",o.codigo),t.xp6(1),t.hij(" ",o.descricao," ")}}function it(n,h){if(1&n&&(t.TgZ(0,"mat-option",29),t._uU(1),t.qZA()),2&n){const o=h.$implicit;t.Q6J("value",o.id),t.xp6(1),t.hij(" ",o.descricao," ")}}function rt(n,h){if(1&n&&(t.TgZ(0,"mat-option",29),t._uU(1),t.qZA()),2&n){const o=h.$implicit;t.Q6J("value",o.sigla),t.xp6(1),t.hij(" ",o.descricao," ")}}function st(n,h){if(1&n&&(t.TgZ(0,"mat-option",29),t._uU(1),t.qZA()),2&n){const o=h.$implicit;t.Q6J("value",o.id_usuario),t.xp6(1),t.hij(" ",o.razao," ")}}function nt(n,h){if(1&n&&(t.TgZ(0,"mat-option",29),t._uU(1),t.qZA()),2&n){const o=h.$implicit;t.Q6J("value",o.idx),t.xp6(1),t.hij(" ",o.descricao," ")}}function ct(n,h){if(1&n){const o=t.EpF();t.TgZ(0,"form",12),t.TgZ(1,"div",13),t.TgZ(2,"mat-form-field",14),t.TgZ(3,"mat-label"),t._uU(4,"Centro Custo"),t.qZA(),t.TgZ(5,"mat-select",15),t.NdJ("selectionChange",function(){return t.CHM(o),t.oxw().onChangeParametros()}),t.YNc(6,ot,2,2,"mat-option",16),t.qZA(),t.qZA(),t.TgZ(7,"mat-form-field",14),t.TgZ(8,"mat-label"),t._uU(9,"Novo Centro Custo"),t.qZA(),t.TgZ(10,"mat-select",17),t.NdJ("selectionChange",function(){return t.CHM(o),t.oxw().onChangeParametros()}),t.YNc(11,at,2,2,"mat-option",16),t.qZA(),t.qZA(),t.qZA(),t.TgZ(12,"div",13),t.TgZ(13,"mat-form-field",14),t.TgZ(14,"mat-label"),t._uU(15,"Grupos"),t.qZA(),t.TgZ(16,"mat-select",18),t.NdJ("selectionChange",function(){return t.CHM(o),t.oxw().onChangeParametros()}),t.YNc(17,et,2,2,"mat-option",16),t.qZA(),t.qZA(),t.TgZ(18,"mat-form-field",14),t.TgZ(19,"mat-label"),t._uU(20,"Situa\xe7\xf5es"),t.qZA(),t.TgZ(21,"mat-select",19),t.NdJ("selectionChange",function(){return t.CHM(o),t.oxw().onChangeParametros()}),t.YNc(22,it,2,2,"mat-option",16),t.qZA(),t.qZA(),t.qZA(),t.TgZ(23,"div",13),t.TgZ(24,"mat-form-field",14),t.TgZ(25,"mat-label"),t._uU(26,"Origem"),t.qZA(),t.TgZ(27,"mat-select",20),t.NdJ("selectionChange",function(){return t.CHM(o),t.oxw().onChangeParametros()}),t.YNc(28,rt,2,2,"mat-option",16),t.qZA(),t.qZA(),t.TgZ(29,"mat-form-field",14),t.TgZ(30,"mat-label"),t._uU(31,"Executores"),t.qZA(),t.TgZ(32,"mat-select",21),t.NdJ("selectionChange",function(){return t.CHM(o),t.oxw().onChangeParametros()}),t.YNc(33,st,2,2,"mat-option",16),t.qZA(),t.qZA(),t.qZA(),t.TgZ(34,"div",22),t.TgZ(35,"mat-form-field",23),t.TgZ(36,"mat-label"),t._uU(37,"C\xf3digo"),t.qZA(),t._UZ(38,"input",24),t.qZA(),t.TgZ(39,"mat-form-field",23),t.TgZ(40,"mat-label"),t._uU(41,"Novo"),t.qZA(),t._UZ(42,"input",25),t.qZA(),t.TgZ(43,"mat-form-field",14),t.TgZ(44,"mat-label"),t._uU(45,"Condi\xe7\xe3o"),t.qZA(),t.TgZ(46,"mat-select",26),t.NdJ("selectionChange",function(){return t.CHM(o),t.oxw().onChangeParametros()}),t.YNc(47,nt,2,2,"mat-option",16),t.qZA(),t.qZA(),t.qZA(),t.TgZ(48,"div",27),t.TgZ(49,"mat-form-field",23),t.TgZ(50,"mat-label"),t._uU(51,"Descri\xe7\xe3o"),t.qZA(),t._UZ(52,"input",28),t.qZA(),t.qZA(),t.qZA()}if(2&n){const o=t.oxw();t.Q6J("formGroup",o.parametros),t.xp6(6),t.Q6J("ngForOf",o.ccs),t.xp6(5),t.Q6J("ngForOf",o.ccs_alterados),t.xp6(6),t.Q6J("ngForOf",o.grupos),t.xp6(5),t.Q6J("ngForOf",o.situacoesInventario),t.xp6(6),t.Q6J("ngForOf",o.Origens),t.xp6(5),t.Q6J("ngForOf",o.executores),t.xp6(14),t.Q6J("ngForOf",o.condicoes)}}function lt(n,h){if(1&n&&(t.TgZ(0,"tr"),t.TgZ(1,"td"),t.TgZ(2,"div"),t.TgZ(3,"mat-label",30),t._uU(4),t.qZA(),t.qZA(),t.TgZ(5,"div"),t.TgZ(6,"mat-label",30),t._uU(7),t.ALo(8,"origem"),t.qZA(),t.qZA(),t.TgZ(9,"div"),t.TgZ(10,"mat-label",30),t._uU(11),t.ALo(12,"situacao"),t.qZA(),t.qZA(),t.qZA(),t.TgZ(13,"td"),t.TgZ(14,"div"),t.TgZ(15,"mat-label",30),t._uU(16),t.qZA(),t.qZA(),t.TgZ(17,"div"),t.TgZ(18,"mat-label",30),t._uU(19),t.ALo(20,"embrancopipe"),t.qZA(),t.qZA(),t.TgZ(21,"div"),t.TgZ(22,"mat-label",30),t._uU(23),t.qZA(),t.qZA(),t.qZA(),t.TgZ(24,"td"),t.TgZ(25,"div"),t.TgZ(26,"mat-label",30),t._uU(27),t.ALo(28,"zerotospacepipe"),t.qZA(),t.qZA(),t.TgZ(29,"div"),t.TgZ(30,"mat-label",31),t._uU(31),t.qZA(),t.qZA(),t.qZA(),t.TgZ(32,"td"),t.TgZ(33,"div"),t.TgZ(34,"mat-label",30),t._uU(35),t.ALo(36,"zerotospacepipe"),t.qZA(),t.qZA(),t.TgZ(37,"div"),t.TgZ(38,"mat-label",30),t._uU(39),t.ALo(40,"firstName"),t.qZA(),t.qZA(),t.TgZ(41,"div"),t.TgZ(42,"mat-label",30),t._uU(43),t.qZA(),t.qZA(),t.qZA(),t.TgZ(44,"td"),t.TgZ(45,"div"),t.TgZ(46,"mat-label",30),t._uU(47),t.qZA(),t.qZA(),t.qZA(),t.qZA()),2&n){const o=h.$implicit;t.xp6(4),t.Oqu(o.id_imobilizado),t.xp6(3),t.Oqu(t.lcZ(8,14,o.imo_origem)),t.xp6(4),t.Oqu(t.lcZ(12,16,o.status)),t.xp6(5),t.Oqu(o.imo_descricao),t.xp6(3),t.Oqu(t.lcZ(20,18,o.cc_descricao)),t.xp6(4),t.Oqu(o.grupo_descricao),t.xp6(4),t.hij("C\xf3d:",t.lcZ(28,20,o.new_codigo),""),t.xp6(3),t.Q6J("matTooltip",o.new_cc_descricao),t.xp6(1),t.hij(" C.C.:",o.new_cc," "),t.xp6(4),t.hij("Lan\xe7:",t.lcZ(36,22,o.id_lanca),""),t.xp6(4),t.hij("Resp:",t.lcZ(40,24,o.usu_razao),""),t.xp6(4),t.hij("Data:",o.lanc_dt_lanca,""),t.xp6(4),t.AsE("",o.imo_nfe,"-",o.imo_serie,"")}}const ut=[{path:"",redirectTo:"book",pathMatch:"full"},{path:"book",component:(()=>{class n{constructor(o,e,s,Z,P,T,vt,_t,ft,Zt){this.formBuilder=o,this.globalService=e,this.grupoService=s,this.centrocustoService=Z,this.parametrosService=P,this.imoInventarioService=T,this.lancamentoService=vt,this.router=_t,this.appSnackBar=ft,this.route=Zt,this.situacoesInventario=[],this.imoinv=[],this.grupos=[],this.ccs=[],this.ccs_alterados=[],this.condicoes=[],this.respostas=[],this.tamPagina=50,this.parametro=new C.M,this.controlePaginas=new i.e(this.tamPagina,this.tamPagina),this.retorno=!1,this.showFiltro=!0,this.executores=[],this.Origens=[],this.parametros=o.group({ccs:[{value:""}],cc_novo:[{value:""}],grupos:[{value:""}],situacoes:[{value:""}],origem:[{value:""}],executor:[{value:""}],codigo:[{value:""}],novo:[{value:""}],condicao:[{value:""}],descricao:[{value:""}]});const S=new g.E;S.id=-1,S.descricao="Todas",this.situacoesInventario.push(S),this.situacoesInventario=[...this.situacoesInventario,...this.globalService.getSituacoesInventario()],this.condicoes=this.globalService.getCondicoes();const U=new _.t;U.sigla="",U.descricao="Todos";const N=new _.t;N.sigla="S",N.descricao="SIM";const I=new _.t;I.sigla="N",I.descricao="N\xc3O",this.respostas.push(U),this.respostas.push(N),this.respostas.push(I),this.Origens.push(new B.x("","Todas")),this.Origens=[...this.Origens,...this.globalService.getOrigens()],this.getExecutores(),this.setValuesNoParam(),this.getCentroCustos()}ngOnInit(){}ngOnDestroy(){var o,e,s,Z;null===(o=this.inscricaoGetAll)||void 0===o||o.unsubscribe(),null===(e=this.inscricaoGetGrupo)||void 0===e||e.unsubscribe(),null===(s=this.inscricaoGetCc)||void 0===s||s.unsubscribe(),null===(Z=this.inscricaoParametro)||void 0===Z||Z.unsubscribe(),this.inscricaoExecutores.unsubscribe()}getExecutores(){let o=new $.G;o.id_empresa=this.globalService.getEmpresa().id,o.id_filial=this.globalService.getLocal().id,o.id_inventario=this.globalService.getInventario().codigo,this.globalService.setSpin(!0),this.inscricaoExecutores=this.lancamentoService.resumolancamentos(o).subscribe(e=>{this.globalService.setSpin(!1);const s=new x.S;s.id_usuario=0,s.razao="Todos",this.executores.push(s),this.executores=[...this.executores,...e]},e=>{this.globalService.setSpin(!1);const s=new x.S;s.id_usuario=0,s.razao="Todos",this.executores.push(s)})}getCentroCustos(){let o=new l.D;o.id_empresa=this.globalService.getIdEmpresa(),o.id_filial=this.globalService.getLocal().id,o.orderby="Descri\xe7\xe3o",this.globalService.setSpin(!0),this.inscricaoGetCc=this.centrocustoService.getCentroscustosParametro_01(o).subscribe(e=>{this.globalService.setSpin(!1);const s=new m.P;s.codigo="",s.descricao="Todos",this.ccs=[],this.ccs_alterados=[],this.ccs.push(s);const Z=new m.P;Z.codigo="",Z.descricao="Todos N\xe3o Alterados",this.ccs_alterados.push(Z),e.forEach(P=>{var T=P.descricao.indexOf("-");T>=0&&(P.descricao=P.descricao.trim().substring(T+1)+" -> "+P.descricao.trim())}),e.sort((P,T)=>P.descricao<T.descricao?-1:P.descricao>T.descricao?1:0),this.ccs=[...this.ccs,...e],this.ccs_alterados=[...this.ccs_alterados,...e],this.getGrupos()},e=>{this.globalService.setSpin(!1),this.ccs=[],this.ccs_alterados=[],this.appSnackBar.openFailureSnackBar(`Pesquisa Nos Grupos ${(0,c.bZ)(e)}`,"OK")})}getGrupos(){let o=new v.t;o.id_empresa=this.globalService.getIdEmpresa(),o.id_filial=this.globalService.getLocal().id,o.orderby="Grupo",this.globalService.setSpin(!0),this.inscricaoGetGrupo=this.grupoService.getGruposParametro_01(o).subscribe(e=>{this.globalService.setSpin(!1);const s=new d.b;s.codigo=0,s.descricao="Todos",this.grupos=[],this.grupos.push(s),this.grupos=[...this.grupos,...e],this.loadParametros()},e=>{this.globalService.setSpin(!1),this.grupos=[],this.setValues(),this.appSnackBar.openFailureSnackBar(`Pesquisa Nos Grupos ${(0,c.bZ)(e)}`,"OK")})}getImoIven(){let o=new O.E;o.id_empresa=this.globalService.getIdEmpresa(),o.id_filial=this.globalService.getLocal().id,o.id_inventario=this.globalService.getInventario().codigo,""!==this.parametros.value.cc&&(o.id_cc=this.parametros.value.ccs),""!==this.parametros.value.cc_novo&&(o.new_cc=this.parametros.value.cc_novo);let e=parseInt(this.parametros.value.grupos,10);o.id_grupo=isNaN(e)?0:e,e=parseInt(this.parametros.value.situacoes,10),o.status=isNaN(e)?0:e,e=parseInt(this.parametros.value.codigo,10),o.id_imobilizado=isNaN(e)?0:e,e=parseInt(this.parametros.value.novo,10),o.new_codigo=isNaN(e)?0:e,e=parseInt(this.parametros.value.condicao,10),o.condicao=isNaN(e)?0:e,o.book="S",""!==this.parametros.value.descricao.trim()&&(o.descricao=this.parametros.value.descricao),e=parseInt(this.parametros.value.executor,10),o.id_usuario=isNaN(e)?0:e,""!==this.parametros.value.origem.trim()&&(o.origem=this.parametros.value.origem),o.contador="N",o.tamPagina=this.tamPagina,o.pagina=this.controlePaginas.getPaginalAtual(),o.orderby="Imobilizado",this.globalService.setSpin(!0),this.inscricaoGetAll=this.imoInventarioService.getImobilizadosinventariosParametro_01(o).subscribe(s=>{this.globalService.setSpin(!1),this.imoinv=s;const Z=this.imoinv.findIndex(T=>T.id_imobilizado==(0,c.P0)(this.parametro.getParametro(),"id_retorno"));setTimeout(()=>this.viewPort.scrollToIndex(Z),10),this.retorno=!1;let P=this.parametro.getParametro();Object(P).id_retorno=0,Object(P).new=!1,this.parametro.parametro=JSON.stringify(P)},s=>{this.globalService.setSpin(!1),this.imoinv=[],this.appSnackBar.openFailureSnackBar(`Pesquisa Nos Produtos De Invent\xe1rio ${(0,c.bZ)(s)}`,"OK")})}getImoIvenContador(){let o=new O.E;o.id_empresa=this.globalService.getIdEmpresa(),o.id_filial=this.globalService.getLocal().id,o.id_inventario=this.globalService.getInventario().codigo,""!==this.parametros.value.cc&&(o.id_cc=this.parametros.value.ccs),""!==this.parametros.value.cc_novo&&(o.new_cc=this.parametros.value.cc_novo);let e=parseInt(this.parametros.value.grupos,10);o.id_grupo=isNaN(e)?0:e,e=parseInt(this.parametros.value.situacoes,10),o.status=isNaN(e)?0:e,e=parseInt(this.parametros.value.codigo,10),o.id_imobilizado=isNaN(e)?0:e,e=parseInt(this.parametros.value.novo,10),o.new_codigo=isNaN(e)?0:e,e=parseInt(this.parametros.value.condicao,10),o.condicao=isNaN(e)?0:e,o.book="S",""!==this.parametros.value.descricao.trim()&&(o.descricao=this.parametros.value.descricao),e=parseInt(this.parametros.value.executor,10),o.id_usuario=isNaN(e)?0:e,""!==this.parametros.value.origem.trim()&&(o.origem=this.parametros.value.origem),o.contador="S",o.tamPagina=this.tamPagina,o.orderby="Imobilizado",this.globalService.setSpin(!0),this.inscricaoGetAll=this.imoInventarioService.getImobilizadosinventariosParametro_01(o).subscribe(s=>{if(this.globalService.setSpin(!1),this.controlePaginas=new i.e(this.tamPagina,0==s.total?1:s.total),this.retorno)if((0,c.xc)(this.parametro.getParametro(),"new"))this.controlePaginas.goLast();else{let Z=this.parametro.getParametro();this.controlePaginas.setPaginaAtual(Object(Z).page)}this.getImoIven()},s=>{this.globalService.setSpin(!1),this.imoinv=[],this.controlePaginas=new i.e(this.tamPagina,1),this.appSnackBar.openFailureSnackBar(`Pesquisa Nos Produtos De Invent\xe1rio ${(0,c.bZ)(s)}`,"OK")})}getTexto(){return c.fd}setValues(){this.parametros.setValue({ccs:(0,c.SL)(this.parametro.getParametro(),"cc"),cc_novo:(0,c.SL)(this.parametro.getParametro(),"cc_novo"),grupos:(0,c.P0)(this.parametro.getParametro(),"grupo"),situacoes:(0,c.SL)(this.parametro.getParametro(),"situacao"),codigo:(0,c.P0)(this.parametro.getParametro(),"codigo"),novo:(0,c.P0)(this.parametro.getParametro(),"novo"),origem:(0,c.SL)(this.parametro.getParametro(),"origem"),executor:(0,c.P0)(this.parametro.getParametro(),"executor"),condicao:(0,c.P0)(this.parametro.getParametro(),"condicao"),descricao:(0,c.SL)(this.parametro.getParametro(),"descricao")})}setValuesNoParam(){this.parametros.setValue({ccs:"",cc_novo:"",grupos:0,situacoes:0,codigo:"",novo:"",origem:"",executor:0,condicao:"0",descricao:""})}onChangePage(){this.getImoIven()}onChangeParametros(){this.getImoIvenContador()}onHome(){this.router.navigate([""])}onSaveConfig(){this.updateParametros()}loadParametros(){if(this.parametro=new C.M,this.parametro.id_empresa=this.globalService.getIdEmpresa(),this.parametro.modulo="parambook",this.parametro.assinatura="V1.00 08/07/2024",this.parametro.id_usuario=this.globalService.usuario.id,this.parametro.parametro='\n       {\n         "cc": "",\n         "cc_novo":"",\n         "grupo":0,\n         "situacao":-1,\n         "codigo":0,\n         "novo":0,\n         "origem":"",\n         "executor":0,\n         "condicao":0,\n         "book":"S",\n         "descricao": "",\n         "page": 1,\n         "new": false,\n         "id_retorno":0\n       }',this.retorno&&null!==this.globalService.estadoFind("parambook")){const o=this.globalService.estadoFind("parambook");if(null!=o){if((0,c.xc)(o.getParametro(),"new")){let e=this.parametro.getParametro();Object(e).id_retorno=(0,c.P0)(o.getParametro(),"id_retorno"),this.parametro.parametro=JSON.stringify(e)}else this.controlePaginas.setPaginaAtual((0,c.P0)(o.getParametro(),"page")),this.parametro.setParametro(o.getParametro());this.globalService.estadoDelete(o),this.setValues(),this.getImoIvenContador()}}else this.getParametro()}getParametro(){this.globalService.setSpin(!0);let o=new L.E;o.id_empresa=this.parametro.id_empresa,o.modulo=this.parametro.modulo,o.assinatura=this.parametro.assinatura,o.id_usuario=this.parametro.id_usuario,o.orderby="Usu\xe1rio",this.inscricaoParametro=this.parametrosService.getParametrosParametro01(o).subscribe(e=>{this.globalService.setSpin(!1),this.parametro=new C.M,this.parametro.id_empresa=e[0].id_empresa,this.parametro.modulo=e[0].modulo,this.parametro.id_usuario=e[0].id_usuario,this.parametro.assinatura=e[0].assinatura,this.parametro.parametro=e[0].parametro,this.parametro.user_insert=e[0].user_insert,this.parametro.user_update=e[0].user_update,this.setValues(),this.getImoIvenContador()},e=>{this.globalService.setSpin(!1),this.setValues(),this.getImoIvenContador()})}updateParametros(){this.globalService.setSpin(!0),this.parametro.user_insert=this.globalService.usuario.id,this.parametro.user_update=this.globalService.usuario.id;let o=this.parametro.getParametro(),e=parseInt(this.parametros.value.codigo,10);isNaN(e)?Object(o).codigo=0:Object(o).codigo=e,Object(o).cc=this.parametros.value.ccs,Object(o).cc_novo=this.parametros.value.cc_novo,Object(o).grupo=this.parametros.value.grupos,Object(o).situacao=this.parametros.value.situacoes,Object(o).codigo=this.parametros.value.codigo,Object(o).novo=this.parametros.value.novo,Object(o).origem=this.parametros.value.origem,Object(o).executor=this.parametros.value.executor,Object(o).condicao=this.parametros.value.condicao,Object(o).book="S",Object(o).descricao=this.parametros.value.descricao,Object(o).page=0,Object(o).new=!1,this.parametro.parametro=JSON.stringify(o),this.inscricaoParametro=this.parametrosService.ParametroAtualiza(this.parametro).subscribe(s=>{this.globalService.setSpin(!1),this.appSnackBar.openSuccessSnackBar("Par\xe2metros Atualizados","OK")},s=>{this.globalService.setSpin(!1),this.appSnackBar.openFailureSnackBar(`Grava\xe7\xe3o Dos Parametros ${(0,c.bZ)(s)}`,"OK")})}onFiltro(){this.showFiltro=!this.showFiltro}getLabelFiltro(){return this.showFiltro?"Ocultar Filtro":"Mostra Filtro"}}return n.\u0275fac=function(o){return new(o||n)(t.Y36(b.qu),t.Y36(M.U),t.Y36(w.Z),t.Y36(F.T),t.Y36(R.u),t.Y36(k.J),t.Y36(z.l),t.Y36(p.F0),t.Y36(q.W),t.Y36(p.gz))},n.\u0275cmp=t.Xpm({type:n,selectors:[["app-book-view"]],viewQuery:function(o,e){if(1&o&&t.Gf(A.N7,5),2&o){let s;t.iGM(s=t.CRH())&&(e.viewPort=s.first)}},decls:31,vars:5,consts:[[1,"div-barra"],[1,"example-spacer"],[3,"controle","changePage"],["mat-icon-button","","aria-label","Example icon-button with share icon","matTooltip","Atualizar","matTooltipPosition","above",1,"example-icon",3,"click"],["mat-icon-button","","aria-label","Example icon-button with share icon ","matTooltipPosition","above","matTooltip","Salvar Par\xe2metros","matTooltipPosition","above",3,"click"],["mat-icon-button","","aria-label","Example icon-button with share icon ","matTooltipPosition","above","matTooltip","Retorno","matTooltipPosition","above",3,"click"],["mat-raised-button","","color","primary",1,"botao",3,"click"],["autocomplete","off",3,"formGroup",4,"ngIf"],[1,"content",3,"itemSize"],[1,"Browse_Lanc"],[1,"coluna-cabec"],[4,"cdkVirtualFor","cdkVirtualForOf"],["autocomplete","off",3,"formGroup"],[1,"col-med-2"],["field","","appearance","outline",1,"col-max"],["formControlName","ccs",3,"selectionChange"],[3,"value",4,"ngFor","ngForOf"],["formControlName","cc_novo",3,"selectionChange"],["formControlName","grupos",3,"selectionChange"],["formControlName","situacoes",3,"selectionChange"],["formControlName","origem",3,"selectionChange"],["formControlName","executor",3,"selectionChange"],[1,"col-med-3"],["appearance","outline",1,"col-max"],["matInput","","formControlName","codigo"],["matInput","","formControlName","novo"],["formControlName","condicao",3,"selectionChange"],[1,"col-med-1"],["matInput","","formControlName","descricao","oninput","this.value = this.value.toUpperCase()"],[3,"value"],[1,"Browse_Lanc_td"],["matTooltipPosition","above",1,"Browse_Lanc_td",3,"matTooltip"]],template:function(o,e){1&o&&(t.TgZ(0,"div",0),t.TgZ(1,"mat-toolbar"),t.TgZ(2,"span",1),t._uU(3,"Ativos Que Est\xe3o No Book"),t.qZA(),t.TgZ(4,"app-navegator",2),t.NdJ("changePage",function(){return e.onChangePage()}),t.qZA(),t.TgZ(5,"button",3),t.NdJ("click",function(){return e.getImoIvenContador()}),t.TgZ(6,"mat-icon"),t._uU(7,"rotate_right"),t.qZA(),t.qZA(),t.TgZ(8,"button",4),t.NdJ("click",function(){return e.onSaveConfig()}),t.TgZ(9,"mat-icon"),t._uU(10,"brightness_high"),t.qZA(),t.qZA(),t.TgZ(11,"button",5),t.NdJ("click",function(){return e.onHome()}),t.TgZ(12,"mat-icon"),t._uU(13,"home"),t.qZA(),t.qZA(),t.TgZ(14,"button",6),t.NdJ("click",function(){return e.onFiltro()}),t._uU(15),t.qZA(),t.qZA(),t.qZA(),t.YNc(16,ct,53,8,"form",7),t.TgZ(17,"cdk-virtual-scroll-viewport",8),t.TgZ(18,"table",9),t.TgZ(19,"tr",10),t.TgZ(20,"th"),t._uU(21,"C\xf3d Imobil."),t.qZA(),t.TgZ(22,"th"),t._uU(23,"Descri\xe7\xe3o/CC"),t.qZA(),t.TgZ(24,"th"),t._uU(25,"Novos"),t.qZA(),t.TgZ(26,"th"),t._uU(27,"Lan\xe7amento"),t.qZA(),t.TgZ(28,"th"),t._uU(29,"NFE & Serie"),t.qZA(),t.qZA(),t.YNc(30,lt,48,26,"tr",11),t.qZA(),t.qZA()),2&o&&(t.xp6(4),t.Q6J("controle",e.controlePaginas),t.xp6(11),t.Oqu(e.getLabelFiltro()),t.xp6(1),t.Q6J("ngIf",e.showFiltro),t.xp6(1),t.Q6J("itemSize",50),t.xp6(13),t.Q6J("cdkVirtualForOf",e.imoinv))},directives:[J.Ye,D.J,y.lW,V.gM,G.Hw,r.O5,A.N7,A.xd,A.x0,b._Y,b.JL,b.sg,E.KE,E.hX,j.gD,b.JJ,b.u,r.sg,Y.Nt,b.Fj,K.ey],pipes:[Q.A,W.X,H.g,X.Y,tt.z],styles:[".content[_ngcontent-%COMP%]{height:60%;overflow:auto}tr[_ngcontent-%COMP%]:nth-child(even){background-color:#f2f2aa}tr[_ngcontent-%COMP%]:hover{background-color:#caa99d}"]}),n})()}];let mt=(()=>{class n{}return n.\u0275fac=function(o){return new(o||n)},n.\u0275mod=t.oAB({type:n}),n.\u0275inj=t.cJS({imports:[[p.Bz.forChild(ut)],p.Bz]}),n})();var pt=a(7666),ht=a(4466),gt=a(8981);let dt=(()=>{class n{}return n.\u0275fac=function(o){return new(o||n)},n.\u0275mod=t.oAB({type:n}),n.\u0275inj=t.cJS({imports:[[r.ez,mt,pt.q,A.Cl,b.u5,b.UX,ht.m,gt.yI.forChild()]]}),n})()},2979:(f,u,a)=>{a.d(u,{D:()=>r});class r{constructor(){this.id_empresa=0,this.id_filial=0,this.codigo="",this.descricao="",this.pagina=0,this.tamPagina=50,this.contador="N",this.orderby="",this.sharp=!1}}},2174:(f,u,a)=>{a.d(u,{t:()=>r});class r{constructor(){this.id_empresa=0,this.id_filial=0,this.codigo=0,this.descricao="",this.pagina=0,this.tamPagina=50,this.contador="N",this.orderby="",this.sharp=!1}}},1543:(f,u,a)=>{a.d(u,{E:()=>r});class r{constructor(){this.id_empresa=0,this.id_filial=0,this.id_inventario=0,this.id_imobilizado=0,this.id_cc="",this.id_grupo=0,this.descricao="",this.observacao="",this.status=-1,this.new_cc="",this.new_codigo=0,this.id_usuario=0,this.origem="",this.condicao=0,this.book="",this.dtinicial="",this.dtfinal="",this.pagina=0,this.tamPagina=50,this.contador="N",this.orderby="",this.sharp=!1}}},5062:(f,u,a)=>{a.d(u,{E:()=>r});class r{constructor(){this.id_empresa=0,this.modulo="",this.assinatura="",this.id_usuario=0,this.pagina=0,this.tamPagina=50,this.contador="N",this.orderby="",this.sharp=!1}}},2704:(f,u,a)=>{a.d(u,{T:()=>d});var r=a(2340),p=a(7716),m=a(1841);let d=(()=>{class l{constructor(i){this.http=i,this.apiURL=r.N.apiURL}getCentroscustos(){return this.http.get(`${this.apiURL}Centroscustos`)}getCentroscustosParametro_01(i){return this.http.post(`${this.apiURL}centroscustos`,i)}getCentrocusto(i,g,c){return this.http.get(`${this.apiURL}centrocusto/${i}/${g}/${c}`)}centrocustoInsert(i){return this.http.post(`${this.apiURL}centrocusto`,i)}centrocustoUpdate(i){return this.http.put(`${this.apiURL}centrocusto`,i)}centrocustoDelete(i,g,c){return this.http.delete(`${this.apiURL}centrocusto/${i}/${g}/${c}`)}}return l.\u0275fac=function(i){return new(i||l)(p.LFG(m.eN))},l.\u0275prov=p.Yz7({token:l,factory:l.\u0275fac,providedIn:"root"}),l})()},7466:(f,u,a)=>{a.d(u,{Z:()=>d});var r=a(2340),p=a(7716),m=a(1841);let d=(()=>{class l{constructor(i){this.http=i,this.apiURL=r.N.apiURL}getGrupos(){return this.http.get(`${this.apiURL}Grupos`)}getGruposParametro_01(i){return this.http.post(`${this.apiURL}grupos`,i)}getGrupo(i,g,c){return this.http.get(`${this.apiURL}grupo/${i}/${g}/${c}`)}grupoInsert(i){return this.http.post(`${this.apiURL}grupo`,i)}grupoUpdate(i){return this.http.put(`${this.apiURL}grupo`,i)}grupoDelete(i,g,c){return this.http.delete(`${this.apiURL}grupo/${i}/${g}/${c}`)}}return l.\u0275fac=function(i){return new(i||l)(p.LFG(m.eN))},l.\u0275prov=p.Yz7({token:l,factory:l.\u0275fac,providedIn:"root"}),l})()},6288:(f,u,a)=>{a.d(u,{J:()=>d});var r=a(2340),p=a(7716),m=a(1841);let d=(()=>{class l{constructor(i){this.http=i,this.apiURL=r.N.apiURL}getImobilizadosinventarios(){return this.http.get(`${this.apiURL}Imobilizadosinventarios`)}getImobilizadosinventariosParametro_01(i){return this.http.post(`${this.apiURL}imobilizadosinventarios`,i)}getImobilizadosinventariosFotos(i){return this.http.post(`${this.apiURL}imobilizadosinventariosfotos`,i)}getImobilizadoinventario(i,g,c,_){return this.http.get(`${this.apiURL}imobilizadoinventario/${i}/${g}/${c}/${_}`)}imobilizadoinventarioInsert(i){return this.http.post(`${this.apiURL}imobilizadoinventario`,i)}imobilizadoinventarioUpdate(i){return this.http.put(`${this.apiURL}imobilizadoinventario`,i)}imobilizadoinventarioDelete(i,g,c,_){return this.http.delete(`${this.apiURL}imobilizadoinventario/${i}/${g}/${c}/${_}`)}anexarProdutoInventario(i){return this.http.post(`${this.apiURL}anexarprodutoinventario`,i)}getExcelv2(i){return this.http.post(`${this.apiURL}imobilizadosinventariosexcelv2`,i)}}return l.\u0275fac=function(i){return new(i||l)(p.LFG(m.eN))},l.\u0275prov=p.Yz7({token:l,factory:l.\u0275fac,providedIn:"root"}),l})()},5626:(f,u,a)=>{a.d(u,{u:()=>d});var r=a(2340),p=a(7716),m=a(1841);let d=(()=>{class l{constructor(i){this.http=i,this.apiURL=r.N.apiURL}getParametros(){return this.http.get(`${this.apiURL}parametros`)}getParametrosParametro01(i){return this.http.post(`${this.apiURL}parametros`,i)}getParametro(i,g,c,_){return this.http.get(`${this.apiURL}parametro/${i}/${g}/${c}/${_}`)}ParametroInsert(i){return this.http.post(`${this.apiURL}parametro/`,i)}ParametroUpdate(i){return this.http.put(`${this.apiURL}parametro/`,i)}ParametroAtualiza(i){return this.http.post(`${this.apiURL}atualizarparametro/`,i)}ParametroDelete(i,g,c,_){return this.http.delete(`${this.apiURL}parametro/${i}/${g}/${c}/${_}`)}ParametroInstallKey(){return this.http.post(`${this.apiURL}fotokey`,{chave:"nada"})}}return l.\u0275fac=function(i){return new(i||l)(p.LFG(m.eN))},l.\u0275prov=p.Yz7({token:l,factory:l.\u0275fac,providedIn:"root"}),l})()},3430:(f,u,a)=>{a.d(u,{e:()=>r});class r{constructor(m,d){this.tamPagina=m,this.totalRegistros=d,this.paginaInicial=1,this.paginaFinal=1,this.totalPaginas=1,this.setTamPagina(this.tamPagina),this.paginaAtual=1}goFirst(){return this.paginaAtual=this.paginaInicial,this.paginaAtual}goLast(){return this.paginaAtual=this.paginaFinal,this.paginaAtual}nextPage(){this.paginaAtual++,this.paginaAtual>this.paginaFinal&&(this.paginaAtual=this.paginaFinal)}forwardPage(){this.paginaAtual--,this.paginaAtual<1&&(this.paginaAtual=1)}getPaginalAtual(){return this.paginaAtual}getTotalPaginas(){return this.totalPaginas}setTamPagina(m){this.tamPagina=m,this.totalPaginas=this.totalRegistros%this.tamPagina==0?Math.trunc(this.totalRegistros/this.tamPagina):Math.trunc(this.totalRegistros/this.tamPagina)+1,this.paginaFinal=this.totalPaginas}setPaginaAtual(m){this.paginaAtual=m}start(){this.paginaInicial=1,this.paginaFinal=1,this.totalPaginas=1,this.paginaAtual=1}}},1606:(f,u,a)=>{a.d(u,{t:()=>r});class r{constructor(){this.sigla="",this.descricao=""}}},3968:(f,u,a)=>{a.d(u,{J:()=>l});var r=a(7716),p=a(1095),m=a(1436),d=a(6627);let l=(()=>{class v{constructor(){this.change=new r.vpe}ngOnInit(){}getAtual(){return`${this.controlePaginas.getPaginalAtual()}/${this.controlePaginas.getTotalPaginas()}`}firstPage(){this.controlePaginas.goFirst(),this.change.emit("")}lastPage(){this.controlePaginas.goLast(),this.change.emit("")}forwardPage(){this.controlePaginas.forwardPage(),this.change.emit("")}nextPage(){this.controlePaginas.nextPage(),this.change.emit("")}}return v.\u0275fac=function(g){return new(g||v)},v.\u0275cmp=r.Xpm({type:v,selectors:[["app-navegator"]],inputs:{controlePaginas:["controle","controlePaginas"]},outputs:{change:"changePage"},decls:15,vars:1,consts:[[1,"pagina"],["mat-icon-button","","aria-label","Example icon-button with share icon","matTooltip","In\xedcio","matTooltipPosition","above",1,"mat-icon-button",3,"click"],["mat-icon-button","","aria-label","Example icon-button with share icon","matTooltip","Voltar","matTooltipPosition","above",1,"mat-icon-button",3,"click"],["mat-icon-button","","aria-label","Example icon-button with share icon","matTooltip","Avan\xe7ar","matTooltipPosition","above",1,"mat-icon-button",3,"click"],["mat-icon-button","","aria-label","Example icon-button with share icon","matTooltip","Final","matTooltipPosition","above",1,"mat-icon-button",3,"click"]],template:function(g,c){1&g&&(r.TgZ(0,"div",0),r.TgZ(1,"button",1),r.NdJ("click",function(){return c.firstPage()}),r.TgZ(2,"mat-icon"),r._uU(3,"first_page"),r.qZA(),r.qZA(),r.TgZ(4,"button",2),r.NdJ("click",function(){return c.forwardPage()}),r.TgZ(5,"mat-icon"),r._uU(6,"chevron_left"),r.qZA(),r.qZA(),r.TgZ(7,"span"),r._uU(8),r.qZA(),r.TgZ(9,"button",3),r.NdJ("click",function(){return c.nextPage()}),r.TgZ(10,"mat-icon"),r._uU(11,"chevron_right"),r.qZA(),r.qZA(),r.TgZ(12,"button",4),r.NdJ("click",function(){return c.lastPage()}),r.TgZ(13,"mat-icon"),r._uU(14,"last_page"),r.qZA(),r.qZA(),r.qZA()),2&g&&(r.xp6(8),r.Oqu(c.getAtual()))},directives:[p.lW,m.gM,d.Hw],styles:[".pagina[_ngcontent-%COMP%]{display:flex;justify-content:center;align-items:center;text-align:center;font-size:inherit;font-weight:inherit;font:inherit}.pagina[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{margin-top:2px}"]}),v})()}}]);