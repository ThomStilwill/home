import { Injectable } from '@angular/core';
import { Link } from './link'

@Injectable()
export class LinkService {

  private links: Array<Link>;

  constructor() {
    this.links = new Array<Link>();
    this.links.push(new Link("https://www.eversource.com/clp/outage/outagemap.aspx","EverSource Outages"));
    this.links.push(new Link("http://www.intellicast.com/Local/Weather.aspx?location=USCT0169","Weather"));
   }

  getLinks():  Array<Link>{
    return this.links;
  }
}
