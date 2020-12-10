import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'unixToDate'
})
export class UnixToDatePipe implements PipeTransform {

  transform(unxiDate: number) {
    return new Date(unxiDate).toLocaleDateString()
  }

}
