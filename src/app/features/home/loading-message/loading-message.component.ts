import { Component } from '@angular/core';
import { HomeState, progressSelector } from '../store/home.store';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'loading-message',
  templateUrl: './loading-message.component.html',
  styleUrls: ['./loading-message.component.scss']
})

export class LoadingMessageComponent {
  loading$: Observable<string>;

  constructor(private store: Store<HomeState>) {}

  ngOnInit() {
    this.loading$ = this.store.pipe(select(progressSelector));
  }
}
