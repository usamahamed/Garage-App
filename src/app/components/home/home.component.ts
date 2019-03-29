import {Component} from '@angular/core';

import {DataService} from "../../services/data.service";
import {Vehicle} from "../../models/vehicle.model";

@Component({
  selector: 'home', 
  styleUrls: ['./home.component.css'],
  templateUrl: './home.component.html'
})


export class HomeComponent {

  filterData;
  selectedId:number;
  SelectedType:string; 

  constructor(private dataService: DataService) {

  }

  removeVehicle(vehicle: Vehicle) {

    this.dataService.removeFromParking(vehicle);
  }

  filterByLevel(levelId:number){
    this.selectedId = levelId;
  this.dataService.filterByLevel(levelId)
  }

  filterByType(type:string){
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

 

}
