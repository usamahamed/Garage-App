import {Component} from '@angular/core';

import {DataService} from "../../services/data.service";
import {Vehicle} from "../../models/vehicle.model";
import {Level} from "../../models/level.model";

@Component({
  selector: 'about',
  styles: [`
  .btn-primary{
        background-color: #f68e36;
    border-color: #f68e36;
}
  }
  `],
  templateUrl: './addVehicle.component.html'

})
export class addVehicleComponent {
  private newVehicle: Vehicle;
  private error: any = false;
  private info: string;

  constructor(private dataService: DataService) {
    this.newVehicle = new Vehicle;
  }

  addVehicle(): void {
    this.error = false;
    this.info = null;
    if (this.validation()) {
      this.dataService.sliceVehicles.push(this.newVehicle);
      this.dataService.reduseSlot(this.newVehicle.level);
      this.newVehicle = new Vehicle;
      this.info = "New vehicle found place on the parking";
    }
  }

  validation(): boolean {
    if (this.checkIfLicensePlatesExists()) {
      this.error = "This car with this license plate is already on the parking.";
      return false;
    }
    return this.checkIfThereIsPlace();
  }

  checkIfLicensePlatesExists(): boolean {
    var exists = false;

    for (let index = 0; index < this.dataService.sliceVehicles.length; index++) {
      if (this.dataService.sliceVehicles[index].licensePlate == this.newVehicle.licensePlate) {
        exists = true;
        break;
      }
    }

    return exists;
  }

  checkIfThereIsPlace(): boolean {
    let chosenLocation: Level = this.dataService.levels.filter(data => this.newVehicle.level === data.id)[0];
    if (chosenLocation.availableSlots <= 0) {
      this.error = "There is no place on this level.";
      return false;
    }
    else {
      this.newVehicle.slot = this.getRandomPlace(chosenLocation.availableSlots);
      return true;
    }

  }

  getRandomPlace(availableSlots: number): number {
    let slot = Math.floor(Math.random() * availableSlots);
    return slot;
  }
}
