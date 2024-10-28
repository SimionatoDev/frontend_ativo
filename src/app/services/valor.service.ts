import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ValorModel } from '../models/valor-model';
import { ParametroValor01 } from '../parametros/parametro-valor01';

@Injectable({
providedIn: 'root',
})
export class ValorService 
{
apiURL: string = environment.apiURL;
constructor(private http: HttpClient) {}
	getValores(): Observable<ValorModel[]> {
		return this.http.get<ValorModel[]>(`${this.apiURL}Valores`);
	}
	getValoresParametro_01(params: ParametroValor01): Observable<ValorModel[]> {
		return this.http.post<ValorModel[]>(`${this.apiURL}valores`,params);
	}
	getValor(id_empresa:number,id_filial:number,id_imobilizado:number): Observable<ValorModel> { 
 		return this.http.get<ValorModel >(`${ this.apiURL}valor/${id_empresa}/${id_filial}/${id_imobilizado}`);
	}
	valorInsert(valor:ValorModel):Observable<ValorModel> { 
		return this.http.post<ValorModel>(`${this.apiURL}valor`, valor);
	}
	valorUpdate(valor:ValorModel):Observable<ValorModel> { 
		return this.http.put<ValorModel>(`${this.apiURL}valor`,valor);
	}
	valorDelete(id_empresa:number,id_filial:number,id_imobilizado:number):Observable<any>  { 
 		return this.http.delete<any>(`${this.apiURL}valor/${id_empresa}/${id_filial}/${id_imobilizado}`);
	}
}