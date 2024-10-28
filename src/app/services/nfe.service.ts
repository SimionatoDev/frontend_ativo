import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { NfeModel } from '../models/nfe-model';
import { ParametroNfe01 } from '../parametros/parametro-nfe01';
import { ParametroNfe02 } from '../parametros/parametro-nfe02';

@Injectable({
  providedIn: 'root',
})
export class NfeService {
  apiURL: string = environment.apiURL;
  constructor(private http: HttpClient) {}
  getNfes(): Observable<NfeModel[]> {
    return this.http.get<NfeModel[]>(`${this.apiURL}Nfes`);
  }
  getNfesParametro_01(params: ParametroNfe01): Observable<NfeModel[]> {
    return this.http.post<NfeModel[]>(`${this.apiURL}nfes`, params);
  }
  getNfe(params: ParametroNfe02): Observable<NfeModel> {
    return this.http.post<NfeModel>(`${this.apiURL}nfegetone`, params);
  }
  getNfeByImobilizado(
    id_empresa: number,
    id_filial: number,
    id_imobilizado: number,
    nfe: string,
    serie: string,
    item: number
  ): Observable<NfeModel[]> {
    return this.http.get<NfeModel[]>(
      `${this.apiURL}nfebyimobilizado/${id_empresa}/${id_filial}/${id_imobilizado}/${nfe}/${serie}/${item}`
    );
  }
  nfeInsert(nfe: NfeModel): Observable<NfeModel> {
    return this.http.post<NfeModel>(`${this.apiURL}nfe`, nfe);
  }
  nfeUpdate(nfe: NfeModel): Observable<NfeModel> {
    return this.http.put<NfeModel>(`${this.apiURL}nfe`, nfe);
  }
  nfeDelete(
    id_empresa: number,
    id_filial: number,
    cnpj_fornecedor: string,
    razao_fornecedor: string,
    id_imobilizado: number,
    nfe: string,
    serie: string,
    item: string
  ): Observable<any> {
    return this.http.delete<any>(
      `${this.apiURL}nfe/${id_empresa}/${id_filial}/${cnpj_fornecedor}/${razao_fornecedor}/${id_imobilizado}/${nfe}/${serie}/${item}`
    );
  }
}
