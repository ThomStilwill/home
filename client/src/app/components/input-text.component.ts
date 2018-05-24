import { Component, OnInit, Input, forwardRef } from '@angular/core';
import { AbstractControl,
         ControlContainer,
         ControlValueAccessor,
         NG_VALUE_ACCESSOR } from '@angular/forms';
import { AbstractValueAccessor, MakeProvider} from './abstract-value-accessor';

@Component({
  selector: 'input-text',
  templateUrl: './input-text.component.html',
  providers: [MakeProvider(InputTextComponent)]
})

export class InputTextComponent
       extends AbstractValueAccessor<string>
        implements OnInit {

    @Input() label: string;
    @Input() placeholder: string;
    @Input() validationMessages: object;

    control: AbstractControl;

    constructor (controlContainer: ControlContainer) {
        super(controlContainer);
    }

    ngOnInit() {
        if (this.controlContainer) {
            if (this.formControlName) {
                this.control = this.controlContainer.control.get(this.formControlName);
            } else {
                console.warn('Missing FormControlName');
            }
        } else {
            console.warn('Missing FormControlName');
        }

    }
}
