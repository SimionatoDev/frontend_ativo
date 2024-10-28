import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { FotoModel } from '../models/foto-model';
import { ParametroFoto01 } from '../parametros/parametro-foto01';

@Injectable({
providedIn: 'root',
})
export class FotoService 
{
apiURL: string = environment.apiURL;
constructor(private http: HttpClient) {}
	getFotos(): Observable<FotoModel[]> {
		return this.http.get<FotoModel[]>(`${this.apiURL}Fotos`);
	}
	getFotosParametro_01(params: ParametroFoto01): Observable<FotoModel[]> {
		return this.http.post<FotoModel[]>(`${this.apiURL}fotos`,params);
	}
	getFoto(id_empresa:number,id_local:number,id_inventario:number,id_imobilizado:number,id_pasta:string,id_file:string,file_name:string): Observable<FotoModel> { 
 		return this.http.get<FotoModel >(`${ this.apiURL}foto/${id_empresa}/${id_local}/${id_inventario}/${id_imobilizado}/${id_pasta}/${id_file}/${file_name}`);
	}
	fotoInsert(foto:FotoModel):Observable<FotoModel> { 
		return this.http.post<FotoModel>(`${this.apiURL}foto`, foto);
	}
	fotoUpdate(foto:FotoModel):Observable<FotoModel> { 
		return this.http.put<FotoModel>(`${this.apiURL}foto`,foto);
	}
	fotoDelete(id_empresa:number,id_local:number,id_inventario:number,id_imobilizado:number,id_pasta:string,id_file:string,file_name:string):Observable<any>  { 
 		return this.http.delete<any>(`${this.apiURL}foto/${id_empresa}/${id_local}/${id_inventario}/${id_imobilizado}/${id_pasta}/${id_file}/${file_name}`);
	}
}