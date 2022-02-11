import { Component, OnInit } from '@angular/core';
import { VehicleService } from '../../services/vehicle.service';
import { Validators, FormBuilder } from '@angular/forms';
import { LogAction } from '../../models/log-action';
import { Vehicle } from '../../models/vehicle';
import { FormBase } from './form-base';

@Component({
  selector: 'app-vehicle-edit',
  templateUrl: './vehicle-edit.component.html',
  styleUrls: ['./vehicle-edit.component.scss']
})
export class VehicleEditComponent extends FormBase
                                  implements OnInit {


  action: LogAction;
  parent: object;
  callback: Function;
  title: string;
  subtitle: string;

  constructor(private service: VehicleService,

              private fb: FormBuilder) {
    super();
    this.title = 'Maintenance Activity';
    this.subtitle = 'Enter the maintenance event.';
    this.initForm();
  }

  ngOnInit() {  }

  initForm() {
    this.form = this.fb.group({
      id: null,
      name: [null, Validators.required],
      year: null,
      description: [null, Validators.required]
    });
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
            const logrecord = new Vehicle();
            Object.assign(logrecord, data);

            this.form.patchValue({id: logrecord.id,
                                name: logrecord.name,
                                description: logrecord.description,
                                year: logrecord.year
            });

            Object.keys(this.form.controls).forEach(key => {
              const control = this.form.get(key);
              control.markAsPristine();
            });

            resolve(null);
          });
      }
    });
  }


  onSubmit(data: any) {

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
