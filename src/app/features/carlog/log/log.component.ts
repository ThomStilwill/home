import { Component, OnInit } from '@angular/core';
import { LoadingService } from '../shared/services/loading.service';

@Component({
  selector: 'app-log',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.scss']
})
export class LogComponent implements OnInit {

  constructor(private loading: LoadingService) { }

  ngOnInit() {
    console.log('Log Component loaded');
    //this.test();
  }

  test() {
    this.loading.show('Title...', 'a very long loading message which should extend the box.');
    setTimeout(() => {
      this.loading.hide();
    }, 4000);
  }
}
