import { Component,  Injector, Input} from '@angular/core';
import { ControlContainer} from '@angular/forms';
import { MakeProviders, InputFieldBase } from './input-field-base';


@Component({
  selector: 'dropdown',
  templateUrl: './input-select.component.html',
  providers: MakeProviders(InputSelectComponent)
})

export class InputSelectComponent extends InputFieldBase<string>
{

  @Input() items: any[];

  constructor(injector: Injector,
              controlContainer: ControlContainer) {
              super(controlContainer, injector)
  }

}
