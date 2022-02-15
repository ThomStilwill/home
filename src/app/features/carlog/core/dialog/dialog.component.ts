import { Component, OnInit, ElementRef, OnDestroy, Input, ViewEncapsulation } from '@angular/core';
import { DialogService } from '../services/dialog.service';

@Component({
  selector: 'dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DialogComponent implements OnInit, OnDestroy {

  @Input() id: string;
  hidden: boolean;
  title: string;

  private element: any;

  constructor(private service: DialogService, private el: ElementRef) {
    this.element = el.nativeElement;
    this.title = 'Dialog Title';
}

  ngOnInit() {
    if (!this.id) {
      console.error('Dialog is missing an id.');
      return;
    }

    document.body.appendChild(this.element);

    this.element.addEventListener('click', function (e: any) {
      if (e.target.className === 'modal__close-btn') {
        this.close();
      }
    });

    this.service.add(this);
  }

  ngOnDestroy() {
    this.service.remove(this.id);
    this.element.remove();
  }

  close() {
    this.service.close(this.id);
  }

  show() {
    this.element.style.display = 'block';
    document.body.classList.add('modal-open');
    this.hidden = false;
  }

  hide() {
    this.element.style.display = 'none`';
    document.body.classList.remove('modal-open');
    this.hidden = true;
  }
}
