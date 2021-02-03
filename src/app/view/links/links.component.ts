import { Component, OnInit, AfterViewInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { first } from 'rxjs/operators';
import { Link } from 'src/app/models/link';

declare var fitty: any;

@Component({
  selector: 'app-links',
  templateUrl: './links.component.html',
  styleUrls: ['./links.component.scss']
})
export class LinksComponent implements OnInit, AfterViewInit {

  constructor(private service: DataService) { }
  time = new Date();
  links: Link[] = [];

  values = [
    { id: 'https://forecast7.com/en/41d68n72d86/plainville/', name: 'Plainville, CT' },
    { id: 'https://forecast7.com/en/44d84n93d30/bloomington/', name: 'Bloomington, MN' },
    { id: 'https://forecast7.com/en/35d37n119d02/bakersfield/', name: 'Bakersfield, CA' },
    { id: 'https://forecast7.com/en/29d42n98d49/san-antonio/', name: 'San Antonio, TX' },
    { id: 'https://forecast7.com/en/28d36n82d69/hudson/', name: 'Hudson, FL' }
  ];

  selectedLocation = this.values[0].id;

  loadWeather(id:String) {
    let element: any;
    const parentElement:any = document.getElementsByTagName('script')[0];
    element = document.createElement('script');
    element.id = id;
    element.src = 'https://weatherwidget.io/js/widget.min.js';
    parentElement.parentNode.insertBefore(element, parentElement);
  }

  setWeatherFromName(newVal:any){
    const x = document.getElementsByClassName('weatherwidget-io');
    x[0].setAttribute('href', newVal  + '?unit=us');
    const dcName =  this.values.filter(value => {
      return value.id === newVal;
    });

    x[0].setAttribute('data-label_1', dcName[0].name);
    this.loadWeather('weatherwidget-io-js');
  }

  onChange(event:any): void {
    this.setWeatherFromName(event.value);
  }

  ngAfterViewInit() {
    const clockDiv:any = document.getElementById('clock');
    const spacerDiv:any = document.getElementById('spacer');
    const secondsDiv:any = document.getElementById('seconds');
    const tickDiv:any = document.getElementById('tick');

    setInterval(() => {
      this.time = new Date();

      const width = clockDiv.clientWidth;
      const second = this.time.getSeconds();
      const secondWidth = Math.floor(width / 60);
      const spacer = (second * secondWidth);

      spacerDiv.style.width = spacer + 'px';
      tickDiv.style.width = (secondWidth * 2).toString();
      tickDiv.style.height = (secondWidth * 2).toString();
      secondsDiv.style.height = (secondWidth).toString();

    }, 1000);

    fitty('#time');
    fitty('#day');
    fitty('#date');
  }

  ngOnInit() {
    this.service.getLinks('home').pipe(
      first()).subscribe(links => {
      this.links = links;
    });

    this.setWeatherFromName(this.values[0].id);
  }
}
