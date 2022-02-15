import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';

import { Schedule } from '../../models/schedule';
import { ScheduleService } from '../../services/schedule.service';

import { LogService } from '../../services/log.service';
import { Logrecord } from '../../models/log-record';
import { LogAction } from '../../models/log-action';
import { Helper } from '../../core/services/helper.service';

@Component({
  selector: 'app-log-edit',
  templateUrl: './log-edit.component.html',
  styleUrls: ['./log-edit.component.scss']
})
export class LogEditComponent implements OnInit {

  form: FormGroup;
  submitted = false;
  action: LogAction;
  parent: object;
  callback: Function;
  title: string;
  subtitle: string;
  schedules: Schedule[];

  constructor(private service: LogService,
              private scheduleService: ScheduleService,
              private fb: FormBuilder,
              private helper: Helper) {

      this.initForm();
      this.title = 'Maintenance Activity';
      this.subtitle = 'Enter the maintenance event.';
      this.scheduleService.getall()
        .subscribe((schedules) => {
            this.schedules = schedules.sort((b, a) => {
              return helper.compare(a.description, b.description);
            });
        });
  }

  initForm() {
    this.form = this.fb.group({
      id: null,
      event: [null, Validators.required],
      date: null,
      mileage: [null, Validators.required],
      note: null,
      schedules: this.fb.array([this.initSchedule()])
    });
  }

  showBanner() {
    let oneControlInvalid = false;
    Object.keys(this.form.controls).forEach(key => {
      const control = this.form.get(key);
      if (control.touched && !control.valid) {
        oneControlInvalid = true;
      }
    });

    return oneControlInvalid && (this.submitted || !this.form.valid);
  }

  initSchedule() {
    return this.fb.group({id: null});
  }

  get formSchedules() {
    return this.form.get('schedules') as FormArray;
  }

  addSchedule() {
    console.log('schedule added');
    this.formSchedules.push(this.initSchedule());
  }

  deleteSchedule(index) {
    console.log('schedule delete');
    (<FormArray>this.form.controls.schedules).removeAt(index);
  }

  isScheduleSelected(index) {
    const control = (<FormArray>this.form.controls.schedules).controls[index];
    const value = control.value.id;
    console.log('schedule is selected:' + value !== 'null');
    return value !== 'null';
  }

  init(action: LogAction, id, callback: Function) {
    this.callback = callback;
    this.action = action;
    return new Promise((resolve, reject) => {
      if (this.action === LogAction.Add ) {
        resolve(null);
      } else {
        this.service.get(id)
          .subscribe((data) => {
            const logrecord = new Logrecord();
            Object.assign(logrecord, data);

            while (this.formSchedules.length) {
              this.formSchedules.removeAt(0);
            }

            this.form.patchValue({id: logrecord.id,
                                event: logrecord.event,
                                date: logrecord.date,
                                mileage: logrecord.mileage,
                                note: logrecord.note
            });

            Object.keys(this.form.controls).forEach(key => {
              const control = this.form.get(key);
              control.markAsPristine();
            });

            if ( data.schedules instanceof  Array && data.schedules.length > 0 && data.schedules[0].id) {
              data.schedules.forEach(schedule => this.formSchedules.push(this.fb.group(schedule)));
            } else {
              this.formSchedules.push(this.fb.group({ id: null}));
            }

            console.log('data loaded');
            resolve(null);
          });
      }
    });
  }

  ngOnInit() {
  }

  submit(data) {
    this.submitted = true;

    if (!this.form.valid) {
      return;
    }

    switch (this.action) {
      case LogAction.Add:
        this.title = 'Add Event';
        this.subtitle = 'Add new event information.';


        this.service.add(this.form.value)
        .subscribe(result => {

           this.callback(true);
           console.log('data added');
        });
      break;

      case LogAction.Edit:
        this.title = 'Edit Event';
        this.subtitle = 'Enter the event information.';
        this.service.update(this.form.value)
        .subscribe(result => {
          this.callback(true);
          console.log('data added');
        });
      break;

      case LogAction.Copy:
        this.title = 'Copy Event';
        this.subtitle = 'Add new event information.';
        this.form.value.id = null;
        this.service.add(this.form.value)
        .subscribe(result => {
          this.callback(true);
        });
      break;

      default:
        alert('Missing action.');
      break;
    }
  }

  cancel() {
    this.callback(false);
  }
}
