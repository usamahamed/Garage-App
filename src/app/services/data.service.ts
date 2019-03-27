import {Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';

import {Vehicle} from "../models/vehicle.model";
import {Level} from "../models/level.model";


@Injectable({
  providedIn: 'root',
})

export class DataService {

    _currentPage:number = 1; //current page
    _maxSize:number = 6; //pagination max size
    entryLimit:number = 6; //max rows for data table
    _noOfPages:number;
    sliceVehicles: Array<Vehicle>; // array hold currnt slice data for pagination 
    filterVehicles: Array<Vehicle>;  // hold filter data
    start: number;    // incrementer value for current page
    filterByTypeflag:string;  // current selected type filter
    filterByLevelflag:number; // current selected level filter
    _vehicles: Array<Vehicle>;
    _vehiclesLength:number;  
    _levels: Array<Level>;


  constructor(private http: HttpClient)
  {
    this.loadVehicles();
  }



  /**************************************************************************
  * @desc getter all vehicles data
  * @param null
  * @return Array of Vehicle
*************************************************************************/
  get vehicles(): Array<Vehicle> {
    return this._vehicles;
  }

 /**************************************************************************
  * @desc getter _currentPage
  * @param null
  * @return  _currentPage
*************************************************************************/
  get currentPage(): number {
    return this._currentPage;
  }

   /**************************************************************************
  * @desc getter _noOfPages
  * @param null
  * @return  _noOfPages
*************************************************************************/
  get noOfPages(): number {
    return this._noOfPages;
  }

   /**************************************************************************
  * @desc getter _maxSize
  * @param null
  * @return  _maxSize
*************************************************************************/
  get maxSize(): number {
    return this._maxSize;
  }

 /**************************************************************************
  * @desc getter all vehicles data but slicing based on page size
  * @param null
  * @return Array of Vehicle
*************************************************************************/
  get slicevehicles(): Array<Vehicle> {
    return this.sliceVehicles;
  }

/**************************************************************************
  * @desc getter for levels data
  * @param null
  * @return Array of levels
*************************************************************************/
  get levels(): Array<Level> {
    return this._levels;
  }

   /**************************************************************************
  * @desc getter all vehicles length
  * @param null
  * @return  Vehicle length
*************************************************************************/
  get vehiclesLength(): number {
    return this._vehiclesLength;
  }




  /**************************************************************************
  * @desc load Vehicles data from json file using http 
  * @param null
  * @return void - success or failure
*************************************************************************/
  loadVehicles(): void{
    this.http.get<Vehicle[]>('./assets/data/vehicles.json')
      .subscribe(
      data => {
        this._vehicles = data;
        this.sliceVehicles = data;
        this._vehiclesLength = data.length;
       this._noOfPages = Math.ceil(this._vehicles.length/this.entryLimit);

        this.loadLevels();
      }
    );
  }

  /**************************************************************************
  * @desc load Levels data from json file using http
  * @param null
  * @return void - success or failure
*************************************************************************/

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


/**************************************************************************
  * @desc set current page
  * @param number page - page number
  * @return void - set currnt page in ui
*************************************************************************/
  selectPage(page:number): void{
    this._currentPage = this._currentPage + page ;
    this.start = (this._currentPage-1)*this.entryLimit;

     // check if filter flag have values show filter data else show all data
   !this.filterByTypeflag && !this.filterByLevelflag ?
    this.sliceVehicles = this.vehicles.slice(this.start, this.start+this.entryLimit):
    this.sliceVehicles = this.filterVehicles.slice(this.start, this.start+this.entryLimit);

    };


/**************************************************************************
  * @desc calculate Available Slots for check adding car or Motorbike
  * @param null
  * @return void - slot calculations in levels array
*************************************************************************/
  calculateAvailableSlots():void{
    for(let v = 0; v < this._vehicles.length; v++)
    {
         this._levels.filter(data => data.id == this._vehicles[v].level)[0].availableSlots--;
    }
  }


/**************************************************************************
  * @desc reduce Available Slots after adding car or Motorbike
  * @param number id - level id
  * @return void - reduce slot value
*************************************************************************/
  reduseSlot(id:number):void{
    this._levels.filter(data => data.id == id)[0].availableSlots--;
  }


/**************************************************************************
  * @desc add new slot to levels array after deleting car or Motorbike
  * @param number id - level id
  * @return void - add slot value
*************************************************************************/
  addSlot(id:number):void{
    this._levels.filter(data => data.id == id)[0].availableSlots++;
  }


  /**************************************************************************
  * @desc remove vehicle 
  * @param vehicle interface 
  * @return void - remove vehicle from vehicles array
*************************************************************************/
 removeFromParking(vehicle: Vehicle):void {
    let index = this._vehicles.indexOf(vehicle, 0);
    if (index > -1) {
      this.addSlot(vehicle.level);
      this._vehicles.splice(index, 1);
    }
  }



  /**************************************************************************
  * @desc filter Vehicles data based on VehicleType[car - Motorbike]
  * @param string VehicleType - [car - Motorbike]
  * @return void - success filter data
*************************************************************************/
  filterByType(VehicleType:string):void{
    // set filter flag for checking when displaying data from [Vehicles or filter array]
    this.filterByTypeflag = VehicleType;  

    // check if both flag filter have values so filter by both or by type only
    this.filterByLevelflag ?
          this.sliceVehicles = this.filterByBoth(this.filterByTypeflag,this.filterByLevelflag,this.vehicles)
        : this.sliceVehicles = this.vehicles.filter(x => x['type'] == VehicleType);
  
   // set data in filter array for displaying in ui
    this.filterVehicles = this.sliceVehicles;

   // update number of pages based on filter array size
    this._noOfPages = Math.ceil(this.sliceVehicles.length/this.entryLimit);
    }


 /**************************************************************************
  * @desc filter Vehicles data based on LevelID
  * @param number LevelID - level number
  * @return void - success filter data
*************************************************************************/
   filterByLevel(LevelID:number):void{
    // set filter flag for checking when displaying data from [Vehicles or filter array]
    this.filterByLevelflag = LevelID;

    // check if both flag filter have values so filter by both or by type only
    this.filterByTypeflag ?
      this.sliceVehicles = this.filterByBoth(this.filterByTypeflag,this.filterByLevelflag,this.vehicles)
    : this.sliceVehicles = this.vehicles.filter(x =>  x['level'] == LevelID  );

    // set data in filter array for displaying in ui
    this.filterVehicles = this.sliceVehicles;

    // update number of pages based on filter array size
    this._noOfPages = Math.ceil(this.sliceVehicles.length/this.entryLimit);
    }


/**************************************************************************
  * @desc filter by both Vehicle Type and Level ID
  * @param string -         VehicleType
           number -         LevelID
           Array<Vehicle> - Vehicles Array
  * @return Array<Vehicle> - new filter array
*************************************************************************/
filterByBoth(VehicleType:string,LevelID:number,VehiclesArr:Array<Vehicle>):Array<Vehicle>{
return VehiclesArr.filter(x => x['level'] == LevelID && x['type'] == VehicleType);
}


/************************************************************************
  * @desc remove filter data
  * @param null
  * @return void - success of filter removal  
*************************************************************************/
removeFilter():void{
   this.filterByLevelflag = null;
   this.filterByTypeflag = null;
  this.sliceVehicles = this._vehicles;
  this.filterVehicles = this._vehicles;
  this._noOfPages = Math.ceil(this._vehicles.length/this.entryLimit);
}

}
