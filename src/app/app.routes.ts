import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { addVehicleComponent } from './addVehicle/addVehicle.component';
import { NoContentComponent } from './no-content/no-content.component';



export const ROUTES: Routes = [
  { path: '',      component: HomeComponent },
  { path: 'home',  component: HomeComponent },
  { path: 'addVehicle', component: addVehicleComponent },
  { path: '**',    component: NoContentComponent },
];
