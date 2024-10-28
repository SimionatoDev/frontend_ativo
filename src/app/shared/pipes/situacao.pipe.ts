import { Pipe, PipeTransform } from '@angular/core';
import { GlobalService } from 'src/app/services/global.service';

@Pipe({
  name: 'situacao',
})
export class SituacaoPipe implements PipeTransform {
  constructor(private globalService: GlobalService) {}
  transform(value: number): string {
    const sit = this.globalService
      .getSituacoesInventario()
      .findIndex((st) => st.id == value);
    if (sit >= 0)
      return this.globalService.getSituacoesInventario()[sit].descricao;
    return '';
  }
}
