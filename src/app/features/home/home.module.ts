import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { CoreModule } from 'src/app/core/core.module';
import { LinksComponent } from './pages/links/links.component';
import { PingComponent } from './pages/ping/ping.component';
import { PlayComponent } from './pages/play/play.component';
import { WorkComponent } from './pages/work/work.component';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { IconsComponent } from './components/icons/icons.component';

@NgModule({
  declarations: [
    HomeComponent,
    LinksComponent,
    PingComponent,
    PlayComponent,
    WorkComponent,
    IconsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    CoreModule,
    HomeRoutingModule
  ]
})
export class HomeModule { }
