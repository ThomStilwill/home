import { Component, OnInit, AfterContentInit } from '@angular/core';
import { Link } from './models/link';
import { DataService } from './services/data.service';
import { first } from 'rxjs/operators';
import { Title } from '@angular/platform-browser';
import  General from './utilities/general';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterContentInit {
  title = 'Stilwill.net';
  version = '2.0';
  copyrightYear = new Date().getFullYear();
  googleLinks: Link[];

  constructor(private service: DataService,
              private titleService: Title) {
  }

  ngOnInit() {
    this.service.getLinks('google').pipe(
      first()).subscribe(links => {
      this.googleLinks = links;
    });
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
