import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { FornecedorModel } from '../models/fornecedor-model';
import { ParametroFornecedor01 } from '../parametros/parametro-fornecedor01';

@Injectable({
providedIn: 'root',
})
export class FornecedorService 
{
apiURL: string = environment.apiURL;
constructor(private http: HttpClient) {}
	getFornecedores(): Observable<FornecedorModel[]> {
		return this.http.get<FornecedorModel[]>(`${this.apiURL}Fornecedores`);
	}
	getFornecedoresParametro_01(params: ParametroFornecedor01): Observable<FornecedorModel[]> {
		return this.http.post<FornecedorModel[]>(`${this.apiURL}fornecedores`,params);
	}
	getFornecedor(id_empresa:number,id_filial:number,id:number): Observable<FornecedorModel> { 
 		return this.http.get<FornecedorModel >(`${ this.apiURL}fornecedor/${id_empresa}/${id_filial}/${id}`);
	}
	fornecedorInsert(fornecedor:FornecedorModel):Observable<FornecedorModel> { 
		return this.http.post<FornecedorModel>(`${this.apiURL}fornecedor`, fornecedor);
	}
	fornecedorUpdate(fornecedor:FornecedorModel):Observable<FornecedorModel> { 
		return this.http.put<FornecedorModel>(`${this.apiURL}fornecedor`,fornecedor);
	}
	fornecedorDelete(id_empresa:number,id_filial:number,id:number):Observable<any>  { 
 		return this.http.delete<any>(`${this.apiURL}fornecedor/${id_empresa}/${id_filial}/${id}`);
	}
}