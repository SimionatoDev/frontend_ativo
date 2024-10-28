import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ImobilizadoinventarioModel } from '../models/imobilizadoinventario-model';
import { ParametroImobilizadoinventario01 } from '../parametros/parametro-imobilizadoinventario01';
import { ParametroAnexarProduto } from '../parametros/parametro-anexar-produto';
import { ImobilizadoinventarioFotoModel } from '../models/ImobilizadoinventarioFotoModel';

@Injectable({
  providedIn: 'root',
})
export class ImobilizadoinventarioService {
  apiURL: string = environment.apiURL;
  constructor(private http: HttpClient) {}
  getImobilizadosinventarios(): Observable<ImobilizadoinventarioModel[]> {
    return this.http.get<ImobilizadoinventarioModel[]>(
      `${this.apiURL}Imobilizadosinventarios`
    );
  }
  getImobilizadosinventariosParametro_01(
    params: ParametroImobilizadoinventario01
  ): Observable<ImobilizadoinventarioModel[]> {
    return this.http.post<ImobilizadoinventarioModel[]>(
      `${this.apiURL}imobilizadosinventarios`,
      params
    );
  }
  getImobilizadosinventariosFotos(
    params: ParametroImobilizadoinventario01
  ): Observable<ImobilizadoinventarioModel[]> {
    return this.http.post<ImobilizadoinventarioModel[]>(
      `${this.apiURL}imobilizadosinventariosfotos`,
      params
    );
  }
  getImobilizadoinventario(
    id_empresa: number,
    id_filial: number,
    id_inventario: number,
    id_imobilizado: number
  ): Observable<ImobilizadoinventarioModel> {
    return this.http.get<ImobilizadoinventarioModel>(
      `${this.apiURL}imobilizadoinventario/${id_empresa}/${id_filial}/${id_inventario}/${id_imobilizado}`
    );
  }
  imobilizadoinventarioInsert(
    imobilizadoinventario: ImobilizadoinventarioModel
  ): Observable<ImobilizadoinventarioModel> {
    return this.http.post<ImobilizadoinventarioModel>(
      `${this.apiURL}imobilizadoinventario`,
      imobilizadoinventario
    );
  }

  imobilizadoinventarioUpdate(
    imobilizadoinventario: ImobilizadoinventarioModel
  ): Observable<ImobilizadoinventarioModel> {
    return this.http.put<ImobilizadoinventarioModel>(
      `${this.apiURL}imobilizadoinventario`,
      imobilizadoinventario
    );
  }
  imobilizadoinventarioDelete(
    id_empresa: number,
    id_filial: number,
    id_inventario: number,
    id_imobilizado: number
  ): Observable<any> {
    return this.http.delete<any>(
      `${this.apiURL}imobilizadoinventario/${id_empresa}/${id_filial}/${id_inventario}/${id_imobilizado}`
    );
  }

  anexarProdutoInventario(params: ParametroAnexarProduto): Observable<any> {
    return this.http.post<any>(`${this.apiURL}anexarprodutoinventario`, params);
  }

  getExcelv2(params: ParametroImobilizadoinventario01): Observable<any> {
    return this.http.post<any>(`${this.apiURL}imobilizadosinventariosexcelv2`, params);
  }
}
