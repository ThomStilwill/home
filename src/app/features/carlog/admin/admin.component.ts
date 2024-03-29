import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { User } from '../core/models/user';

import { UserService } from '../services/user.service';

@Component(
  {
    selector: 'app-admin',
    templateUrl: './admin.component.html'}
  )

export class AdminComponent implements OnInit {
    users: User[] = [];

    constructor(private userService: UserService) {}

    ngOnInit() {
        this.userService.getAll().pipe(first()).subscribe(users => {
            this.users = users;
        });
    }
}
