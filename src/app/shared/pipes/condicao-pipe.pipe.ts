import { Pipe, PipeTransform } from '@angular/core';
import { GlobalService } from 'src/app/services/global.service';

@Pipe({
  name: 'condicaopipe'
})
export class CondicaoPipePipe implements PipeTransform {

  constructor(private globalService: GlobalService) {}

  transform(value: number): string {
    const cond = this.globalService
      .getCondicoes()
      .findIndex((cond) => cond.idx == value);
    if ((cond > 0) && (cond < 9))
      return this.globalService.getCondicoes()[cond].descricao;
    return '';
  }

}
