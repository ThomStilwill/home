import { Component, OnInit, Input } from '@angular/core';
import { AbstractControl, ControlContainer } from '@angular/forms';
import { AbstractValueAccessor, MakeProvider} from './abstract-value-accessor';
import { DebugService } from '../services/debug.service';

@Component({
  selector: 'input-text',
  templateUrl: './input-text.component.html',
  providers: [MakeProvider(InputTextComponent)]
})

export class InputTextComponent
       extends AbstractValueAccessor<string>
        implements OnInit {

    @Input() label: string;
    @Input() type = 'text';
    @Input() placeholder: string;
    @Input() help: string;
    @Input() validationMessages: object = {};
    @Input() mask;

    debug = false;

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
