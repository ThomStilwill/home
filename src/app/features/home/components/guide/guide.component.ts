import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as SpecialValidators from 'src/app/shared/utilities/special-validators';

@Component({
  selector: 'app-guide',
  templateUrl: './guide.component.html',
  styleUrls: ['./guide.component.scss']
})
export class GuideComponent implements OnInit {

  form: FormGroup;
  states = ['CT', 'TX', 'CA', 'VI', 'STX'];
  mask = ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];

  constructor(private fb: FormBuilder) { }

  get numberConfig(){

    return {
      decimals: this.form.controls.decimals.value
    }
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      name: [null,Validators.required],
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


}
