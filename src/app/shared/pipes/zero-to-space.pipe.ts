import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'zerotospacepipe',
})
export class ZeroToSpacePipe implements PipeTransform {
  transform(value: number): string {
    if (value == 0) return '';
    return value.toString();
  }
}
