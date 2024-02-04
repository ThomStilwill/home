import { Component, OnInit, AfterContentInit, ViewEncapsulation } from '@angular/core';
import { Store, createSelector, select } from '@ngrx/store'
import { Observable } from 'rxjs';

import General from 'src/app/shared/utilities/general';
import { HomeState } from "./store/home.state";
import { GoogleActions, 
         googleSelector,
         menuSelector
         } from './store';
import { LinkBase } from './store/models/linkbase.model';
import { AutoUnsubscribe } from 'src/app/shared/decorators/auto.unsubscribe';
import { Title } from '@angular/platform-browser';
import { Menu } from './store/menu/menu';
import { MenuActions } from './store/menu/menu.actions';

@Component({
  selector: 'app-Home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None
})
@AutoUnsubscribe()
export class HomeComponent implements OnInit, AfterContentInit {

  links$: Observable<LinkBase[]>;
  menu$: Observable<Menu[]>;   //= this.store.pipe(select(menuSelector('Network')));
  
  title = 'Stilwill.net';
  version = '2.0';
  copyrightYear = new Date().getFullYear();
  googleLinks: LinkBase[];

  constructor(private store: Store<HomeState>,
              private titleService: Title) {  
    
    this.store.dispatch(GoogleActions.loadGoogle());
    this.store.dispatch(MenuActions.loadMenus());

    this.links$ = this.store.pipe(select(googleSelector));
    this.menu$ = this.store.pipe(select(menuSelector('Network')));

    this.menu$.subscribe(menus => {
      console.log(JSON.stringify(menus));
    })
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
