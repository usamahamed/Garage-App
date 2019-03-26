import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'unique', pure: false})
export class UniquePipe implements PipeTransform {

  transform(input: any, exponent: string): any {
    if(typeof input === "undefined"){
      return [];
    }
    let uniqueTable: Array<any> = [];

    for (let i = 0; i < input.length; i++) {
      uniqueTable.push(input[i][exponent]);
    }
    return uniqueTable.filter((v, i, a) => a.indexOf(v) === i);
  }
}
