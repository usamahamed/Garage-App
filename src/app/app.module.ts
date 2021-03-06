import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, PreloadAllModules } from '@angular/router';

/*
 * Platform and Environment providers/directives/pipes
 */
import { ROUTES } from './app.routes';
// App is our top level component
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { addVehicleComponent } from './components/addVehicle/addVehicle.component';
import { NoContentComponent } from './components/no-content/no-content.component';
import {DataService} from "./services/data.service";
import {UniquePipe} from "./pipes/unique.pipe";
import {SearchPipe} from "./pipes/search.pipe";
import { NavbarComponent } from './components/navbar/navbar.component';



@NgModule({
  bootstrap: [ AppComponent ],
  declarations: [
    AppComponent,
    addVehicleComponent,
    HomeComponent,
    NoContentComponent,
    UniquePipe,
    SearchPipe,
    NavbarComponent
  ],
  imports: [ // import Angular's modules
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(ROUTES, { useHash: true, preloadingStrategy: PreloadAllModules })
  ],
  providers: [ // expose our Services and Providers into Angular's dependency injection
    DataService
  ]
})
export class AppModule {
  constructor() {}



}

