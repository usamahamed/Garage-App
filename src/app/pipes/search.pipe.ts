import {Pipe, PipeTransform} from '@angular/core';

@Pipe({ name: 'search', pure: false })

export class SearchPipe implements PipeTransform {

  transform(value, queryString, field) {
    if (typeof value == "undefined" || value == null || queryString!= null || queryString !== undefined) {
      return value.filter(item=>item[field].toLowerCase().indexOf(queryString.toLowerCase()) !== -1);
    } else {
      return value;
    }
  }
}
