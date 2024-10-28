import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ParametroDownloadfile } from '../parametros/parametro-downloadfile';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  apiURL: string = environment.apiURL;

  constructor(private http: HttpClient) {}

  downLoadFile(params: ParametroDownloadfile): Observable<any> {
		return this.http.post<any>(`${this.apiURL}downloadfile`,params);
	}

  urlDowLoad(params: ParametroDownloadfile):string{
    const arquivo = params.fileName;
    return `${this.apiURL}downloadfile/${arquivo}`;
  }

}
