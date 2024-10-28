import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PrincipalModel } from '../models/principal-model';
import { ParametroPrincipal01 } from '../parametros/parametro-principal01';

@Injectable({
providedIn: 'root',
})
export class PrincipalService 
{
apiURL: string = environment.apiURL;
constructor(private http: HttpClient) {}
	getPrincipais(): Observable<PrincipalModel[]> {
		return this.http.get<PrincipalModel[]>(`${this.apiURL}Principais`);
	}
	getPrincipaisParametro_01(params: ParametroPrincipal01): Observable<PrincipalModel[]> {
		return this.http.post<PrincipalModel[]>(`${this.apiURL}principais`,params);
	}
	getPrincipal(id_empresa:number,id_filial:number,codigo:number): Observable<PrincipalModel> { 
 		return this.http.get<PrincipalModel >(`${ this.apiURL}principal/${id_empresa}/${id_filial}/${codigo}`);
	}
	principalInsert(principal:PrincipalModel):Observable<PrincipalModel> { 
		return this.http.post<PrincipalModel>(`${this.apiURL}principal`, principal);
	}
	principalUpdate(principal:PrincipalModel):Observable<PrincipalModel> { 
		return this.http.put<PrincipalModel>(`${this.apiURL}principal`,principal);
	}
	principalDelete(id_empresa:number,id_filial:number,codigo:number):Observable<any>  { 
 		return this.http.delete<any>(`${this.apiURL}principal/${id_empresa}/${id_filial}/${codigo}`);
	}
}