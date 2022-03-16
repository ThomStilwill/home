import { Component, ElementRef, forwardRef, Injector, Input, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, ControlContainer, ControlValueAccessor, NgControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatFormFieldControl } from '@angular/material/form-field';
import { MatInput, MAT_INPUT_VALUE_ACCESSOR } from '@angular/material/input';
import { Observable, Subscription } from 'rxjs';

@Component({
  template: ''
})
export abstract class BaseInputField <T>
                implements ControlValueAccessor,
                MatFormFieldControl<any>,
                OnInit {

    _value: T = null;
    @Input() formControlName: string;
    @Input() validationMessages: object = {};
    @Input() label: string;
    @Input() hint: string;

    private subscriptions = new Subscription();

    control: AbstractControl;
    required: boolean;
    disabled: boolean;


    @ViewChild('input', { static: false}) elementRef: ElementRef;
    @ViewChild(MatInput, {static: false}) matInput: MatInput;


    constructor(protected controlContainer: ControlContainer,
                protected injector: Injector,) {}



    ngOnInit() {
      if (this.controlContainer && this.formControlName) {
          this.control = this.controlContainer.control.get(this.formControlName);
      } else {
          console.warn('Missing FormControlName');
      }
    }

    ngAfterViewInit() {
      setTimeout(() => {
        this.matInput.ngControl = this.injector.get(NgControl, null);
      });
    }

    ngOnDestroy(): void {
      this.subscriptions.unsubscribe();
    }

    stateChanges: Observable<void>;
    id: string;
    placeholder: string;
    ngControl: NgControl;
    focused: boolean;
    empty: boolean;
    shouldLabelFloat: boolean;
    errorState: boolean;
    controlType?: string;
    autofilled?: boolean;
    userAriaDescribedBy?: string;

    setDescribedByIds(ids: string[]): void {
      throw new Error('Method not implemented.');
    }
    onContainerClick(event: MouseEvent): void {
      throw new Error('Method not implemented.');
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

export function MakeProviders(type: any) {
    return [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => type),
        multi: true

    },
    {
      provide: MAT_INPUT_VALUE_ACCESSOR,
      useExisting: forwardRef(() => type)
    }
  ];
}
