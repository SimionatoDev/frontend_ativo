import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { InventarioModel } from '../models/inventario-model';
import { ParametroInventario01 } from '../parametros/parametro-inventario01';
import { ParametroResumoInventario } from '../parametros/parametro-resumo-inventario';
import { ResumoInventarioModel } from '../models/resumo-inventario-model';

@Injectable({
  providedIn: 'root',
})
export class InventarioService {
  apiURL: string = environment.apiURL;
  constructor(private http: HttpClient) {}
  getInventarios(): Observable<InventarioModel[]> {
    return this.http.get<InventarioModel[]>(`${this.apiURL}Inventarios`);
  }
  getInventariosParametro_01(
    params: ParametroInventario01
  ): Observable<InventarioModel[]> {
    return this.http.post<InventarioModel[]>(
      `${this.apiURL}inventarios`,
      params
    );
  }
  getInventario(
    id_empresa: number,
    id_filial: number,
    codigo: number
  ): Observable<InventarioModel> {
    return this.http.get<InventarioModel>(
      `${this.apiURL}inventario/${id_empresa}/${id_filial}/${codigo}`
    );
  }
  inventarioInsert(inventario: InventarioModel): Observable<InventarioModel> {
    return this.http.post<InventarioModel>(
      `${this.apiURL}inventario`,
      inventario
    );
  }
  inventarioUpdate(inventario: InventarioModel): Observable<InventarioModel> {
    return this.http.put<InventarioModel>(
      `${this.apiURL}inventario`,
      inventario
    );
  }
  inventarioDelete(
    id_empresa: number,
    id_filial: number,
    codigo: number
  ): Observable<any> {
    return this.http.delete<any>(
      `${this.apiURL}inventario/${id_empresa}/${id_filial}/${codigo}`
    );
  }

  resumoInventario(
    id_empresa: number,
    id_filial: number,
    codigo: number
  ): Observable<ResumoInventarioModel> {
    return this.http.get<ResumoInventarioModel>(
      `${this.apiURL}resumo/${id_empresa}/${id_filial}/${codigo}`
    );
  }
}
