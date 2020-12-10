import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'times'
})
export class TimesPipe implements PipeTransform {

  transform(value: number) {
    return (new Array(value)).fill(1);
  }

}
