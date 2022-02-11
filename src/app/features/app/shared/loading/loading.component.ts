import { Component, OnInit, OnDestroy } from '@angular/core';
import { LoadingService } from '../services/loading.service';
import { LoadingState } from '../modal/loading.state';
import { Subscription } from 'rxjs';

@Component({
  selector:    'app-loading',
  templateUrl: 'loading.component.html',
  styleUrls:   ['loading.component.scss']
})
export class LoadingComponent implements OnInit, OnDestroy {
  show = false;
  message: string;
  title: string;
  private subscription: Subscription;

  constructor(private loadingService: LoadingService) {}

  ngOnInit(): void {
    this.subscription = this.loadingService.loadingState.subscribe(
      (state: LoadingState) => {
        this.show = state.show;
        this.message = state.message;
        this.title = state.title;
      }
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
