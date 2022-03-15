import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Helper } from '../../core/services/helper.service';
import { Schedule } from '../../models/schedule';
import { ScheduleService } from '../../services/schedule.service';

@Component({
  selector: 'app-testform',
  templateUrl: './testform.component.html',
  styleUrls: ['./testform.component.scss'],
  encapsulation: ViewEncapsulation.None

})
export class TestformComponent implements OnInit {
  form: FormGroup;
  schedules: Schedule[];

  constructor(private fb: FormBuilder,
              private scheduleService: ScheduleService,
              private helper: Helper) {
    this.initForm();

    this.scheduleService.getall()
        .subscribe((schedules) => {
            this.schedules = schedules.sort((b, a) => {
              return helper.compare(a.description, b.description);
            });
        });

   }

  ngOnInit() {
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


  get formSchedules() {
    return this.form.get('schedules') as FormArray;
  }

  initSchedule() {
    return this.fb.group({id: null});
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
    return value !== 'null';
  }

  onSubmit(data) {
    console.log(data);
  }

  onCancel(data) {
    console.log('cancel');
  }

}
