import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MAT_DIALOG_DEFAULT_OPTIONS, MatDialogConfig } from '@angular/material/dialog';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AppRoutingModule } from './app-routing.module';
import { AppConfigModule } from './app-config.module';

import { AppComponent } from './app.component';
import { LinksComponent } from './view/links/links.component';
import { WorkComponent } from './view/work/work.component';
import { PlayComponent } from './view/play/play.component';
import { DataService } from './services/data.service';


@NgModule({
  declarations: [
    AppComponent,
    LinksComponent,
    WorkComponent,
    PlayComponent
  ],
  imports: [
    AppConfigModule,
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule
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
