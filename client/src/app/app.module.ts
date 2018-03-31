import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule, Title } from '@angular/platform-browser';

import { BsDropdownModule, CollapseModule  } from 'ngx-bootstrap';
import { AngularFittextModule } from 'angular-fittext';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from "./../environments/environment"

import { AppRoutingModule } from './app.routing.module';
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
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
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
