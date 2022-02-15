import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from '../core/services/alert.service';
import { Item } from '../core/models/item';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class RegisterComponent implements OnInit {

  form: FormGroup;
  loading = false;
  submitted = false;
  error = '';
  usertypes = new Array<Item>();

  passwordhelp = 'Letter or numbers.  No special characters.';

  private usernamePattern = '[\\w]*';
  private passwordPattern = '[\\w]*';
  private namePattern  = '[\\D]*';
  private emailPattern = '\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+';

  constructor(
      private formBuilder: FormBuilder,
      private route: ActivatedRoute,
      private router: Router,
      private alertService: AlertService
  ) {
      this.form = this.buildForm();
  }

  get fields() { return this.form.controls; }

  ngOnInit() {

    this.usertypes.push(new Item('user', 'User'));
    this.usertypes.push(new Item('admin', 'Admin'));
    this.usertypes.push(new Item('super', 'Super'));

    this.onChanges();
  }

  onChanges(): void {
    this.form.valueChanges
    .subscribe(form => {
      if (this.error) {
        this.error = '';
        this.alertService.clear();
      }
    });
  }

  buildForm() {
    return this.formBuilder.group({
      phone: [''],
      date: [''],
      usertype: ['admin'],
      firstname: ['Robert', Validators.compose([Validators.required,
                                          Validators.pattern(this.namePattern) ])],
      lastname: ['Johnson', Validators.compose([Validators.required,
                                         Validators.pattern(this.namePattern)])],
      email: ['robert.johnson@here.com', Validators.compose([Validators.required,
                                      Validators.pattern(this.emailPattern)])],
      username: ['johnsonr', Validators.compose([Validators.required,
                                         Validators.pattern(this.usernamePattern),
                                         Validators.minLength(3),
                                         Validators.maxLength(16) ])],
      password: ['monkey123', Validators.compose([Validators.required,
                                         Validators.pattern(this.passwordPattern),
                                         Validators.minLength(3),
                                         Validators.maxLength(16) ])]
    });
  }

  submit() {
      this.submitted = true;

      // stop here if form is invalid
      if (this.form.invalid) {
          return;
      }

      this.loading = true;
      // this.authenticationService.login(this.fields.username.value, this.fields.password.value)
      //   .delay(1000)
      //   .pipe(first())
      //   .subscribe(
      //       data => {
      //           this.router.navigate([this.returnUrl]);
      //       },
      //       error => {
      //           this.error = error;
      //           this.alertService.warn(error);
      //           this.loading = false;
      //       });
  }
}
