import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './containers/home/home.component';
import { TestComponent } from './test/test.component';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';
import { AuthGuard } from './_guards/auth.guard';
import { Role } from './core/models/roles';
import { RegisterComponent } from './register/register.component';
import { TestformComponent } from './test/testform/testform.component';
import { CarlogComponent } from './carlog.component';
import { AboutComponent } from './containers/about/about.component';
import { ReportComponent } from './components/report/report.component';
import { ScheduleEditComponent } from './components/schedule-edit/schedule-edit.component';
import { ScheduleListComponent } from './components/schedule-list/schedule-list.component';
import { LogEditComponent } from './components/log-edit/log-edit.component';
import { LogListComponent } from './components/log-list/log-list.component';
import { VehicleEditComponent } from './components/vehicle-edit/vehicle-edit.component';
import { LogComponent } from './containers/log/log.component';
import { VehiclesComponent } from './containers/vehicles/vehicles.component';


const routes: Routes = [
  { path: 'carlog', component: CarlogComponent,
    children: [
    { path: '', redirectTo:'home',  pathMatch: 'prefix'},
    { path: 'home', component: HomeComponent},
    { path: 'about', component: AboutComponent},
    { path: 'login', component: LoginComponent},
    { path: 'register', component: RegisterComponent},
    { path: 'admin', component: AdminComponent},
    { path: 'test',
      component: TestComponent,
      // canActivate: [AuthGuard],
      // data: { roles: [Role.Admin] }
     },
    { path: 'test/testform', component: TestformComponent},
    { path: 'log', component: LogComponent,
          children: [
            //{ path: '', redirectTo:'report', pathMatch:'full'},
            { path: 'vehicles', component: VehiclesComponent },
            { path: 'list', component: LogListComponent },
            { path: 'edit', component: LogEditComponent },
            { path: 'add', component: LogEditComponent },
            { path: 'vehicle/edit', component: VehicleEditComponent },
            { path: 'schedule', component: ScheduleListComponent},
            { path: 'schedule/edit', component: ScheduleEditComponent},
            { path: 'report', component: ReportComponent},
          ]
        }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CarlogRoutingModule { }
