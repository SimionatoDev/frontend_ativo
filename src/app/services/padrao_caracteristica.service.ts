import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Padrao_CaracteristicaModel } from '../models/padrao_caracteristica-model';
import { ParametroPadrao_Caracteristica01 } from '../parametros/parametro-padrao_caracteristica01';

@Injectable({
providedIn: 'root',
})
export class Padrao_CaracteristicaService 
{
apiURL: string = environment.apiURL;
constructor(private http: HttpClient) {}
	getPadroes_Caracteristica(): Observable<Padrao_CaracteristicaModel[]> {
		return this.http.get<Padrao_CaracteristicaModel[]>(`${this.apiURL}Padroes_Caracteristica`);
	}
	getPadroes_CaracteristicaParametro_01(params: ParametroPadrao_Caracteristica01): Observable<Padrao_CaracteristicaModel[]> {
		return this.http.post<Padrao_CaracteristicaModel[]>(`${this.apiURL}padroes_caracteristica`,params);
	}
	getPadrao_Caracteristica(id_cab:number,id:number): Observable<Padrao_CaracteristicaModel> { 
 		return this.http.get<Padrao_CaracteristicaModel >(`${ this.apiURL}padrao_caracteristica/${id_cab}/${id}`);
	}
	padrao_caracteristicaInsert(padrao_caracteristica:Padrao_CaracteristicaModel):Observable<Padrao_CaracteristicaModel> { 
		return this.http.post<Padrao_CaracteristicaModel>(`${this.apiURL}padrao_caracteristica`, padrao_caracteristica);
	}
	padrao_caracteristicaUpdate(padrao_caracteristica:Padrao_CaracteristicaModel):Observable<Padrao_CaracteristicaModel> { 
		return this.http.put<Padrao_CaracteristicaModel>(`${this.apiURL}padrao_caracteristica`,padrao_caracteristica);
	}
	padrao_caracteristicaDelete(id_cab:number,id:number):Observable<any>  { 
 		return this.http.delete<any>(`${this.apiURL}padrao_caracteristica/${id_cab}/${id}`);
	}
}