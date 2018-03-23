import { NgModule } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {AngularFittextModule} from 'angular-fittext';

import { AppRoutingModule } from './app.routing.module'
import { AppComponent } from './app.component';

import { HomeComponent } from './views/home.component';
import { WeatherComponent } from './views/weather.component';
import { ViewNotFoundComponent } from "./views/view-not-found.component"

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    WeatherComponent,
    ViewNotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFittextModule,
    NgbModule.forRoot()
  ],
  providers: [Title],
  bootstrap: [AppComponent]
})
export class AppModule { }
