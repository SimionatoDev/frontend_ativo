import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { FotoModel } from '../models/foto-model';
import { ParametroFoto01 } from '../parametros/parametro-foto01';
import { Injectable } from '@angular/core';
import { ParametroStorageFree_Credencials } from '../parametros/parametro-StorageFree_Credencials';
import { StoreageDiscoModel } from '../models/storeage-disco-model';

@Injectable({
  providedIn: 'root'
})
export class GoogleServiceService {

  apiURLOauth: string = environment.apiOAuth2;
  apiURL: string = environment.apiURL;

  constructor(private http: HttpClient) {}

  getoauth2(): Observable<any> {
		return this.http.get<any>(`${this.apiURLOauth}auth/google`);
	}

  getDiscoFreeCrendencials(params: ParametroStorageFree_Credencials): Observable<StoreageDiscoModel> {
		return this.http.post<any>(`${this.apiURL}discofreev1`,params);
	}

  getDiscoFreeOauth20(): Observable<StoreageDiscoModel> {
		return this.http.get<any>(`${this.apiURL}freedisco`);
	}

}
