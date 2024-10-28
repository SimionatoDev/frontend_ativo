import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ccpipe'
})
export class CcPipePipe implements PipeTransform {

  transform(value: string): string {
      return value.replace('#','-');
  }

}
