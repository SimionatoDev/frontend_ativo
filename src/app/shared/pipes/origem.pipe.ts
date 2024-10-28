import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'origem',
})
export class OrigemPipe implements PipeTransform {
  transform(value: string): string {
    let retorno: string = 'P';
    switch (value) {
      case 'M':
        retorno = 'Manual';
        break;
      case 'P':
        retorno = 'Planilha';
        break;
      default:
        retorno = 'Manual';
        break;
    }
    return retorno;
  }
}
