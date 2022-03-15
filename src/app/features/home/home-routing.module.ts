import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GuideComponent } from './components/guide/guide.component';
import { HomeComponent } from './home.component';
import { LinksComponent } from './pages/links/links.component';
import { PingComponent } from './pages/ping/ping.component';
import { PlayComponent } from './pages/play/play.component';
import { WorkComponent } from './pages/work/work.component';

const routes: Routes = [

  { path: 'home', component: HomeComponent,
    children: [
          { path: '', component: LinksComponent, pathMatch: 'full' },
          { path: 'links', component: LinksComponent},
          { path: 'play', component: PlayComponent},
          { path: 'work', component: WorkComponent},
          { path: 'ping', component: PingComponent},
          { path: 'guide', component: GuideComponent}

        ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
