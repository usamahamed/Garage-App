import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home';
import { addVehicleComponent } from './addVehicle';
import { NoContentComponent } from './no-content';

import { DataResolver } from './app.resolver';


export const ROUTES: Routes = [
  { path: '',      component: HomeComponent },
  { path: 'home',  component: HomeComponent },
  { path: 'about', component: addVehicleComponent },
  { path: '**',    component: NoContentComponent },
];
