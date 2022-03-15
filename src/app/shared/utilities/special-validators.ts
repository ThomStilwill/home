import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';

export function NotStx(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {

    const value = control.value;

    if (!value) {
      return null;
    }
    if (value === 'STX') {
      return { 'notStx': true };
    }

    return null;
  }
}

export function MustDifferFrom(otherControlName): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {

    const form = control.parent;
    if (!form) {
      return null;
    }
    const otherControl = form.get(otherControlName);
    if (!otherControl) {
      return null;
    }

    const value = control.value;
    const otherValue = otherControl.value;

    if (!value || !otherValue) {
      return null;
    }

    if (value == otherValue) {
      return { 'mustDifferFrom': true };
    }

    const newErrors = removeError(otherControl.errors,'mustDifferFrom')
    otherControl.setErrors(newErrors);
    return null;
  }
}

export function MustDiffer(controlNameA, controlNameB): ValidatorFn {
  return (formGroup: FormGroup): ValidationErrors | null => {

    const valueA = formGroup.get(controlNameA).value;
    const valueB = formGroup.get(controlNameB).value;

    if (!valueA || !valueB) {
      return null;
    }

    if (valueA == valueB) {
      return { 'mustDiffer': true };
    }

    return null;
  }
}


function removeError(errors: any, errorName: string): any{

  if(!errors){
    return null;
  }

  if(errors[errorName]){
    delete errors[errorName];
  }

  if(Object.keys(errors).length === 0) {
    return null;
  }
  return errors;

}

