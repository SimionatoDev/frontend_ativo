import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'embrancopipe',
})
export class EmBrancoPipe implements PipeTransform {
  transform(value: string): string {
    if (value.trim() == '') return 'EM BRANCO';
    return value.trim();
  }
}
