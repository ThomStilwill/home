import { Component, OnInit, AfterContentInit } from '@angular/core';
import { Store, select } from '@ngrx/store'
import { Observable } from 'rxjs';

import General from 'src/app/shared/utilities/general';
import { HomeState } from "./store/home.state";
import { GoogleActions, googleSelector } from './store';
import { LinkBase } from './store/models/linkbase.model';
import { AutoUnsubscribe } from 'src/app/shared/decorators/auto.unsubscribe';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-Home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
@AutoUnsubscribe()
export class HomeComponent implements OnInit, AfterContentInit {

  links$: Observable<LinkBase[]>;

  title = 'Stilwill.net';
  version = '2.0';
  copyrightYear = new Date().getFullYear();
  googleLinks: LinkBase[];

  constructor(private store: Store<HomeState>,
              private titleService: Title) {  

    this.links$ = this.store.pipe(select(googleSelector));

    this.links$.subscribe(links => {
      this.googleLinks = links;
    });

    this.store.dispatch(GoogleActions.loadGoogle());
  }

  ngOnInit() {
    
  }

  ngAfterContentInit() {
    const items = ["Loading...","3","2","1",this.title];
    General.delayTitle(items, this.setTitle(this));
  }

  setTitle(ctx: any) {
    return (x:string) => {
      ctx.titleService.setTitle(x);
    }
  }
}
