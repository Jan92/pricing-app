import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'findCost'
})
export class FindCostPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
