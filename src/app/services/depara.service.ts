import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { DeParaModel } from '../models/de-para-model';
import { Observable } from 'rxjs';
import { ParametroSubstituirAtivo } from '../parametros/parametro-substituir-ativo';

@Injectable({
  providedIn: 'root'
})
export class DeparaService {

  apiURL: string = environment.apiURL;
constructor(private http: HttpClient) { }


deparaInsert(depara:DeParaModel):Observable<DeParaModel> {
  return this.http.post<DeParaModel>(`${this.apiURL}de_para`, depara);
}
deparaUpdate(depara:DeParaModel):Observable<DeParaModel> {
  return this.http.put<DeParaModel>(`${this.apiURL}de_para`,depara);
}

substituirAtivo(params:ParametroSubstituirAtivo):Observable<any> {
  return this.http.post<any>(`${this.apiURL}substituirativo`,params);
}

}
