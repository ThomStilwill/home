import { Component, OnInit } from '@angular/core';
import { Link } from './models/link';
import { DataService } from './services/data.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Stilwill.net';
  version = '2.0';
  copyrightYear = new Date().getFullYear();
  googleLinks: Link[];

  constructor(private service: DataService) { }

  ngOnInit() {
    this.service.getLinks('google').pipe(
      first()).subscribe(links => {
      this.googleLinks = links;
    });

  }
}
