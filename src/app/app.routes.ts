import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { addVehicleComponent } from './components/addVehicle/addVehicle.component';
import { NoContentComponent } from './components/no-content/no-content.component';



export const ROUTES: Routes = [
  { path: '',      component: HomeComponent },
  { path: 'home',  component: HomeComponent },
  { path: 'addVehicle', component: addVehicleComponent },
  { path: '**',    component: NoContentComponent },
];
