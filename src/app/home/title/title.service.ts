import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Title {
  value = 'Garage';
  constructor() {

  }

  getData() {
    console.log('Title#getData(): Get Data');
    // return this.http.get('/assets/data.json')
    // .map(res => res.json());
    return {
      value: 'AngularClass'
    };
  }

}
