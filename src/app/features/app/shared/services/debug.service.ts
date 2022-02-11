import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DebugService {

  // TODO - this approach needs reasearch

  private activeSubject = new Subject<boolean>();
  active = this.activeSubject.asObservable();

  setActive(value: boolean) {
    this.activeSubject.next(value);
  }
}
