import { Injectable } from '@angular/core';
import { ViewContainerRef } from '@angular/core';
import { Modal } from '../modal/modal';
import { ActivatorService } from './activator.service';

@Injectable()
export class ModalService {
  private modals: Modal[] = [];

  constructor(private activator: ActivatorService) { }

  add(modalcomponent: any) {
    this.modals.push(new Modal(modalcomponent));
  }

  remove(id: string) {
    this.modals = this.modals.filter(x => x.modal.id !== id);
  }

  show(id: string, title: string, subtitle: string = null) {
    const modal: any = this.modals.filter(x => x.modal.id === id)[0];
    modal.modal.title = title;
    modal.modal.subtitle = subtitle;
    modal.modal.open();
  }

  open<T>(id: string, viewcontainer: ViewContainerRef, component: any): T {
    const modal: any = this.modals.filter(x => x.modal.id === id)[0];
    const componentref = this.activator.create<T>(viewcontainer, component);
    modal.ref = componentref;
    return componentref.instance;
  }

  close(id: string) {
    const modal: any = this.modals.filter(x => x.modal.id === id)[0];
    modal.ref.destroy();
    modal.modal.close();
  }
}
