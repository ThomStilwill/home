import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LogComponent } from './log.component';
import { LogListComponent } from './log-list/log-list.component';
import { LogEditComponent } from './log-edit/log-edit.component';

import { ScheduleListComponent } from './schedule-list/schedule-list.component';
import { ScheduleEditComponent } from './schedule-edit/schedule-edit.component';

import { ReportComponent } from './report/report.component';
import { VehiclesComponent} from './vehicles/vehicles.component';
import { VehicleEditComponent } from './vehicles/vehicle-edit/vehicle-edit.component';

const routes: Routes = [
  { path: 'log', component: LogComponent, pathMatch: 'full',
    children: [
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
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LogRoutingModule { }
