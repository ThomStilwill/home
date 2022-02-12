import { NgModule } from '@angular/core';

import { CarlogComponent } from './carlog.component';
import { BadRouteComponent } from './bad-route/bad-route.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { LogModule } from './log/log.module';
import { SharedModule } from './shared/shared.module';

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
import { WelcomeComponent } from './welcome/welcome.component';
import { AuthorizationDirective } from './directives/authorization.directive';
import { RegisterComponent } from './register/register.component';
import { TestformComponent } from './test/testform/testform.component';

import { PathLocationStrategy , LocationStrategy, CommonModule } from '@angular/common';
import { CarlogRoutingModule } from './carlog-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

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
    TestformComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CarlogRoutingModule,
    LogModule,
    SharedModule.forRoot()
  ],
  providers: [
    AuthenticationService,
    UserService,
    { provide: LocationStrategy, useClass: PathLocationStrategy },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
    // fakeBackendProvider
  ]
})
export class CarlogModule { }

