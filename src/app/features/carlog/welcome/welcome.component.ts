import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../core/models/user';

import { AuthenticationService } from '../services/authentication.service';


@Component({
  selector: 'welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent {

  currentUser: User;

  constructor(
      private router: Router,
      private authenticationService: AuthenticationService,
      private activatedRoute: ActivatedRoute
  ) {
      this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }

  logout() {
      this.authenticationService.logout();
      this.router.navigate(['login'], {relativeTo: this.activatedRoute});
  }

}
