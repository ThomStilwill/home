import { Component, OnInit, AfterContentInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { Title } from '@angular/platform-browser';
import { Link } from 'src/app/shared/models/link';
import { DataService } from 'src/app/shared/services/data.service';
import General from 'src/app/shared/utilities/general';

@Component({
  selector: 'app-Home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterContentInit {
  title = 'Stilwill.net';
  version = '2.0';
  copyrightYear = new Date().getFullYear();
  googleLinks: Link[];

  constructor(private service: DataService,
              private titleService: Title) {
  }

  ngOnInit() {
    this.service.getItems<Link>('links-google').pipe(
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
