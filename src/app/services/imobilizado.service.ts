import { GlobalService } from 'src/app/services/global.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ImobilizadoModel } from '../models/imobilizado-model';
import { ParametroImobilizado01 } from '../parametros/parametro-imobilizado01';

@Injectable({
  providedIn: 'root',
})
export class ImobilizadoService {
  apiURL: string = environment.apiURL;
  constructor(private http: HttpClient, private globalService: GlobalService) {}

  getImobilizados(): Observable<ImobilizadoModel[]> {
    return this.http.get<ImobilizadoModel[]>(`${this.apiURL}Imobilizados`);
  }
  getImobilizadosParametro_01(
    params: ParametroImobilizado01
  ): Observable<ImobilizadoModel[]> {
    return this.http.post<ImobilizadoModel[]>(
      `${this.apiURL}imobilizados`,
      params
    );
  }
  getImobilizado(
    id_empresa: number,
    id_filial: number,
    codigo: number
  ): Observable<ImobilizadoModel> {
    return this.http.get<ImobilizadoModel>(
      `${this.apiURL}imobilizado/${id_empresa}/${id_filial}/${codigo}`
    );
  }
  imobilizadoInsert(
    imobilizado: ImobilizadoModel
  ): Observable<ImobilizadoModel> {
    return this.http.post<ImobilizadoModel>(
      `${this.apiURL}imobilizado`,
      imobilizado
    );
  }
  imobilizadoInsertInv(
    imobilizado: ImobilizadoModel
  ): Observable<ImobilizadoModel> {
    const params = new HttpParams().append(
      'inventario',
      this.globalService.getInventario().codigo
    );

    return this.http.post<ImobilizadoModel>(
      `${this.apiURL}imobilizado_inv`,
      imobilizado,
      {
        params: params,
      }
    );
  }
  imobilizadoUpdate(
    imobilizado: ImobilizadoModel
  ): Observable<ImobilizadoModel> {
    return this.http.put<ImobilizadoModel>(
      `${this.apiURL}imobilizado`,
      imobilizado
    );
  }
  imobilizadoDelete(
    id_empresa: number,
    id_filial: number,
    codigo: number
  ): Observable<any> {
    return this.http.delete<any>(
      `${this.apiURL}imobilizado/${id_empresa}/${id_filial}/${codigo}`
    );
  }
}
