import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'validations',
  templateUrl: './validations.component.html',
  styleUrls: ['./validations.component.scss']
})
export class ValidationsComponent implements OnInit, OnChanges {
  @Input() controlName: string;
  @Input() form: FormGroup;
  @Input() label: string;

  private defaultMessages: object;
  messages: {};

  get control(): AbstractControl {
    return this.form.controls[this.controlName];
  }

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {

  }

  ngOnInit(): void {
    this.defaultMessages = {
      required: `${this.label} is required.`,
      pattern:  `${this.label} is invalid.`,
      minlength:  `${this.label} is too short.`,
      maxlength:  `${this.label} is too long.`,
      max:  `${this.label} is too large.`,
      min:  `${this.label} is too small.`,
      even:  `${this.label} is even.`,
    };

    const messages = {...this.defaultMessages}; //, ...controlMessages};

    if (messages) {
      this.messages = messages;
    }
  }

  errors(){

    if(!this.control.errors) {
      return [];
    }

    const messages = new Array<string>();

    Object.keys(this.control.errors).forEach(key => {
      messages.push(this.messages[key]);
    })

    return messages;
  }

  showValidationMessages() {
    const show =  this.control && this.control.errors
            && (this.control.touched); // || this.form.submitted);
    return show;
  }

}
