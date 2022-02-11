import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { TestComponent } from './test/test.component';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';
import { AuthGuard } from './_guards/auth.guard';
import { Role } from './_models/roles';
import { RegisterComponent } from './register/register.component';
import { TestformComponent } from './test/testform/testform.component';

const routes: Routes = [
  { path: 'carlog', component: HomeComponent, pathMatch: 'full',
    children: [
    { path: 'home', component: HomeComponent},
    { path: 'login', component: LoginComponent},
    { path: 'register', component: RegisterComponent},
    { path: 'admin', component: AdminComponent},
    { path: 'test',
      component: TestComponent,
      canActivate: [AuthGuard],
      data: { roles: [Role.Admin] } },
    { path: 'test/testform', component: TestformComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CarlogRoutingModule { }
