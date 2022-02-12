import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ScheduleService } from '../services/schedule.service';

@Component({
  selector: 'app-schedule-edit',
  templateUrl: './schedule-edit.component.html',
  styleUrls: ['./schedule-edit.component.scss']
})
export class ScheduleEditComponent implements OnInit {

  form: FormGroup;
  isAdd: boolean;
  parent: object;
  callback: Function;
  title: string;
  subtitle: string;

  constructor(private service: ScheduleService,
              private fb: FormBuilder) {

      this.createForm();
      this.isAdd = true;
      this.title = 'Edit Schedule';
      this.subtitle = 'Enter the maintenance schedule.';
  }

  createForm() {
    this.form = this.fb.group({
      id: '',
      description: '',
      months: null,
      miles: null,
      note: ''
    });
  }

  init(add: boolean, id, callback: Function) {
    this.callback = callback;
    this.isAdd = add;

    return new Promise((resolve, reject) => {
      if (this.isAdd ) {
        resolve(null);
      } else {
        this.service.get(id)
                .subscribe((data) => {
                  this.form.setValue(data);
                  resolve(null);
                });
      }
    });
  }

  ngOnInit() {

  }

  submit(data) {
    if (this.isAdd) {
      this.service.add(this.form.value)
      .subscribe(result => {
        this.callback(true);
      });
    } else {
      this.service.update(this.form.value)
      .subscribe(result => {
        this.callback(true);
      });
    }
  }

  cancel() {
    this.callback(false);
  }

}
