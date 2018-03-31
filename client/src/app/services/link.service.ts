import { Injectable } from '@angular/core';
import { Link } from './link'

import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class LinkService {

  private links: Array<Link>;

  items: Observable<any[]>;

  
  constructor(public db: AngularFireDatabase) {

    //this.items = db.list('links').valueChanges();

    this.links = new Array<Link>();
    this.links.push(new Link("https://www.eversource.com/clp/outage/outagemap.aspx","EverSource Outages"));
    this.links.push(new Link("http://www.intellicast.com/Local/Weather.aspx?location=USCT0169","Weather"));
    this.links.push(new Link("http://www.wfsb.com","News"));
    this.links.push(new Link("http://www.movies.com/movie-times/06062-movie-times","Movies"));
    this.links.push(new Link("http://www.plainvillect.com","Town Hall"));
    this.links.push(new Link("http://Netflix.com","Netflix"));
    this.links.push(new Link("http://www.hulu.com","Hulu"));
    this.links.push(new Link("http://www.amazon.com","Amazon"));
   }

  getLinks():  Array<Link>{
    return this.links;
  }
}
