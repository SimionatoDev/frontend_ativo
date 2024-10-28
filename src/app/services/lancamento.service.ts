import { ParametroLancamento02 } from './../parametros/parametro-lancamento02';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LancamentoModel } from '../models/lancamento-model';
import { ParametroLancamento01 } from '../parametros/parametro-lancamento01';
import { ParametroLancamentoUsuario } from '../parametros/parametros-lancamento-usuarios';
import { ResumoLancamentosUsuariosModel } from '../models/resumo-lancamentos-usuario-model';
import { EvolucaoModel } from '../models/evolucao-Model';

@Injectable({
  providedIn: 'root',
})
export class LancamentoService {
  apiURL: string = environment.apiURL;
  constructor(private http: HttpClient) {}
  getLancamentos(): Observable<LancamentoModel[]> {
    return this.http.get<LancamentoModel[]>(`${this.apiURL}Lancamentos`);
  }
  getLancamentosParametro_01(
    params: ParametroLancamento01
  ): Observable<LancamentoModel[]> {
    return this.http.post<LancamentoModel[]>(
      `${this.apiURL}lancamentos`,
      params
    );
  }
  getLancamento(
    id_empresa: number,
    id_filial: number,
    id_inventario: number,
    id_imobilizado: number
  ): Observable<LancamentoModel> {
    return this.http.get<LancamentoModel>(
      `${this.apiURL}lancamento/${id_empresa}/${id_filial}/${id_inventario}/${id_imobilizado}`
    );
  }
  lancamentoInsert(lancamento: LancamentoModel): Observable<LancamentoModel> {
    return this.http.post<LancamentoModel>(
      `${this.apiURL}lancamento`,
      lancamento
    );
  }
  lancamentoUpdate(lancamento: LancamentoModel): Observable<LancamentoModel> {
    return this.http.put<LancamentoModel>(
      `${this.apiURL}lancamento`,
      lancamento
    );
  }
  lancamentoDelete(
    id_empresa: number,
    id_filial: number,
    id_inventario: number,
    id_imobilizado: number
  ): Observable<any> {
    return this.http.delete<any>(
      `${this.apiURL}lancamento/${id_empresa}/${id_filial}/${id_inventario}/${id_imobilizado}`
    );
  }

  resumolancamentos(
    params: ParametroLancamentoUsuario
  ): Observable<ResumoLancamentosUsuariosModel[]> {
    return this.http.post<ResumoLancamentosUsuariosModel[]>(
      `${this.apiURL}resumolancamentos`,
      params
    );
  }

  evolucoes(params: ParametroLancamento02): Observable<EvolucaoModel[]> {
    return this.http.post<EvolucaoModel[]>(`${this.apiURL}evolucoes`, params);
  }
}
