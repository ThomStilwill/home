import { Component,  Input,  OnInit,  AfterViewInit,  ViewChild,  Injector,  OnDestroy,  forwardRef, ElementRef} from '@angular/core';
import { ControlValueAccessor,  NG_VALUE_ACCESSOR,  NgControl,  ControlContainer,  AbstractControl, Validator, ValidationErrors, FormControl} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatFormFieldControl } from '@angular/material/form-field';
import { MatInput, MAT_INPUT_VALUE_ACCESSOR } from '@angular/material/input';
import { Observable, Subscription } from 'rxjs';

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

export class InputTextComponent
       implements ControlValueAccessor,
                  OnInit,
                  OnDestroy,
                  AfterViewInit,
                  MatFormFieldControl<any>,
                  Validator  {
  private subscriptions = new Subscription();
  @Input() formControlName: string;
  @Input() validationMessages: object = {};
  @Input() label: string;
  @Input() hint: string;

  @Input() readonly = false;
  @ViewChild('textinput', { static: false}) elementRef: ElementRef;
  @ViewChild(MatInput, {static: false}) matInput: MatInput;

  fieldvalue: any = null;
  control: AbstractControl;

  constructor(private injector: Injector,
              private controlContainer: ControlContainer) {
  }

  validate(control: AbstractControl): ValidationErrors | null {
    if (control?.value.length <= 5) {
      this.errorState = true;
      return {
        tooShort: true
      };
    }
    this.errorState = false;
    return null;
  }

  registerOnValidatorChange?(fn: () => void): void {
    throw new Error('Method not implemented.');
  }
  stateChanges: Observable<void>;
  id: string;
  ngControl: NgControl;
  focused: boolean;
  empty: boolean;
  shouldLabelFloat: boolean;
  required: boolean;
  disabled: boolean;
  errorState: boolean;
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

  readonly errorStateMatcher: ErrorStateMatcher = {
    isErrorState: (ctrl: FormControl) => {
      console.log('errorStateMatch...')
      this.errorState = true;
      return (ctrl && ctrl.invalid);
    }
  };

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

  get value(): any {
    // console.log('text get: ' + this.fieldvalue);
    return this.fieldvalue;
  }

  set value(value: any) {
    if (value !== this.fieldvalue) {
      this.fieldvalue = value;
      this.onChange(value);
      // console.log('text set: ' + this.fieldvalue);
    }
  }

  writeValue(value: any) {
    this.fieldvalue = value;
    this.onChange(value);
    if (this.elementRef) {
      this.elementRef.nativeElement.value = value;
    }
    // console.log('text write: ' + this.fieldvalue);
  }

  onChange = (val: any) => {};
  onTouched = () => {};
  registerOnChange(fn: any): void { this.onChange = fn; }
  registerOnTouched(fn: any): void { this.onTouched = fn; }
  setDisabledState?(isDisabled: boolean): void {
    this.matInput.disabled = isDisabled;
  }
}
