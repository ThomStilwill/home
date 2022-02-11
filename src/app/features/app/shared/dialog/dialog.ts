import { DialogComponent } from './dialog.component';

export class Dialog {
  component: DialogComponent;

  constructor(dialog: DialogComponent) {
    this.component = dialog;
  }
}
