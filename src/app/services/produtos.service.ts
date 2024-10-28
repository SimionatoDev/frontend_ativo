import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ParametroProduto01 } from '../parametros/parametro-produto01';
import { Observable } from 'rxjs';
import { ProdutoModel } from '../models/produtoModel';

@Injectable({
  providedIn: 'root',
})
export class ProdutosService {
  apiURL: string = environment.apiURL;
  constructor(private http: HttpClient) {}

  getProdutos_01(params: ParametroProduto01): Observable<ProdutoModel[]> {
    return this.http.post<ProdutoModel[]>(`${this.apiURL}produtos`, params);
  }

  getProduto(id_empresa: number, id_inventario: number, codigo: string) {
    return this.http.get<ProdutoModel>(
      `${this.apiURL}produto/${id_empresa}/${id_inventario}/${codigo}`
    );
  }

  ProdutoInsert(Produto: any) {
    return this.http.post<ProdutoModel>(`${this.apiURL}produto`, Produto);
  }

  ProdutoUpdate(Produto: ProdutoModel) {
    return this.http.put<ProdutoModel>(`${this.apiURL}produto`, Produto);
  }

  ProdutoDelete(id_empresa: number, id_inventario: number, codigo: string) {
    return this.http.delete<ProdutoModel>(
      `${this.apiURL}produto/${id_empresa}/${id_inventario}/${codigo}`
    );
  }
}
