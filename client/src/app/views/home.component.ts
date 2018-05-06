import { Component, OnInit, AfterViewInit  } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import * as  moment from 'moment/moment';
import { LinkService } from '../services/link.service';
import { Link } from '../services/link';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [LinkService]
})

export class HomeComponent implements OnInit {
  time: string;
  day: string;
  date: string;
  seconds: number;
  meridiem: string;
  links: Array<Link>;

  constructor(private linkService: LinkService) {
  }

  ngOnInit() {
    const timer = Observable.timer(0, 500);
    timer.subscribe(() => this.setTime());
    this.links = this.linkService.getLinks();
  }

  setTime() {

    const datetime = moment();
    this.time = datetime.format('h:mm');
    this.meridiem = datetime.format('a').toLowerCase();
    this.day = datetime.format('dddd');
    this.date = datetime.format('MMMM Do, YYYY');
    this.seconds = datetime.second();
  }
}
