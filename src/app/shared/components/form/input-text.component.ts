import { Component,  Injector} from '@angular/core';
import { ControlContainer} from '@angular/forms';
import { InputFieldBase, MakeProviders } from './input-field-base';

@Component({
  selector: 'text',
  templateUrl: './input-text.component.html',
  providers: MakeProviders(InputTextComponent)
})

export class InputTextComponent extends InputFieldBase<string>
{
  constructor(injector: Injector,
              controlContainer: ControlContainer) {
              super(controlContainer, injector)
  }

}
