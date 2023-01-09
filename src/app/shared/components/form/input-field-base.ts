import { Component, ElementRef, forwardRef, HostListener, Injector, Input, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, ControlContainer, ControlValueAccessor, FormControl, FormGroupDirective, NgControl, NgForm, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatFormFieldControl } from '@angular/material/form-field';
import { MatInput, MAT_INPUT_VALUE_ACCESSOR } from '@angular/material/input';
import { MatSelect } from '@angular/material/select';
import { Observable, Subscription } from 'rxjs';

@Component({
  template: ''
})
export abstract class InputFieldBase <T>
                implements ControlValueAccessor,
                MatFormFieldControl<any>,
                OnInit {

    _value: T = null;
    @Input() formControlName: string;
    @Input() validationMessages: object = {};
    @Input() label: string;
    @Input() hint: string;
    @Input() errors: any = null;
    @Input() validations = [];

    private subscriptions = new Subscription();

    control: AbstractControl;

    @Input() disabled = false;
    @Input() readonly = false;

    required: boolean;
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

    @ViewChild('input', { static: false}) elementRef: ElementRef;
    @ViewChild(MatInput, {static: false}) matInput: MatInput;
    @ViewChild(MatSelect, {static: false}) matSelect: MatInput;

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

      if(this.matInput){
        setTimeout(() => {
          this.matInput.ngControl = this.injector.get(NgControl, null);
        });
      }
      if(this.matSelect){
        setTimeout(() => {
          this.matSelect.ngControl = this.injector.get(NgControl, null);
        });
      }
    }

    ngOnDestroy(): void {
      this.subscriptions.unsubscribe();
    }

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

    errorMatcher() {
      return new CustomFieldErrorMatcher(this.control, this.errors)
    }

    readonly errorStateMatcher: ErrorStateMatcher = {
      isErrorState: (ctrl: FormControl) => (ctrl && ctrl.invalid)
    };
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

export class CustomFieldErrorMatcher implements ErrorStateMatcher {
  constructor(private control: AbstractControl,private errors:any) { }

  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    return this.control && this.control.errors
            && (this.control.touched || form.submitted);
  }
}
