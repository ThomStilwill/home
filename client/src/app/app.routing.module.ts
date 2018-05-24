import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './views/home.component';
import { WeatherComponent } from './views/weather.component';
import { ViewNotFoundComponent } from './views/view-not-found.component';
import { EditComponent } from './edit/edit.component';

const routes: Routes = [
    { path: 'home', component: HomeComponent, data: { title: 'Home'}},
    { path: 'weather', component: WeatherComponent, data: { title: 'Weather'}},
    { path: 'edit', component: EditComponent, data: { title: 'Edit'}},
    { path: '', redirectTo: '/home', pathMatch: 'full'},
    { path: '**', component: ViewNotFoundComponent, data: { title: 'View Not Found'}}
];

@NgModule({
    exports: [RouterModule],
    imports: [RouterModule.forRoot(routes, { enableTracing: false})]
})

export class AppRoutingModule {}
