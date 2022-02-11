import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { LoadingState } from '../modal/loading.state';

@Injectable()
export class LoadingService {
  private loadingSubject = new Subject<LoadingState>();
  loadingState = this.loadingSubject.asObservable();
  private done = false;

  show(title: string = 'Loading...', message: string = null) {
    this.done = false;
    setTimeout( () => {
      if (!this.done) {
        this.loadingSubject.next(<LoadingState>{show: true, message: message, title: title});
      }
    }, 500);
  }

  hide() {
    this.done = true;
    this.loadingSubject.next(<LoadingState>{show: false});
  }
}
