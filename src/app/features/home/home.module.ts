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
import { TestFormComponent } from './components/testform/testform.component';
import { GuideComponent } from './pages/guide/guide.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { HomeFeature, effects } from './store';
import { LoadingMessageComponent } from './loading-message/loading-message.component';

@NgModule({
  declarations: [
    HomeComponent,
    LinksComponent,
    PingComponent,
    PlayComponent,
    WorkComponent,
    TestFormComponent,
    GuideComponent,
    LoadingMessageComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    CoreModule,
    HomeRoutingModule,
    StoreModule.forFeature(HomeFeature),
    EffectsModule.forFeature(effects),

  ]
})
export class HomeModule { }
