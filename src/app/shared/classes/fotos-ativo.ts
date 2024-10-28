import { FotoModel } from "src/app/models/foto-model";

export class FotosAtivo {
  public idx: number = 0;
  public fotos: FotoModel[] = [];

  constructor(idx: number, fotos: FotoModel[]) {
    this.idx = idx;
    this.fotos = fotos;
  }
}
