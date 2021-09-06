import { Component, OnInit } from '@angular/core';
import { HttpClient  } from '@angular/common/http';
import * as Bowser from 'bowser';

@Component({
  selector: 'app-ping',
  templateUrl: './ping.component.html',
  styleUrls: ['./ping.component.scss']
})
export class PingComponent implements OnInit {

  userAgent = Bowser.parse(window.navigator.userAgent);
  browser = Bowser.getParser(window.navigator.userAgent);
  userAgentDetails = JSON.stringify(this.userAgent, null, 4);
  browserDetails = JSON.stringify(this.browser.getBrowser(), null, 4);

  ipAddress = '';

  constructor(private http:HttpClient) { }

  ngOnInit() {
    this.getIPAddress();
}

  getIPAddress()
  {
    this.http.get("http://api.ipify.org/?format=json").subscribe((res:any)=>{
      this.ipAddress = res;
    });
}
}
