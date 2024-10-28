import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { users_inventarioModel } from '../models/users_inventarioModel';
import { ParametroProduto01 } from '../parametros/parametro-produto01';
import { UserInventario01 } from '../parametros/parametro-UserInventario01';
import { ParametroUsuario02 } from '../parametros/parametro-usuario02';

@Injectable({
  providedIn: 'root',
})
export class UserInventarioService {
  apiURL: string = environment.apiURL;
  constructor(private http: HttpClient) {}

  getUserInventario_01(
    params: UserInventario01
  ): Observable<users_inventarioModel[]> {
    return this.http.post<users_inventarioModel[]>(
      `${this.apiURL}users_inventario`,
      params
    );
  }

  getUserInventario(
    id_empresa: number,
    id_inventario: number,
    id_usuario: string
  ) {
    return this.http.get<users_inventarioModel>(
      `${this.apiURL}user_inventario/${id_empresa}/${id_inventario}/${id_usuario}`
    );
  }

  UserInventarioInsert(UserInventario: any) {
    return this.http.post<users_inventarioModel>(
      `${this.apiURL}user_inventario`,
      UserInventario
    );
  }

  UserInventarioUpdate(UserInventario: users_inventarioModel) {
    return this.http.put<users_inventarioModel>(
      `${this.apiURL}user_inventario`,
      UserInventario
    );
  }

  UserInventarioDelete(
    id_empresa: number,
    id_inventario: number,
    id_usuario: string
  ) {
    return this.http.delete<users_inventarioModel>(
      `${this.apiURL}user_inventario/${id_empresa}/${id_inventario}/${id_usuario}`
    );
  }

  UserInventarioSelecao(lista: ParametroUsuario02[]): Observable<any> {
    return this.http.post<any>(`${this.apiURL}user_inventario_selecao`, lista);
  }
}
