import { Component,  Injector} from '@angular/core';
import { ControlContainer} from '@angular/forms';
import { BaseInputField, MakeProviders } from './base-input-field';

@Component({
  selector: 'input-text',
  templateUrl: './input-text.component.html',
  providers: MakeProviders(InputTextComponent)
})

export class InputTextComponent extends BaseInputField<string>
{
  constructor(injector: Injector,
              controlContainer: ControlContainer) {
              super(controlContainer, injector)
  }

}
