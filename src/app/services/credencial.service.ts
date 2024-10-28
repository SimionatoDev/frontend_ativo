import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CredencialModel } from '../models/credencial-model';
import { ParametroCredencial01 } from '../parametros/parametro-credencial01';

@Injectable({
providedIn: 'root',
})
export class CredencialService 
{
apiURL: string = environment.apiURL;
constructor(private http: HttpClient) {}
	getCredenciais(): Observable<CredencialModel[]> {
		return this.http.get<CredencialModel[]>(`${this.apiURL}Credenciais`);
	}
	getCredenciaisParametro_01(params: ParametroCredencial01): Observable<CredencialModel[]> {
		return this.http.post<CredencialModel[]>(`${this.apiURL}credenciais`,params);
	}
	getCredencial(id:number): Observable<CredencialModel> { 
 		return this.http.get<CredencialModel >(`${ this.apiURL}credencial/${id}`);
	}
	credencialInsert(credencial:CredencialModel):Observable<CredencialModel> { 
		return this.http.post<CredencialModel>(`${this.apiURL}credencial`, credencial);
	}
	credencialUpdate(credencial:CredencialModel):Observable<CredencialModel> { 
		return this.http.put<CredencialModel>(`${this.apiURL}credencial`,credencial);
	}
	credencialDelete(id:number):Observable<any>  { 
 		return this.http.delete<any>(`${this.apiURL}credencial/${id}`);
	}
}