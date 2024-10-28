import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CentrocustoModel } from '../models/centrocusto-model';
import { ParametroCentrocusto01 } from '../parametros/parametro-centrocusto01';

@Injectable({
providedIn: 'root',
})
export class CentrocustoService 
{
apiURL: string = environment.apiURL;
constructor(private http: HttpClient) {}
	getCentroscustos(): Observable<CentrocustoModel[]> {
		return this.http.get<CentrocustoModel[]>(`${this.apiURL}Centroscustos`);
	}
	getCentroscustosParametro_01(params: ParametroCentrocusto01): Observable<CentrocustoModel[]> {
		return this.http.post<CentrocustoModel[]>(`${this.apiURL}centroscustos`,params);
	}
	getCentrocusto(id_empresa:number,id_filial:number,codigo:string): Observable<CentrocustoModel> { 
 		return this.http.get<CentrocustoModel >(`${ this.apiURL}centrocusto/${id_empresa}/${id_filial}/${codigo}`);
	}
	centrocustoInsert(centrocusto:CentrocustoModel):Observable<CentrocustoModel> { 
		return this.http.post<CentrocustoModel>(`${this.apiURL}centrocusto`, centrocusto);
	}
	centrocustoUpdate(centrocusto:CentrocustoModel):Observable<CentrocustoModel> { 
		return this.http.put<CentrocustoModel>(`${this.apiURL}centrocusto`,centrocusto);
	}
	centrocustoDelete(id_empresa:number,id_filial:number,codigo:string):Observable<any>  { 
 		return this.http.delete<any>(`${this.apiURL}centrocusto/${id_empresa}/${id_filial}/${codigo}`);
	}
}