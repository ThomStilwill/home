import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';

import { LogRoutingModule } from './log-routing.module';
import { LogListComponent } from './log-list/log-list.component';
import { LogComponent } from './log.component';
import { LogService } from './services/log.service';
import { ScheduleService } from './services/schedule.service';
import { ReportService } from './services/report.service';

import { LogEditComponent } from './log-edit/log-edit.component';
import { SharedModule } from '../shared/shared.module';
import { ScheduleListComponent } from './schedule-list/schedule-list.component';
import { ScheduleEditComponent } from './schedule-edit/schedule-edit.component';
import { ReportComponent } from './report/report.component';
import { VehiclesComponent } from './vehicles/vehicles.component';
import { VehiclesGridComponent } from './vehicles/vehicles-grid.component';
import { VehicleService } from './services/vehicle.service';
import { JwtInterceptor } from '../_helpers/jwt.interceptor';
import { VehicleEditComponent } from './vehicles/vehicle-edit/vehicle-edit.component';
import { LogGridComponent } from './log-grid/log-grid.component';

@NgModule({
  declarations: [
                  LogListComponent,
                  LogComponent,
                  LogEditComponent,
                  ScheduleListComponent,
                  ScheduleEditComponent,
                  ReportComponent,
                  VehiclesComponent,
                  VehiclesGridComponent,
                  VehicleEditComponent,
                  LogGridComponent
                ],
  imports: [
                  CommonModule,
                  HttpClientModule,
                  FormsModule,
                  ReactiveFormsModule,
                  LogRoutingModule,
                  SharedModule.forRoot()
          ],

  providers: [
                  LogService,
                  ScheduleService,
                  ReportService,
                  VehicleService,
                  DatePipe,
                  { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
            ]
})
export class LogModule { }
