import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-testform',
  templateUrl: './testform.component.html',
  styleUrls: ['./testform.component.scss'],
  encapsulation: ViewEncapsulation.None

})
export class TestformComponent implements OnInit {
  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.initForm();
   }

  ngOnInit() {
  }

  initForm() {
    this.form = this.fb.group({
      id: null,
      event: [null, Validators.required],
      date: null,
      mileage: [null, Validators.required],
      note: null
    });
  }

  onSubmit(data) {
    console.log(data);
  }

  onCancel(data) {
    console.log('cancel');
  }

}
