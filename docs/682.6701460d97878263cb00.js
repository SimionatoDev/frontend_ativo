"use strict";(self.webpackChunkinventario=self.webpackChunkinventario||[]).push([[682],{9682:(y,l,i)=>{i.r(l),i.d(l,{SobreModule:()=>B});var c=i(8583),u=i(4655);class g{constructor(){this.Origem="",this.Armazenamento_total=0,this.Armazenamento_usado=0,this.Armazenamento_restante=0}}class m{constructor(){this.id_empresa=0,this.id_local=0,this.id_inventario=0,this.key=""}}var s=i(2340),e=i(7716),p=i(789),d=i(3317),v=i(1841);let S=(()=>{class o{constructor(t){this.http=t,this.apiURLOauth=s.N.apiOAuth2,this.apiURL=s.N.apiURL}getoauth2(){return this.http.get(`${this.apiURLOauth}auth/google`)}getDiscoFreeCrendencials(t){return this.http.post(`${this.apiURL}discofreev1`,t)}getDiscoFreeOauth20(){return this.http.get(`${this.apiURL}freedisco`)}}return o.\u0275fac=function(t){return new(t||o)(e.LFG(v.eN))},o.\u0275prov=e.Yz7({token:o,factory:o.\u0275fac,providedIn:"root"}),o})();var Z=i(2522),A=i(8295),b=i(1095),f=i(6627);function T(o,r){if(1&o&&(e.TgZ(0,"tr"),e.TgZ(1,"td"),e.TgZ(2,"div"),e.TgZ(3,"mat-label",8),e._uU(4),e.qZA(),e.qZA(),e.qZA(),e.TgZ(5,"td"),e.TgZ(6,"div",9),e.TgZ(7,"mat-label",8),e._uU(8),e.qZA(),e.qZA(),e.qZA(),e.TgZ(9,"td"),e.TgZ(10,"div",9),e.TgZ(11,"mat-label",8),e._uU(12),e.qZA(),e.qZA(),e.qZA(),e.TgZ(13,"td"),e.TgZ(14,"div",9),e.TgZ(15,"mat-label",8),e._uU(16),e.qZA(),e.qZA(),e.qZA(),e.qZA()),2&o){const t=r.$implicit;e.xp6(4),e.Oqu(t.Origem),e.xp6(4),e.Oqu(t.Armazenamento_total),e.xp6(4),e.Oqu(t.Armazenamento_usado),e.xp6(4),e.Oqu(t.Armazenamento_restante)}}const O=[{path:"",redirectTo:"oauth2",pathMatch:"full"},{path:"oauth2",component:(()=>{class o{constructor(t,a,n){this.appSnackBar=t,this.globalService=a,this.googleService=n,this.apiURLOauth2=s.N.apiOAuth2,this.discoSpace=[]}ngOnInit(){this.getSpacecrendeciails()}ngOnDestroy(){var t,a;null===(t=this.inscricaoOauth)||void 0===t||t.unsubscribe(),null===(a=this.inscricaoSpace)||void 0===a||a.unsubscribe()}onSubmit(){window.location.href=`${this.apiURLOauth2}auth/google`}onCancel(){}getOAuth2(){this.globalService.setSpin(!0),this.inscricaoOauth=this.googleService.getoauth2().subscribe(t=>{this.globalService.setSpin(!1),this.appSnackBar.openFailureSnackBar("Deu Certo ","OK")},t=>{this.globalService.setSpin(!1),this.appSnackBar.openFailureSnackBar(`Deu Erro ${t.error.tabela} - ${t.error.erro} - ${t.error.message}`,"OK")})}getSpacecrendeciails(){var t=new m;t.id_empresa=this.globalService.getEmpresa().id,t.id_local=this.globalService.getLocal().id,t.id_inventario=this.globalService.getInventario().codigo,t.key="copperstill",this.globalService.setSpin(!0),this.inscricaoOauth=this.googleService.getDiscoFreeCrendencials(t).subscribe(a=>{this.globalService.setSpin(!1);let n=new g;n.Origem="Crendencials",n.Armazenamento_total=a.space.Armazenamento_total,n.Armazenamento_usado=a.space.Armazenamento_usado,n.Armazenamento_restante=a.space.Armazenamento_restante,this.discoSpace.push(n),this.getSpaceOAuth20()},a=>{this.globalService.setSpin(!1),this.appSnackBar.openFailureSnackBar(`Deu Erro ${a.error.tabela} - ${a.error.erro} - ${a.error.message}`,"OK")})}getSpaceOAuth20(){this.globalService.setSpin(!0),this.inscricaoOauth=this.googleService.getDiscoFreeOauth20().subscribe(t=>{this.globalService.setSpin(!1);let a=new g;a.Origem=t.origem,a.Armazenamento_total=t.total,a.Armazenamento_usado=t.usado,a.Armazenamento_restante=t.free,this.discoSpace.push(a)},t=>{this.globalService.setSpin(!1),this.appSnackBar.openFailureSnackBar(`Deu Erro ${t.error.tabela} - ${t.error.erro} - ${t.error.message}`,"OK")})}}return o.\u0275fac=function(t){return new(t||o)(e.Y36(p.W),e.Y36(d.U),e.Y36(S))},o.\u0275cmp=e.Xpm({type:o,selectors:[["app-googleoauth2"]],decls:26,vars:1,consts:[[1,"div-barra"],[1,"example-spacer"],[1,"button-container-right"],["mat-raised-button","","color","primary",3,"click"],["mat-raised-button","","color","accent",3,"click"],[1,"Browse_Lanc"],[1,"coluna-cabec"],[4,"ngFor","ngForOf"],[1,"Browse_Lanc_td"],[1,"alinha_centro"]],template:function(t,a){1&t&&(e.TgZ(0,"div",0),e.TgZ(1,"mat-toolbar"),e.TgZ(2,"span",1),e.TgZ(3,"mat-label"),e._uU(4,"Autentica\xe7\xe3o Google"),e.qZA(),e.qZA(),e.TgZ(5,"div",2),e.TgZ(6,"button",3),e.NdJ("click",function(){return a.onSubmit()}),e.TgZ(7,"mat-icon"),e._uU(8,"check"),e.qZA(),e._uU(9," Autenticar "),e.qZA(),e.TgZ(10,"button",4),e.NdJ("click",function(){return a.onCancel()}),e.TgZ(11,"mat-icon"),e._uU(12,"cancel"),e.qZA(),e._uU(13," Voltar "),e.qZA(),e.qZA(),e.qZA(),e.qZA(),e.TgZ(14,"div"),e.TgZ(15,"table",5),e.TgZ(16,"tr",6),e.TgZ(17,"th"),e._uU(18,"ORIGEM"),e.qZA(),e.TgZ(19,"th"),e._uU(20,"TOTAL"),e.qZA(),e.TgZ(21,"th"),e._uU(22,"USADO"),e.qZA(),e.TgZ(23,"th"),e._uU(24,"FREE"),e.qZA(),e.qZA(),e.YNc(25,T,17,4,"tr",7),e.qZA(),e.qZA()),2&t&&(e.xp6(25),e.Q6J("ngForOf",a.discoSpace))},directives:[Z.Ye,A.hX,b.lW,f.Hw,c.sg],styles:[""]}),o})()}];let U=(()=>{class o{}return o.\u0275fac=function(t){return new(t||o)},o.\u0275mod=e.oAB({type:o}),o.\u0275inj=e.cJS({imports:[[u.Bz.forChild(O)],u.Bz]}),o})();var C=i(4307),z=i(9243),h=i(3679),F=i(8981),q=i(4466);let B=(()=>{class o{}return o.\u0275fac=function(t){return new(t||o)},o.\u0275mod=e.oAB({type:o}),o.\u0275inj=e.cJS({imports:[[c.ez,U,C.q,z.Cl,h.u5,h.UX,q.m,F.yI.forChild()]]}),o})()}}]);