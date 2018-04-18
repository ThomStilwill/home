import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {


  coursesObservable: Observable<any[]>;
  constructor(private db: AngularFireDatabase) { }


  ngOnInit() {
    this.coursesObservable = this.getCourses('/');
  }

  getCourses(listPath): Observable<any[]> {
    return this.db.list(listPath).valueChanges();
  }

}
