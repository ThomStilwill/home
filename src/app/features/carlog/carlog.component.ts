import { Component, OnInit, AfterContentInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from './services/authentication.service';
import { DebugService } from './core/services/debug.service';
import { Title } from '@angular/platform-browser';
import  General from './utilities/general';
import { User } from './core/models/user';

@Component({
  selector: 'app-carlog',
  templateUrl: './carlog.component.html',
  styleUrls: ['./carlog.component.scss'],
  encapsulation:  ViewEncapsulation.ShadowDom
})
export class CarlogComponent implements OnInit, AfterContentInit {
  currentUser: User;
  debug = false;
  title = 'Carlog';

  constructor(
      private router: Router,
      private authenticationService: AuthenticationService,
      private debugService: DebugService,
      private titleService: Title
  ) {
      this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }

  ngOnInit() {
    this.debugService.active.subscribe(
      active => {
        this.debug = active;
      });
  }

  ngAfterContentInit() {
    const items = ["Loading...","3","2","1",this.title];
    General.delayTitle(items, this.setTitle(this));
  }

  toggleDebug() {
    const active =!this.debug;
    this.debugService.setActive(active);
  }

  logout() {
      this.authenticationService.logout();
      this.router.navigate(['login']);
  }

  setTitle(ctx: any) {
    return (x:string) => {
      ctx.titleService.setTitle(x);
    }
  }
}
