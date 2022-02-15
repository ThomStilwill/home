import { Component, ElementRef, Input, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { ModalService } from '../services/modal.service';

@Component({
    selector: 'app-modal',
    templateUrl: './modal.component.html',
    styleUrls: ['./modal.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class ModalComponent implements OnInit, OnDestroy {
    @Input() id: string;
    private element: any;
    show: boolean;
    title: string;
    subtitle: string;

    constructor(private modalService: ModalService, private el: ElementRef) {
        this.element = el.nativeElement;
        this.title = 'Title: do stuff';
    }

    ngOnInit(): void {

        if (!this.id) {
            console.error('modal must have an id');
            return;
        }

        document.body.appendChild(this.element);

        // this.element.addEventListener('click', function (e: any) {
        //     if (e.target.className === 'modal') {
        //         modal.close();
        //     }
        // });

        this.modalService.add(this);
    }

    ngOnDestroy(): void {
        this.modalService.remove(this.id);
        this.element.remove();
    }

    open(): void {
        this.element.style.display = 'block';
        document.body.classList.add('modal-open');
        this.show = true;
    }

    close(): void {
        this.element.style.display = 'none';
        document.body.classList.remove('modal-open');
        this.show = false;
    }
}
