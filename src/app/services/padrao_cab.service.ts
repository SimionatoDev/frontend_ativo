import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Padrao_CabModel } from '../models/padrao_cab-model';
import { ParametroPadrao_Cab01 } from '../parametros/parametro-padrao_cab01';

@Injectable({
providedIn: 'root',
})
export class Padrao_CabService
{
apiURL: string = environment.apiURL;
constructor(private http: HttpClient) {}
	getPadroes_Cab(): Observable<Padrao_CabModel[]> {
		return this.http.get<Padrao_CabModel[]>(`${this.apiURL}Padroes_Cab`);
	}
	getPadroes_CabParametro_01(params: ParametroPadrao_Cab01): Observable<Padrao_CabModel[]> {
    console.log("Info buscar os padrões");
		return this.http.post<Padrao_CabModel[]>(`${this.apiURL}padroes_cab`,params);
	}
	getPadrao_Cab(id:number): Observable<Padrao_CabModel> {
 		return this.http.get<Padrao_CabModel >(`${ this.apiURL}padrao_cab/${id}`);
	}
	padrao_cabInsert(padrao_cab:Padrao_CabModel):Observable<Padrao_CabModel> {
		return this.http.post<Padrao_CabModel>(`${this.apiURL}padrao_cab`, padrao_cab);
	}
	padrao_cabUpdate(padrao_cab:Padrao_CabModel):Observable<Padrao_CabModel> {
		return this.http.put<Padrao_CabModel>(`${this.apiURL}padrao_cab`,padrao_cab);
	}
	padrao_cabDelete(id:number):Observable<any>  {
 		return this.http.delete<any>(`${this.apiURL}padrao_cab/${id}`);
	}
}
