import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule, Title } from '@angular/platform-browser';

import { BsDropdownModule, CollapseModule, AlertModule  } from 'ngx-bootstrap';
import { AngularFittextModule } from 'angular-fittext';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from './../environments/environment';

import { AbstractValueAccessor } from './components/abstract-value-accessor';
import { InputTextComponent } from './components/input-text.component';

import { AppRoutingModule } from './app.routing.module';
import { AppComponent } from './app.component';

import { HomeComponent } from './views/home.component';
import { WeatherComponent } from './views/weather.component';
import { ViewNotFoundComponent } from './views/view-not-found.component';
import { EditComponent } from './edit/edit.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    WeatherComponent,
    ViewNotFoundComponent,
    InputTextComponent,
    EditComponent
  ],
  imports: [
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule,
    AngularFittextModule,
    BsDropdownModule.forRoot(),
    CollapseModule.forRoot(),
    AlertModule.forRoot()
  ],
  providers: [Title],
  bootstrap: [AppComponent]
})
export class AppModule { }
