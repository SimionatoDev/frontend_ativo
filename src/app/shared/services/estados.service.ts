import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, observable, Subscription } from 'rxjs';
import { EstadoModel } from 'src/app/Models/estado-model';

@Injectable({
  providedIn: 'root',
})
export class EstadosService {
  estados: EstadoModel[] = [];

  constructor(private http: HttpClient) {}

  getEstados(): Observable<EstadoModel[]> {
    return this.http.get<EstadoModel[]>('assets/dados/estadosbr.json');
  }
}
