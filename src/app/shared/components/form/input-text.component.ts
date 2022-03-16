import { Component,  Input,  OnInit,  AfterViewInit,  ViewChild,  Injector,  OnDestroy,  forwardRef, ElementRef} from '@angular/core';
import { ControlValueAccessor,  NG_VALUE_ACCESSOR,  NgControl,  ControlContainer,  AbstractControl, Validator, ValidationErrors, FormControl, FormGroupDirective} from '@angular/forms';
import { MatFormFieldControl } from '@angular/material/form-field';
import { MatInput, MAT_INPUT_VALUE_ACCESSOR } from '@angular/material/input';
import { Observable, Subscription } from 'rxjs';
import { BaseInputField } from './base-input-field';


@Component({
  selector: 'input-text',
  templateUrl: './input-text.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputTextComponent),
      multi: true
    },
    {
      provide: MAT_INPUT_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputTextComponent)
    }
  ]
})

export class InputTextComponent extends BaseInputField<string>
                                implements
                                OnDestroy,
                                AfterViewInit,
                                MatFormFieldControl<any>
  {
  private subscriptions = new Subscription();
  @Input() formControlName: string;
  @Input() validationMessages: object = {};
  @Input() label: string;
  @Input() hint: string;

  @Input() readonly = false;
  @ViewChild('textinput', { static: false}) elementRef: ElementRef;
  @ViewChild(MatInput, {static: false}) matInput: MatInput;

  //fieldvalue: any = null;


  constructor(private injector: Injector,
              controlContainer: ControlContainer) {
              super(controlContainer)
  }


  stateChanges: Observable<void>;
  id: string;
  ngControl: NgControl;
  focused: boolean;
  empty: boolean;
  shouldLabelFloat: boolean;
  required: boolean;
  disabled: boolean;
  controlType?: string;
  autofilled?: boolean;
  placeholder: string;
  userAriaDescribedBy?: string;

  setDescribedByIds(ids: string[]): void {
    throw new Error('Method not implemented.');
  }
  onContainerClick(event: MouseEvent): void {
    throw new Error('Method not implemented.');
  }


  ngAfterViewInit() {
    setTimeout(() => {
      this.matInput.ngControl = this.injector.get(NgControl, null);
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  get errorState() {
    return this.ngControl.errors !== null && !!this.ngControl.touched;
  }

  // get value(): any {
  //   return this.fieldvalue;
  // }

  // set value(value: any) {
  //   if (value !== this.fieldvalue) {
  //     this.fieldvalue = value;
  //     this.onChange(value);
  //   }
  // }

  // writeValue(value: any) {
  //   this.fieldvalue = value;
  //   this.onChange(value);
  //   if (this.elementRef) {
  //     this.elementRef.nativeElement.value = value;
  //   }
  // }

  // onChange = (val: any) => {};
  // onTouched = () => {};
  // registerOnChange(fn: any): void { this.onChange = fn; }
  // registerOnTouched(fn: any): void { this.onTouched = fn; }
  // setDisabledState?(isDisabled: boolean): void {
  //   this.disabled = isDisabled;
  // }
}
