import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { MAT_DIALOG_DEFAULT_OPTIONS, MatDialogConfig } from '@angular/material/dialog';

import { AppRoutingModule } from './app-routing.module';
import { AppConfigModule } from './app-config.module';
import { SharedModule } from './shared/shared.module';
import { HomeModule } from './features/home/home.module';
import { CoreModule } from '@angular/flex-layout';
import { DataService } from './shared/services/data.service';
import { AppComponent } from './app.component';
import { CarlogModule } from './features/carlog/carlog.module';
import { Router } from '@angular/router';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    HttpClientModule,
    AppConfigModule,
    AppRoutingModule,
    CoreModule,
    HomeModule,
    CarlogModule,
    SharedModule.forRoot()
  ],
  providers: [ DataService,
    {provide: MAT_DIALOG_DEFAULT_OPTIONS,
    useValue: {
     ...new MatDialogConfig(),
     disableClose: true,
     autoFocus: true,
     hasBackdrop: true,
     width: '400px',
     position: {
       top: '60px'
     }
     } as MatDialogConfig
   }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule {

  constructor(private readonly router: Router) {
    // router.events
    //   .subscribe(console.log)
}}
