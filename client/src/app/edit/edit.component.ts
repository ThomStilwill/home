import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, FormControlName} from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { InputTextComponent } from '../components/input-text.component';
import 'rxjs/add/operator/switchMap';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'edit-text',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  logform: FormGroup;
  validationMessages = {
    event: {required: 'Need event'},
    note: { required: 'Need note'}
  };

  constructor( private router: Router,
               private route: ActivatedRoute,
               private fb: FormBuilder) {

    this.createForm();
  }

  createForm() {
    this.logform = this.fb.group({
        id: [''],
        event: ['', Validators.required],
        mileage: ['', Validators.required],
        note: ['', Validators.required]
    });
  }

  ngOnInit() {}

  submit(data) {
    console.log(data);
  }

  cancel() {
      console.log('cancel');
  }

}
