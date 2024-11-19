import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Padrao_SugestaoModel } from '../models/padrao_sugestao-model';
import { ParametroPadrao_Sugestao01 } from '../parametros/parametro-padrao_sugestao01';

@Injectable({
providedIn: 'root',
})
export class Padrao_SugestaoService 
{
apiURL: string = environment.apiURL;
constructor(private http: HttpClient) {}
	getPadroes_Sugestoes(): Observable<Padrao_SugestaoModel[]> {
		return this.http.get<Padrao_SugestaoModel[]>(`${this.apiURL}Padroes_Sugestoes`);
	}
	getPadroes_SugestoesParametro_01(params: ParametroPadrao_Sugestao01): Observable<Padrao_SugestaoModel[]> {
		return this.http.post<Padrao_SugestaoModel[]>(`${this.apiURL}padroes_sugestoes`,params);
	}
	getPadrao_Sugestao(id_cab:number,id_caract:number,id:number): Observable<Padrao_SugestaoModel> { 
 		return this.http.get<Padrao_SugestaoModel >(`${ this.apiURL}padrao_sugestao/${id_cab}/${id_caract}/${id}`);
	}
	padrao_sugestaoInsert(padrao_sugestao:Padrao_SugestaoModel):Observable<Padrao_SugestaoModel> { 
		return this.http.post<Padrao_SugestaoModel>(`${this.apiURL}padrao_sugestao`, padrao_sugestao);
	}
	padrao_sugestaoUpdate(padrao_sugestao:Padrao_SugestaoModel):Observable<Padrao_SugestaoModel> { 
		return this.http.put<Padrao_SugestaoModel>(`${this.apiURL}padrao_sugestao`,padrao_sugestao);
	}
	padrao_sugestaoDelete(id_cab:number,id_caract:number,id:number):Observable<any>  { 
 		return this.http.delete<any>(`${this.apiURL}padrao_sugestao/${id_cab}/${id_caract}/${id}`);
	}
}