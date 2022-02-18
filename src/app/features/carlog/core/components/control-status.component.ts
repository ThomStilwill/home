import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DebugService } from '../services/debug.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'control-status',
  template: `<span class="control-status" *ngIf="debug">[{{status()}}]</span>`
})
export class ControlStatusComponent {

  @Input() control: FormControl;
  debug: boolean;

  constructor(private debugService: DebugService) {}

  ngOnInit() {
    this.debugService.active.subscribe(
      active => {
        this.debug = active;
      });
   }

  status() {
    let status = '';
    const control: FormControl = this.control;
    if (control){
      status += control.touched ? 'T' : 't';
      status += control.dirty ? 'D' : 'd';
      status += control.valid ? 'V' : 'v';
    }else {
      console.log('control not found.');
    }
    return status;
  }
}
