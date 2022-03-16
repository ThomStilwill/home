import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'validations',
  templateUrl: './validations.component.html',
  styleUrls: ['./validations.component.scss']
})
export class ValidationsComponent implements OnInit {
  @Input() control: AbstractControl;
  @Input() label: string;

  private messages: object;
  constructor() { }

  ngOnInit(): void {
    const defaultMessages = {
      required: `${this.label} is required.`,
      pattern:  `${this.label} is invalid.`,
      minlength:  `${this.label} is too short.`,
      maxlength:  `${this.label} is too long.`,
      max:  `${this.label} is too large.`,
      min:  `${this.label} is too small.`,
      even:  `${this.label} is even.`,
    };
    this.messages= {...defaultMessages}; //, ...controlMessages};
  }


  get errorMessages(){

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
