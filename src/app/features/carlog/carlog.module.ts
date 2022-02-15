import { NgModule } from '@angular/core';

import { CarlogComponent } from './carlog.component';
import { BadRouteComponent } from './bad-route/bad-route.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';


import { TestComponent } from './test/test.component';
import { VehicleGridComponent } from './test/vehicle-grid.component';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor,  } from './_helpers/jwt.interceptor';
import { ErrorInterceptor } from './_helpers/error.interceptor';
import { fakeBackendProvider } from './_helpers/fake-backend';

import { AuthenticationService } from './services/authentication.service';
import { UserService } from './services/user.service';
import { LogService } from './services/log.service';
import { ScheduleService } from './services/schedule.service';
import { ReportService } from './services/report.service';
import { VehicleService } from './services/vehicle.service';
import { DatePipe } from '@angular/common';

import { WelcomeComponent } from './welcome/welcome.component';
import { AuthorizationDirective } from './directives/authorization.directive';
import { RegisterComponent } from './register/register.component';
import { TestformComponent } from './test/testform/testform.component';

import { PathLocationStrategy , LocationStrategy, CommonModule } from '@angular/common';
import { CarlogRoutingModule } from './carlog-routing.module';
import { LogEditComponent } from './components/log-edit/log-edit.component';
import { LogGridComponent } from './components/log-grid/log-grid.component';
import { ReportComponent } from './components/report/report.component';
import { ScheduleEditComponent } from './components/schedule-edit/schedule-edit.component';
import { ScheduleListComponent } from './components/schedule-list/schedule-list.component';
import { VehicleEditComponent } from './components/vehicle-edit/vehicle-edit.component';
import { LogComponent } from './containers/log/log.component';
import { VehiclesGridComponent } from './containers/vehicles/vehicles-grid.component';
import { VehiclesComponent } from './containers/vehicles/vehicles.component';
import { LogListComponent } from './components/log-list/log-list.component';
import { CoreModule } from './core/core.module';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
  declarations: [
    CarlogComponent,
    BadRouteComponent,
    HomeComponent,
    AboutComponent,
    TestComponent,
    VehicleGridComponent,
    LoginComponent,
    AdminComponent,
    WelcomeComponent,
    AuthorizationDirective,
    RegisterComponent,
    TestformComponent,
    LogComponent,
    LogGridComponent,
    LogListComponent,
    LogEditComponent,
    ScheduleListComponent,
    ScheduleEditComponent,
    ReportComponent,
    VehiclesComponent,
    VehiclesGridComponent,
    VehicleEditComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    CarlogRoutingModule,
    CoreModule
  ],
  exports: [
  ],
  providers: [
    LogService,
    ScheduleService,
    ReportService,
    VehicleService,
    DatePipe,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    AuthenticationService,
    UserService,
    { provide: LocationStrategy, useClass: PathLocationStrategy },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
    // fakeBackendProvider
  ]
})
export class CarlogModule { }

