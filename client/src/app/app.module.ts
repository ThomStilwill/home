import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule, Title } from '@angular/platform-browser';

import { BsDropdownModule, CollapseModule  } from 'ngx-bootstrap';
import { AngularFittextModule } from 'angular-fittext';

import { AppRoutingModule } from './app.routing.module';
import { AppComponent } from './app.component';

//import { LinkService } from "./services/link.service";

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
    FormsModule,
    AppRoutingModule,
    AngularFittextModule,
    BsDropdownModule.forRoot(),
    CollapseModule.forRoot()
  ],
  providers: [Title],
  bootstrap: [AppComponent]
})
export class AppModule { }
