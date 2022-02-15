import { FormGroup } from "@angular/forms";

export abstract class FormBase {

  form: FormGroup;
  submitted = false;

  submit(data) {
    this.submitted = true;

    if (!this.form.valid) {
      return;
    }

    this.onSubmit(data);
  }

  public abstract onSubmit(data: any);

  showBanner() {
    let oneControlInvalid = false;
    Object.keys(this.form.controls).forEach(key => {
      const control = this.form.get(key);
      if (control.touched && !control.valid) {
        oneControlInvalid = true;
      }
    });

    return oneControlInvalid && (this.submitted || !this.form.valid);
  }
}
