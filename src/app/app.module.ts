import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { MAT_DIALOG_DEFAULT_OPTIONS, MatDialogConfig } from '@angular/material/dialog';

import { AppRoutingModule } from './app-routing.module';
import { AppConfigModule } from './app-config.module';
import { SharedModule } from './shared/shared.module';
import { HomeModule } from './features/home/home.module';
import { DataService } from './shared/services/data.service';
import { AppComponent } from './app.component';
import { CarlogModule } from './features/carlog/carlog.module';
import { Router } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';
import { LinksReducer, LinksEffects } from './features/home/store/link';
import { AppReducer } from './store/app.reducers';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    HttpClientModule,
    AppConfigModule,
    AppRoutingModule,
    HomeModule,
    CarlogModule,
    SharedModule.forRoot(),
    
    // StoreModule.forRoot({}, {}),
    // EffectsModule.forRoot([]),
    
    StoreModule.forRoot({links: LinksReducer}),
    EffectsModule.forRoot([LinksEffects]),


    StoreDevtoolsModule.instrument({ 
      name: 'DevTools & Debugging in NgRx',
      maxAge: 25, 
      logOnly: environment.production 
    })
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
