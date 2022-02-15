import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { delay, first } from 'rxjs/operators';
import { AuthenticationService } from '../services/authentication.service';
import { AlertService } from '../core/services/alert.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';

  passwordhelp = 'Letter or numbers.  No special characters.';

  private usernamePattern = '[\\w]*';
  private passwordPattern = '[\\w]*';

  constructor(
      private formBuilder: FormBuilder,
      private route: ActivatedRoute,
      private router: Router,
      private alertService: AlertService,
      private authenticationService: AuthenticationService
  ) {
      if (this.authenticationService.currentUserValue) {
          this.router.navigate(['/']);
      }
      this.loginForm = this.buildForm();
  }

  get fields() { return this.loginForm.controls; }

  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    this.onChanges();
  }

  onChanges(): void {
    this.loginForm.valueChanges
    .subscribe(form => {
      if (this.error) {
        this.error = '';
        this.alertService.clear();
      }
    });
  }

  buildForm() {
    return this.formBuilder.group({
      username: ['', Validators.compose([Validators.required,
                                         Validators.pattern(this.usernamePattern),
                                         Validators.minLength(3),
                                         Validators.maxLength(16) ])],
      password: ['', Validators.compose([Validators.required,
                                         Validators.pattern(this.passwordPattern),
                                         Validators.minLength(3),
                                         Validators.maxLength(16) ])]
    });
  }

  submit() {
      this.submitted = true;
      if (this.loginForm.invalid) {
          return;
      }

      this.loading = true;
      this.authenticationService.login(this.fields.username.value, this.fields.password.value)
        .pipe(first(),
              delay(1000))
        .subscribe(
            data => {
                this.router.navigate([this.returnUrl]);
            },
            error => {
                this.error = error;
                this.alertService.warn(error);
                this.loading = false;
            });
  }
}
