import {Pipe, PipeTransform} from '@angular/core';
import {Server} from './app.module';

@Pipe({
  name: 'serverSort'
})
export class ServerSortPipe implements PipeTransform {
  transform(value: Server[]): Server[] {
    return value.sort((a: Server, b: Server): number => {
      const n1 = a.name.toUpperCase(),
        n2 = b.name.toUpperCase();
      if (n1 > n2) {
        return 1;
      } else if (n1 < n2) {
        return -1;
      }
      return 0;
    });
  }
}
