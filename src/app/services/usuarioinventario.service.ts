import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UsuarioinventarioModel } from '../models/usuarioinventario-model';
import { ParametroUsuarioinventario01 } from '../parametros/parametro-usuarioinventario01';
import { ParametroLanca_usuario } from '../parametros/parametro-lanca_usuario';

@Injectable({
  providedIn: 'root',
})
export class UsuarioinventarioService {
  apiURL: string = environment.apiURL;
  constructor(private http: HttpClient) {}
  getUsuariosinventarios(): Observable<UsuarioinventarioModel[]> {
    return this.http.get<UsuarioinventarioModel[]>(
      `${this.apiURL}Usuariosinventarios`
    );
  }
  getUsuariosinventariosParametro_01(
    params: ParametroUsuarioinventario01
  ): Observable<UsuarioinventarioModel[]> {
    return this.http.post<UsuarioinventarioModel[]>(
      `${this.apiURL}usuariosinventarios`,
      params
    );
  }
  getUsuarioinventario(
    id_empresa: number,
    id_filial: number,
    id_inventario: number,
    id_usuario: number
  ): Observable<UsuarioinventarioModel> {
    return this.http.get<UsuarioinventarioModel>(
      `${this.apiURL}usuarioinventario/${id_empresa}/${id_filial}/${id_inventario}/${id_usuario}`
    );
  }
  usuarioinventarioInsert(
    usuarioinventario: UsuarioinventarioModel
  ): Observable<UsuarioinventarioModel> {
    return this.http.post<UsuarioinventarioModel>(
      `${this.apiURL}usuarioinventario`,
      usuarioinventario
    );
  }
  usuarioinventarioMulti(params: ParametroLanca_usuario[]): Observable<any> {
    return this.http.post<any>(`${this.apiURL}multlanca`, params);
  }
  usuarioinventarioUpdate(
    usuarioinventario: UsuarioinventarioModel
  ): Observable<UsuarioinventarioModel> {
    return this.http.put<UsuarioinventarioModel>(
      `${this.apiURL}usuarioinventario`,
      usuarioinventario
    );
  }
  usuarioinventarioDelete(
    id_empresa: number,
    id_filial: number,
    id_inventario: number,
    id_usuario: number
  ): Observable<any> {
    return this.http.delete<any>(
      `${this.apiURL}usuarioinventario/${id_empresa}/${id_filial}/${id_inventario}/${id_usuario}`
    );
  }
}
