import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Padroes_SugestaoModel } from '../models/padroes_sugestao-model';
import { ParametroPadroes_Sugestao01 } from '../parametros/parametro-padroes_sugestao01';

@Injectable({
providedIn: 'root',
})
export class Padroes_SugestaoService 
{
apiURL: string = environment.apiURL;
constructor(private http: HttpClient) {}
	getPadroes_Sugestoes(): Observable<Padroes_SugestaoModel[]> {
		return this.http.get<Padroes_SugestaoModel[]>(`${this.apiURL}Padroes_Sugestoes`);
	}
	getPadroes_SugestoesParametro_01(params: ParametroPadroes_Sugestao01): Observable<Padroes_SugestaoModel[]> {
		return this.http.post<Padroes_SugestaoModel[]>(`${this.apiURL}padroes_sugestoes`,params);
	}
	getPadroes_Sugestao(id_empresa:number,id_cab:number,id_caract:number,id:number): Observable<Padroes_SugestaoModel> { 
 		return this.http.get<Padroes_SugestaoModel >(`${ this.apiURL}padroes_sugestao/${id_empresa}/${id_cab}/${id_caract}/${id}`);
	}
	padroes_sugestaoInsert(padroes_sugestao:Padroes_SugestaoModel):Observable<Padroes_SugestaoModel> { 
		return this.http.post<Padroes_SugestaoModel>(`${this.apiURL}padroes_sugestao`, padroes_sugestao);
	}
	padroes_sugestaoUpdate(padroes_sugestao:Padroes_SugestaoModel):Observable<Padroes_SugestaoModel> { 
		return this.http.put<Padroes_SugestaoModel>(`${this.apiURL}padroes_sugestao`,padroes_sugestao);
	}
	padroes_sugestaoDelete(id_empresa:number,id_cab:number,id_caract:number,id:number):Observable<any>  { 
 		return this.http.delete<any>(`${this.apiURL}padroes_sugestao/${id_empresa}/${id_cab}/${id_caract}/${id}`);
	}
}