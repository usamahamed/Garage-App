import { NgModule, ApplicationRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, PreloadAllModules } from '@angular/router';
import { removeNgStyles, createNewHosts, createInputTransfer } from '@angularclass/hmr';

/*
 * Platform and Environment providers/directives/pipes
 */
import { ROUTES } from './app.routes';
// App is our top level component
import { AppComponent } from './app.component';
import { APP_RESOLVER_PROVIDERS } from './app.resolver';
import { AppState, InternalStateType } from './app.service';
import { HomeComponent } from './home';
import { addVehicleComponent } from './addVehicle';
import { NoContentComponent } from './no-content';
import { XLarge } from './home/x-large';
import {DataService} from "./services/data.service";
import {UniquePipe} from "./pipes/unique.pipe";
import {SearchPipe} from "./pipes/search.pipe";
import {FilterPipe} from "./pipes/filter.pipe";


/**
 * `AppModule` is the main entry point into Angular2's bootstraping process
 */
@NgModule({
  bootstrap: [ AppComponent ],
  declarations: [
    AppComponent,
    addVehicleComponent,
    HomeComponent,
    NoContentComponent,
    XLarge,
    UniquePipe,
    SearchPipe,
    FilterPipe
  ],
  imports: [ // import Angular's modules
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(ROUTES, { useHash: true, preloadingStrategy: PreloadAllModules })
  ],
  providers: [ // expose our Services and Providers into Angular's dependency injection
    DataService,
    AppState
  ]
})
export class AppModule {
  constructor() {}



}

