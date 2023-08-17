import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import  General from '../../../../shared/utilities/general';
import * as SpecialValidators from 'src/app/shared/utilities/special-validators';

@Component({
  selector: 'test-form',
  templateUrl: './testform.component.html',
  styleUrls: ['./testform.component.scss']
})
export class TestFormComponent implements OnInit {

  form: FormGroup;
  states = ['CT', 'TX', 'CA', 'VI', 'STX'].map(state => {
    return {
      value: state,
      display: state
    }
  });

  mask = ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];

  stateValidations = {mustDifferFrom: "Must not match 'From State'",
                      mustDiffer: "'From State' and 'To State' must differ.",
                      notStx: "Can not be STX."};
  nameValidations =  {notbob: "Can't be Bob"};
  countValidations = { even:  `Count can't be even.`};

  constructor(private fb: FormBuilder) { }

  get numberConfig(){

    return {
      decimals: this.form.controls.decimals.value
    }
  }

  ngOnInit(): void {

    this.form = this.fb.group({
      name: [null,[Validators.required, this.NotBobValidator]],
      amount: [1433.52,Validators.required],
      quantity: [67,Validators.required],
      count: [34555, [Validators.required,Validators.max(100),Validators.min(1000),this.EvenValidator]],
      decimals: [2],
      readonly: [false],
      disabled: [false],
      from: ['STX',[Validators.required, SpecialValidators.NotStx(),
         SpecialValidators.MustDifferFrom('to')
        ]],
      to: ['STX',[Validators.required,
        SpecialValidators.MustDifferFrom('from')
      ]]
    },
    {
      //validator: [SpecialValidators.MustDiffer('from','to')]
    })
  }

  EvenValidator(control: AbstractControl) {
    const value = control.value;

    if(!value || isNaN(value)) {
      return null;
    }
    const n = Number(value);

    if (n === 0 || !!(n && !(n%2))) {
      return { even: true };
    }

    return null;
  }

  NotBobValidator(control: AbstractControl) {
    const value = control.value;

    if (value === 'bob') {
      return { notbob: true };
    }

    return null;
  }

  get formstate(){
    const controls = General.iterateOver(this.form.controls)
    return controls.filter(c => c.errors).map((control: FormControl) => {
      return {
        control: control.value,
        errors: control.errors
      }
    })
  }
}

