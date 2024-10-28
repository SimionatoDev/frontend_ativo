import { GlobalService } from 'src/app/services/global.service';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'estadoproduto',
})
export class EstadoProdutoPipe implements PipeTransform {
  constructor(private globalService: GlobalService) {}

  transform(value: number): string {
    return this.globalService.getEstado(value);
  }
}
