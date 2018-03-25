import { Component, OnInit, AfterViewInit  } from '@angular/core';
import {Observable} from 'rxjs/Rx';
import * as  moment from 'moment/moment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {
  time: string;
  day: string;
  date: string;
  seconds: string;
  meridiem: string;

  constructor() {
  }
  
  ngOnInit() {
    let timer = Observable.timer(0,500);
    timer.subscribe(() => this.setTime());
  }

  setTime(){

    let datetime = moment();
    this.time = datetime.format("h:mm");
    this.meridiem = datetime.format("a").toLowerCase();
    this.day = datetime.format("dddd");
    this.date = datetime.format("MMMM Do, YYYY");
    this.seconds = datetime.second().toString();
  };
}
