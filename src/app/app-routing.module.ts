import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BadrouteComponent } from './shared/components/badroute/badroute.component';

const routes: Routes = [
  { path: '', redirectTo:'/home', pathMatch: 'full'},
  { path: '**', component: BadrouteComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: false,onSameUrlNavigation:'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
