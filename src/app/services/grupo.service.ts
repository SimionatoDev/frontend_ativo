import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { GrupoModel } from '../models/grupo-model';
import { ParametroGrupo01 } from '../parametros/parametro-grupo01';

@Injectable({
providedIn: 'root',
})
export class GrupoService 
{
apiURL: string = environment.apiURL;
constructor(private http: HttpClient) {}
	getGrupos(): Observable<GrupoModel[]> {
		return this.http.get<GrupoModel[]>(`${this.apiURL}Grupos`);
	}
	getGruposParametro_01(params: ParametroGrupo01): Observable<GrupoModel[]> {
		return this.http.post<GrupoModel[]>(`${this.apiURL}grupos`,params);
	}
	getGrupo(id_empresa:number,id_filial:number,codigo:number): Observable<GrupoModel> { 
 		return this.http.get<GrupoModel >(`${ this.apiURL}grupo/${id_empresa}/${id_filial}/${codigo}`);
	}
	grupoInsert(grupo:GrupoModel):Observable<GrupoModel> { 
		return this.http.post<GrupoModel>(`${this.apiURL}grupo`, grupo);
	}
	grupoUpdate(grupo:GrupoModel):Observable<GrupoModel> { 
		return this.http.put<GrupoModel>(`${this.apiURL}grupo`,grupo);
	}
	grupoDelete(id_empresa:number,id_filial:number,codigo:number):Observable<any>  { 
 		return this.http.delete<any>(`${this.apiURL}grupo/${id_empresa}/${id_filial}/${codigo}`);
	}
}