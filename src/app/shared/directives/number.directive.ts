import { Directive, ElementRef, forwardRef, HostListener, Input, OnChanges, Provider, Renderer2} from '@angular/core'
import { NG_VALUE_ACCESSOR, ControlValueAccessor} from '@angular/forms'
import { DecimalPipe } from '@angular/common'

export const MASKEDINPUT_VALUE_ACCESSOR: Provider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => FormatNumberDirective),
  multi: true
}

interface IFormatNumberConfig {
  integers?: number;
  decimals?: number;
}

@Directive({
  // host: {
  //   '(input)': 'onInput($event)',
  //   '(blur)': 'onBlur()',
  //   '(focus)': 'onFocus()'
  // },
  selector: '[number]',
  exportAs: 'number',
  providers: [MASKEDINPUT_VALUE_ACCESSOR, DecimalPipe]
})
export class FormatNumberDirective implements ControlValueAccessor, OnChanges {
  @Input('number') numberConfig = {  }

  config: IFormatNumberConfig;

  default: IFormatNumberConfig = {
    integers: 0,
    decimals: 0
  }

  modelValue: number;

  set value(value) {
    this.modelValue = value;
    this.onChange(value);
    this.onTouched();
  }

  get value(){
    return this.modelValue;
  }

  get allowedCharsRegex() {
    return  (this.config.decimals === 0) ? '\\d*' : `\\d*(\\.\\d{0,${this.config.decimals}})?`;
  }

  get decimalFormat() {
    return `${this.config.integers}.${this.config.decimals}-${this.config.decimals}`;
  }

  constructor(
    private _renderer: Renderer2,
    private _elementRef: ElementRef,
    private decimalPipe: DecimalPipe
  )
  {
    this.config = {...this.default, ...this.numberConfig};
  }

  ngOnChanges(): void {
    this.config = {...this.default, ...this.numberConfig};
  }

  @HostListener('input',['$event'])
  onInput(e) {
    const originalValue = this.value;
    let value = e.target.value;
    console.log(`handle input: ${value}`);

    const regex = new RegExp(`^${this.allowedCharsRegex}$`);
    const test = regex.test(value);
    console.log(`${value} valid: ${test}  regex: ${regex}`)

    if(!test) {
      value = originalValue;
    }
    else {
      this.value = value;
    }

    this._renderer.setProperty(this._elementRef.nativeElement, 'value', value)
  }

  _handleChange(value) {
    this.setFormatValue(value);
  }

  @HostListener('blur')
  onBlur(){
    this.setFormatValue(this.value);
  }

  @HostListener('focus')
  onFocus(){
    this._renderer.setProperty(this._elementRef.nativeElement, 'value', this.value)
    //this.setFormatValue(this.value);
  }

  writeValue(value: any) {
    this.setFormatValue(value);
  }

  setFormatValue(value: any) {
    let formattedValue = '';
    if(!value) {
      this.value = null;
    } else {
      const regex = /[^0-9.]/g;
      const cleanedValue = value.toString().replace(regex, '');
      const number = Number(cleanedValue);
      const x = Math.pow(10,this.config.decimals);
      this.value = Math.round(number * x) / x;
      formattedValue = this.decimalPipe.transform(cleanedValue,this.decimalFormat);
    }

    this._renderer.setProperty(this._elementRef.nativeElement, 'value', formattedValue)
  }

  onChange = (_: any) => {}
  onTouched = () => {}
  registerOnChange(fn: (_: any) => void): void { this.onChange = fn }
  registerOnTouched(fn: () => void): void { this.onTouched = fn }
  setDisabledState(isDisabled: boolean): void {
    this._renderer.setProperty(this._elementRef.nativeElement, 'disabled', isDisabled)
  }
}
