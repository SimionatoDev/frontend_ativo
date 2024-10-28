import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PadraoModel } from '../models/padrao-model';
import { ParametroPadrao01 } from '../parametros/parametro-padrao01';

@Injectable({
providedIn: 'root',
})
export class PadraoService 
{
apiURL: string = environment.apiURL;
constructor(private http: HttpClient) {}
	getPadroes(): Observable<PadraoModel[]> {
		return this.http.get<PadraoModel[]>(`${this.apiURL}Padroes`);
	}
	getPadroesParametro_01(params: ParametroPadrao01): Observable<PadraoModel[]> {
		return this.http.post<PadraoModel[]>(`${this.apiURL}padroes`,params);
	}
	getPadrao(id_empresa:number,id_usuario:number): Observable<PadraoModel> { 
 		return this.http.get<PadraoModel >(`${ this.apiURL}padrao/${id_empresa}/${id_usuario}`);
	}
	padraoInsert(padrao:PadraoModel):Observable<PadraoModel> { 
		return this.http.post<PadraoModel>(`${this.apiURL}padrao`, padrao);
	}
	padraoUpdate(padrao:PadraoModel):Observable<PadraoModel> { 
		return this.http.put<PadraoModel>(`${this.apiURL}padrao`,padrao);
	}
	padraoDelete(id_empresa:number,id_usuario:number):Observable<any>  { 
 		return this.http.delete<any>(`${this.apiURL}padrao/${id_empresa}/${id_usuario}`);
	}
}