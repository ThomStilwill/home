import { Injectable} from '@angular/core';
import { Dialog } from '../dialog/dialog';
import { DialogComponent } from '../dialog/dialog.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  private dialogs: Dialog[] = [];

  constructor() { }

  add(component: any) {
    this.dialogs.push(new Dialog(component));
  }

  remove(id: string) {
    this.dialogs =  this.dialogs.filter(x => x.component.id !== id);
  }

  open(id: string, title: string) {
    const dialog = this.getDialogComponent(id);
    dialog.title = title;
    dialog.show();
  }

  close(id: string) {
    const dialog = this.getDialogComponent(id);
    dialog.hide();
  }

  private getDialogComponent(id: string): DialogComponent {
    const dialog = this.dialogs.filter(x => x.component.id === id)[0];
    return dialog.component;
  }
}

