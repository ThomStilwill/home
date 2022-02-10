import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { CoreModule } from 'src/app/core/core.module';
import { LinksComponent } from './pages/links/links.component';
import { PingComponent } from './pages/ping/ping.component';
import { PlayComponent } from './pages/play/play.component';
import { WorkComponent } from './pages/work/work.component';
import { HomeRoutingModule } from './home-routing.module';
import { MaterialModule } from 'src/app/shared/material.module';
import { HomeComponent } from './home.component';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [
    HomeComponent,
    LinksComponent,
    PingComponent,
    PlayComponent,
    WorkComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    SharedModule,
    CoreModule,
    HomeRoutingModule,
    FlexLayoutModule,
    SharedModule.forRoot()
  ]
})
export class HomeModule { }
