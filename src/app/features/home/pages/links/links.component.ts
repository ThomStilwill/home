import { Component, OnInit, AfterViewInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { Link } from 'src/app/shared/models/link';
import { Weather } from 'src/app/shared/models/weather';
import { DataService } from 'src/app/shared/services/data.service';

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
  values: Weather[] = [];
  selectedLocation:string;

  loadWeather(id:String) {
    let element: any;
    const parentElement:any = document.getElementsByTagName('script')[0];
    element = document.createElement('script');
    element.id = id;
    element.src = 'https://weatherwidget.io/js/widget.min.js';
    parentElement.parentNode.insertBefore(element, parentElement);
  }

  setWeatherFromName(id:string){
    const x = document.getElementsByClassName('weatherwidget-io');
    const dcName =  this.values.filter(value => {
      return value.id === id;
    });

    x[0].setAttribute('href', dcName[0].id  + '?unit=us');
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
    this.service.getItems<Link>('links-home').pipe(
      first()).subscribe(links => {
      this.links = links;
    });

    this.service.getItems<Weather>('weather').pipe(
      first()).subscribe(values => {
      this.values = values;
      this.selectedLocation = this.values[0].id;
      this.setWeatherFromName(this.selectedLocation);
    });
  }
}
