import { Injectable } from '@angular/core';
import { ParametroModel } from '../models/parametro-model';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

private storage!: Storage;

constructor() {
  this.storage = window.localStorage;
 }

setParametroModel(key: string, param: ParametroModel): void {
  this.storage.setItem(key, JSON.stringify(param));
}

getParametroModel(key: string): ParametroModel | null {
  const item = this.storage.getItem(key);
  return item ? JSON.parse(item) : null;
}

removeItem(key: string): void {
  this.storage.removeItem(key);
}

setNumber(key: string, value: number): void {
  localStorage.setItem(key, value.toString());
}

getNumber(key: string): number | null {
  const value = localStorage.getItem(key);
  return value ? Number(value) : null;
}
clear(): void {
  this.storage.clear();
}

}
