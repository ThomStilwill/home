import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LinksComponent } from './view/links/links.component';
import { WorkComponent } from './view/work/work.component';
import { PlayComponent } from './view/play/play.component';
import { PingComponent } from './view/ping/ping.component';

const routes: Routes = [
  { path: '', component: LinksComponent, pathMatch: 'full'},
  { path: 'home', component: LinksComponent},
  { path: 'play', component: PlayComponent},
  { path: 'work', component: WorkComponent},
  { path: 'ping', component: PingComponent},
  // { path: 'about', component: AboutComponent},
  // { path: 'error', component: BadRouteComponent},
  // { path: '**', component: BadRouteComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
