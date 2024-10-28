import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ProdutoModel } from '../models/produto-model';
import { ParametroProduto01 } from '../parametros/parametro-produto01';

@Injectable({
providedIn: 'root',
})
export class ProdutoService 
{
apiURL: string = environment.apiURL;
constructor(private http: HttpClient) {}
	getProdutos(): Observable<ProdutoModel[]> {
		return this.http.get<ProdutoModel[]>(`${this.apiURL}Produtos`);
	}
	getProdutosParametro_01(params: ParametroProduto01): Observable<ProdutoModel[]> {
		return this.http.post<ProdutoModel[]>(`${this.apiURL}produtos`,params);
	}
	getProduto(id_empresa:number,id_filial:number,codigo:number): Observable<ProdutoModel> { 
 		return this.http.get<ProdutoModel >(`${ this.apiURL}produto/${id_empresa}/${id_filial}/${codigo}`);
	}
	produtoInsert(produto:ProdutoModel):Observable<ProdutoModel> { 
		return this.http.post<ProdutoModel>(`${this.apiURL}produto`, produto);
	}
	produtoUpdate(produto:ProdutoModel):Observable<ProdutoModel> { 
		return this.http.put<ProdutoModel>(`${this.apiURL}produto`,produto);
	}
	produtoDelete(id_empresa:number,id_filial:number,codigo:number):Observable<any>  { 
 		return this.http.delete<any>(`${this.apiURL}produto/${id_empresa}/${id_filial}/${codigo}`);
	}
}