import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { MAT_DIALOG_DEFAULT_OPTIONS, MatDialogConfig } from '@angular/material/dialog';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppConfigModule } from './app-config.module';
import { SharedModule } from './shared/shared.module';
import { HomeModule } from './features/home/home.module';
import { CoreModule } from '@angular/flex-layout';
import { DataService } from './shared/services/data.service';
import { AppComponent } from './app.component';
import { CarlogModule } from './features/app/carlog.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    AppConfigModule,
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    CoreModule,
    HomeModule,
    CarlogModule,
    AppRoutingModule,
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
  bootstrap: [AppComponent]
})
export class AppModule { }
