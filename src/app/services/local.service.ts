import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LocalModel } from '../models/local-model';
import { ParametroLocal01 } from '../parametros/parametro-local01';

@Injectable({
providedIn: 'root',
})
export class LocalService 
{
apiURL: string = environment.apiURL;
constructor(private http: HttpClient) {}
	getLocais(): Observable<LocalModel[]> {
		return this.http.get<LocalModel[]>(`${this.apiURL}Locais`);
	}
	getLocaisParametro_01(params: ParametroLocal01): Observable<LocalModel[]> {
		return this.http.post<LocalModel[]>(`${this.apiURL}locais`,params);
	}
	getLocal(id_empresa:number,id:number): Observable<LocalModel> { 
 		return this.http.get<LocalModel >(`${ this.apiURL}local/${id_empresa}/${id}`);
	}
	localInsert(local:LocalModel):Observable<LocalModel> { 
		return this.http.post<LocalModel>(`${this.apiURL}local`, local);
	}
	localUpdate(local:LocalModel):Observable<LocalModel> { 
		return this.http.put<LocalModel>(`${this.apiURL}local`,local);
	}
	localDelete(id_empresa:number,id:number):Observable<any>  { 
 		return this.http.delete<any>(`${this.apiURL}local/${id_empresa}/${id}`);
	}
}