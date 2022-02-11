import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'minustoparens'
})
export class MinusToParensPipe implements PipeTransform {

  transform(value: any, args?: any): any {

    if (!value) {
      return value;
    }

    return value < 0 ?
           '(' + Math.abs(value) + ')' :
           value;
  }
}
