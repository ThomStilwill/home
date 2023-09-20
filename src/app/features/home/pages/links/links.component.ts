import { Component, OnInit } from '@angular/core'
import { Store, select } from '@ngrx/store'
import { Link } from '../../store/link/link.model'
import { Station } from 'src/app/shared/models/station'
import { DataService } from 'src/app/shared/services/data.service'
import { linksSelector, stationSelector, LinkState, LinkActions } from '../../store/home.store'


declare var fitty: any

@Component({
  selector: 'app-links',
  templateUrl: './links.component.html',
  styleUrls: ['./links.component.scss']
})
export class LinksComponent implements OnInit {

  links$ = this.store.pipe(select(linksSelector));
  stations$ = this.store.pipe(select(stationSelector));

  time = new Date()
  links: Link[] = []
  stations: Station[] = []
  selectedStation:string

  constructor(private service: DataService, private store: Store<LinkState>) {  }

  ngOnInit() {

    this.store.dispatch(LinkActions.loadLinks({loading:'Loading links'}))
    this.store.dispatch(LinkActions.loadWeather({loading:'Loading stations'}))

    this.stations$.subscribe(stations => {
      if(stations.length>0)
      {
        this.stations = stations
        this.selectedStation = this.stations[0].id
      }
    })
  }

  onChange(event:any): void {
    if(this.stations.length>0)
    {
      this.setWeatherFromName(event.value)
    }
  }

  loadWeather(id:String) {
    let element: any
    const parentElement:any = document.getElementsByTagName('script')[0]
    element = document.createElement('script')
    element.id = id
    element.src = 'https://weatherwidget.io/js/widget.min.js'
    parentElement.parentNode.insertBefore(element, parentElement)
  }

  setWeatherFromName(id:string){
    const x = document.getElementsByClassName('weatherwidget-io')
    const dcName =  this.stations.filter(value => {
      return value.id === id
    })

    x[0].setAttribute('href', dcName[0].id  + '?unit=us')
    x[0].setAttribute('data-label_1', dcName[0].name)
    this.loadWeather('weatherwidget-io-js')
  }

 
  ngAfterViewInit() {
    const clockDiv:any = document.getElementById('clock')
    const spacerDiv:any = document.getElementById('spacer')
    const secondsDiv:any = document.getElementById('seconds')
    const tickDiv:any = document.getElementById('tick')

    setInterval(() => {
      this.time = new Date()

      const width = clockDiv.clientWidth
      const second = this.time.getSeconds()
      const secondWidth = Math.floor(width / 60)
      const spacer = (second * secondWidth)

      spacerDiv.style.width = spacer + 'px'
      tickDiv.style.width = (secondWidth * 2).toString()
      tickDiv.style.height = (secondWidth * 2).toString()
      secondsDiv.style.height = (secondWidth).toString()

    }, 1000)

    fitty('#time')
    fitty('#day')
    fitty('#date')
  }

 
}
