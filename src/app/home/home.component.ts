import {Component} from '@angular/core';

import {AppState} from '../app.service';
import {Title} from './title';
import {XLarge} from './x-large';
import {DataService} from "../services/data.service";
import {Vehicle} from "../models/vehicle.model";

@Component({
  // The selector is what angular internally uses
  // for `document.querySelectorAll(selector)` in our index.html
  // where, in this case, selector is the string 'home'
  selector: 'home',  // <home></home>
  // We need to tell Angular's Dependency Injection which providers are in our app.
  providers: [
    Title
  ],
  // Our list of styles in our component. We may add more to compose many styles together
  styleUrls: ['./home.component.css'],
  // Every Angular template is first compiled by the browser before Angular runs it's compiler
  templateUrl: './home.component.html'
})


export class HomeComponent {
  phrase: string = "";
  filterData;
  selectedId;
  SelectedType; 
  constructor(private dataService: DataService) {

  }

  removeFromParking1(vehicle: Vehicle) {

    this.dataService.removeFromParking(vehicle);
  }

  filterByLevel(levelId){
    this.selectedId = levelId;
  this.dataService.filterByLevel(levelId)
  }

  filterByType(type){
    this.SelectedType = type;
  this.dataService.filterByType(type)
  }
  removeFilter(){
    this.selectedId = null;
    this.SelectedType = null;
    this.dataService.removeFilter();

  }
  clickup(){
 if(this.dataService.currentPage > 1)
   this.dataService.selectPage(-1)

  }

clickdown(page){
   if(this.dataService.currentPage < this.dataService.noOfPages)
     this.dataService.selectPage(1);
  }

// filter(term: string) {
//     if(!term) {
//       this.filterData = this.dataService.vehicles;
//     } else {
//       this.filterData = this.dataService.vehicles.filter(x => 
//          x.type.trim().toLowerCase().includes(term.trim().toLowerCase())
//       );
//                console.log(this.filterData)

//     }
//   }
}
