import { Directive, Output, HostListener, EventEmitter } from '@angular/core';

@Directive({
  selector: '[mouseWheel]'
})

export class MouseWheelDirective {
  @Output() mouseWheelUp = new EventEmitter();
  @Output() mouseWheelDown = new EventEmitter();

  @HostListener('mousewheel', ['$event']) onMouseWheelChrome(event: any) {
    this.mouseWheelFunc(event);
  }

  @HostListener('DOMMouseScroll', ['$event']) onMouseWheelFirefox(event: any) {
    this.mouseWheelFunc(event);
  }

  @HostListener('onmousewheel', ['$event']) onMouseWheelIE(event: any) {
    this.mouseWheelFunc(event);
  }

  mouseWheelFunc(mouseevent: any) {
    const event = window.event || mouseevent; // old IE support
    const delta = Math.max(-1, Math.min(1, (event.wheelDelta || -event.detail)));
    if(delta > 0) {
        this.mouseWheelUp.emit(event);
    } else if(delta < 0) {
        this.mouseWheelDown.emit(event);
    }

    event.returnValue = false; // for IE

    if (event.preventDefault) { // for Chrome and Firefox
        event.preventDefault();
    }
  }
}
