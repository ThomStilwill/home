import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { AbstractControl, ControlContainer, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  template: ''
})
export abstract class BaseInputField <T>
                implements ControlValueAccessor,
                OnInit {

    _value: T = null;
    @Input() formControlName: string;

    control: AbstractControl;

    disabled: boolean;

    constructor(protected controlContainer: ControlContainer) {}

    ngOnInit() {
      if (this.controlContainer && this.formControlName) {
          this.control = this.controlContainer.control.get(this.formControlName);
      } else {
          console.warn('Missing FormControlName');
      }
    }



    get value(): T {
      return this._value;
    }

    set value(v: T) {
      if (v !== this._value) {
        this._value = v;
        this.onChange(v);
      }
    }

    writeValue(value: T) {
      this._value = value;
      this.onChange(value);
    }

    onChange = (_) => {};
    onTouched = () => {};

    registerOnChange(fn: (_: T) => void): void {
      this.onChange = fn;
    }

    registerOnTouched(fn: () => void): void {
      this.onTouched = fn;
    }

    setDisabledState?(isDisabled: boolean): void {
      this.disabled = isDisabled;
    }
}

export function MakeProvider(type: any) {
    return {
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => type),
        multi: true
    };
}
