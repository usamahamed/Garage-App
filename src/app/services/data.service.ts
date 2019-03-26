import {Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Vehicle} from "../models/vehicle.model";
import {Level} from "../models/level.model";
import { Observable, throwError } from "rxjs";
import { catchError, map } from "rxjs/operators";

@Injectable({
  providedIn: 'root',
})
export class DataService {
    currentPage = 1; //current page
    maxSize = 6; //pagination max size
    entryLimit = 6; //max rows for data table
    noOfPages;
    sliceVehicles; // array hold slice data; 
    filterVehicles;
    start;
    filterByTypeflag;
    filterByLevelflag;
  constructor(private http: HttpClient)
  {
    this.loadVehicles();
    // this.loadLevels();
  }

  _vehicles: Array<Vehicle>;
  _levels: Array<Level>;
  get vehicles(): Array<Vehicle> {
    return this._vehicles;
  }
  get slicevehicles(): Array<Vehicle> {
    return this.sliceVehicles;
  }
  set slicevehicles(vehicles) {
     this.sliceVehicles = vehicles;
  }

  get levels(): Array<Level> {
    return this._levels;
  }
  loadVehicles(): void{
    this.http.get<Vehicle[]>('./assets/data/vehicles.json')
      .subscribe(
      data => {
        this._vehicles = data;
        this.sliceVehicles = data;
        this.filterVehicles = data;
       this.noOfPages = Math.ceil(this._vehicles.length/this.entryLimit);

        this.loadLevels();
      }
    );
  }

  loadLevels(): void{
    this.http.get<Level[]>('./assets/data/levels.json')
      .subscribe(
      data => {

        this._levels = data;
        if(this._levels.length<1){
          alert("Numbers of parking levels has to be greater than 0.");
        }
        else{
          this.calculateAvailableSlots();
        }
      }
    );
  }

  selectPage(page){
       this.currentPage = this.currentPage + page ;

   this.start = (this.currentPage-1)*this.entryLimit;
   !this.filterByTypeflag && !this.filterByLevelflag ?
    this.sliceVehicles = this.vehicles.slice(this.start, this.start+this.entryLimit):
    this.sliceVehicles = this.filterVehicles.slice(this.start, this.start+this.entryLimit);

    };

  filterByType(VehicleType){
    this.filterByTypeflag = VehicleType;

    this.filterByLevelflag ?
          this.sliceVehicles = this.filterByBoth(this.filterByTypeflag,this.filterByLevelflag,this.vehicles)
        : this.sliceVehicles = this.vehicles.filter(x => x['type'] == VehicleType);
   
    this.filterVehicles = this.sliceVehicles;
    this.noOfPages = Math.ceil(this.sliceVehicles.length/this.entryLimit);
    }

   filterByLevel(LevelID){
    this.filterByLevelflag = LevelID;

    this.filterByTypeflag ?
      this.sliceVehicles = this.filterByBoth(this.filterByTypeflag,this.filterByLevelflag,this.vehicles)
    : this.sliceVehicles = this.vehicles.filter(x =>  x['level'] == LevelID  );

    this.filterVehicles = this.sliceVehicles;

    this.noOfPages = Math.ceil(this.sliceVehicles.length/this.entryLimit);
    }

filterByBoth(VehicleType,LevelID,VehiclesArr){
return VehiclesArr.filter(x => 
   x['level'] == LevelID && x['type'] == VehicleType
);
}

removeFilter(){
   this.filterByLevelflag = null;
   this.filterByTypeflag = null;
  this.sliceVehicles = this._vehicles;
  this.filterVehicles = this._vehicles;
  console.log("slice vic after remove", this.sliceVehicles)
  this.noOfPages = Math.ceil(this._vehicles.length/this.entryLimit);
}

  calculateAvailableSlots(){
    for(let v = 0; v < this._vehicles.length; v++)
    {
         this._levels.filter(data => data.id == this._vehicles[v].level)[0].availableSlots--;
    }
  }

  reduseSlot(id){
    this._levels.filter(data => data.id == id)[0].availableSlots--;
  }

  addSlot(id){
    this._levels.filter(data => data.id == id)[0].availableSlots++;
  }
 removeFromParking(vehicle: Vehicle) {
    let index = this._vehicles.indexOf(vehicle, 0);
    if (index > -1) {
      this.addSlot(vehicle.level);
      this._vehicles.splice(index, 1);
    }
  }
}
