import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ParametroComplemento01 } from '../parametros/parametro-complemento01';
import { Observable } from 'rxjs';
import { ComplementoModel } from '../models/complementoModel';

@Injectable({
  providedIn: 'root',
})
export class ComplementosService {
  apiURL: string = environment.apiURL;
  constructor(private http: HttpClient) {}

  getComplementos_01(
    params: ParametroComplemento01
  ): Observable<ComplementoModel[]> {
    return this.http.post<ComplementoModel[]>(
      `${this.apiURL}complementos`,
      params
    );
  }

  getComplemento(
    id_empresa: number,
    id_inventario: number,
    codigo: string,
    local: string,
    lote: string
  ) {
    return this.http.get<ComplementoModel>(
      `${this.apiURL}complemento/${id_empresa}/${id_inventario}/${codigo}/${local}/${lote}`
    );
  }

  ComplementoInsert(Complemento: ComplementoModel) {
    console.log('Front End', Complemento);
    return this.http.post<ComplementoModel>(
      `${this.apiURL}complemento`,
      Complemento
    );
  }

  ComplementoUpdate(Complemento: ComplementoModel) {
    return this.http.put<ComplementoModel>(
      `${this.apiURL}complemento`,
      Complemento
    );
  }

  ComplementoDelete(
    id_empresa: number,
    id_inventario: number,
    codigo: string,
    local: string,
    lote: string
  ) {
    return this.http.delete<ComplementoModel>(
      `${this.apiURL}complemento/${id_empresa}/${id_inventario}/${codigo}/${local}/${lote}`
    );
  }
}
