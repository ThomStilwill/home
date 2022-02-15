import { Component, OnInit, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DebugService } from '../../services/debug.service';
import { EventEmitter } from 'events';

@Component({
  selector: 'edit-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  @Input() formGroup: FormGroup;
  @Output() submitEvent = new EventEmitter();
  @Output() cancelEvent = new EventEmitter();

  submitted = false;
  debug = false;

  constructor(private debugService: DebugService) {  }

  ngOnInit() {
    this.debugService.active.subscribe(
      active => {
        this.debug = active;
      });
   }

  showBanner() {
    let oneControlInvalid = false;
    Object.keys(this.formGroup.controls).forEach(key => {
      const control = this.formGroup.get(key);
      if (control.touched && !control.valid) {
        oneControlInvalid = true;
      }
    });

    return oneControlInvalid && (this.submitted || !this.formGroup.valid);
  }

  submit(data) {
    this.submitted = true;

    if (!this.formGroup.valid) {
      return;
    }
    this.submitEvent.emit(data);
  }

  cancel(data) {
    this.cancelEvent.emit(data);
  }
}
