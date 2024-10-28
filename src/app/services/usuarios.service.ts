import { UsuarioQuery01Model } from './../models/usuario-query_01-model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ParametroUsuario01 } from '../parametros/parametro-usuario01';
import { UsuarioModel } from '../models/usuario-model';
import { UsuarioQuery_03Model } from '../models/usuario-query_03-model';
import { ParametroUsuario03 } from '../parametros/parametro-usuario03';
import { UsuarioQuery_04Model } from '../models/usuario-query_04-model';
import { UsuarioQuery_05Model } from '../models/usuario-query_05-model';
import { AmbienteModel } from '../models/ambiente-model';

@Injectable({
  providedIn: 'root',
})
export class UsuariosService {
  static login: UsuarioModel = new UsuarioModel();

  apiURL: string = environment.apiURL;

  constructor(private http: HttpClient) {}

  getUsuarios(): Observable<UsuarioModel[]> {
    return this.http.get<UsuarioModel[]>(`${this.apiURL}usuarios`);
  }
  getUsuarioInventario(
    params: ParametroUsuario03
  ): Observable<UsuarioQuery_04Model[]> {
    return this.http.post<UsuarioQuery_04Model[]>(
      `${this.apiURL}usuariosinventario`,
      params
    );
  }

  getUsuario(id_empresa: number, id: number): Observable<UsuarioModel> {
    return this.http.get<UsuarioModel>(
      `${this.apiURL}usuario/${id_empresa}/${id}`
    );
  }

  getUsuarioByEmail(
    id_empresa: number,
    email: string
  ): Observable<UsuarioModel> {
    return this.http.get<UsuarioModel>(
      `${this.apiURL}usuariobyemail/${id_empresa}/${email}`
    );
  }

  getusuarios_01(params: ParametroUsuario01): Observable<UsuarioModel[]> {
    return this.http.post<UsuarioModel[]>(`${this.apiURL}usuarios`, params);
  }

  getusuarios_05(
    params: ParametroUsuario01
  ): Observable<UsuarioQuery_05Model[]> {
    return this.http.post<UsuarioQuery_05Model[]>(
      `${this.apiURL}usuariosbyambiente`,
      params
    );
  }

  UsuarioInsert(usuario: UsuarioModel) {
    return this.http.post<UsuarioModel>(`${this.apiURL}usuario/`, usuario);
  }

  UsuarioUpdate(usuario: UsuarioModel) {
    return this.http.put<UsuarioModel>(`${this.apiURL}usuario/`, usuario);
  }

  UsuarioDelete(id_empresa: number, id: number) {
    return this.http.delete<UsuarioModel>(
      `${this.apiURL}usuario/${id_empresa}/${id}`
    );
  }

  Usuariosbyinventario(
    params: ParametroUsuario01
  ): Observable<UsuarioQuery_03Model[]> {
    return this.http.post<UsuarioQuery_03Model[]>(
      `${this.apiURL}usuariosbyinventario`,
      params
    );
  }

  getambiente(
    id_empresa: number,
    id_usuario: number
  ): Observable<AmbienteModel> {
    return this.http.get<AmbienteModel>(
      `${this.apiURL}ambiente/${id_empresa}/${id_usuario}`
    );
  }

  getGruposDiretoria(): number[] {
    return [900];
  }

  getGruposCoordenador(): number[] {
    return [901];
  }

  getGruposAuditor(): number[] {
    return [902];
  }

  getGruposTrainee(): number[] {
    return [903];
  }

  getGruposAdm(): number[] {
    return [904];
  }

  getGruposFinanceiro(): number[] {
    return [905];
  }

  getGruposTi(): number[] {
    return [906];
  }

  isDiretoria(value: number): boolean {
    if (value == 900) return true;

    return false;
  }

  isCoordenador(value: number): boolean {
    if (value == 901) return true;

    return false;
  }

  isAuditor(value: number): boolean {
    if (value == 902) return true;

    return false;
  }

  isTrainee(value: number): boolean {
    if (value == 903) return true;

    return false;
  }

  isAdm(value: number): boolean {
    if (value == 904) return true;

    return false;
  }

  isFinanceiro(value: number): boolean {
    if (value == 905) return true;

    return false;
  }

  isTi(value: number): boolean {
    if (value == 906) return true;

    return false;
  }
}
