import { Component, OnInit, AfterContentInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from './services/authentication.service';
import { User } from './_models/user';
import { DebugService } from './shared/services/debug.service';
import { faBug } from '@fortawesome/free-solid-svg-icons';
import { Title } from '@angular/platform-browser';
import  General from './utilities/general';

@Component({
  selector: 'app-root',
  templateUrl: './carlog.component.html',
  styleUrls: ['./carlog.component.scss']
})
export class CarlogComponent implements OnInit, AfterContentInit {
  currentUser: User;
  debug = false;
  bugicon = faBug;
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
