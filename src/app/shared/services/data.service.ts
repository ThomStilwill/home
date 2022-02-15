import { Injectable, Inject } from '@angular/core';
import { APP_CONFIG, AppConfig } from '../../app-config.module';
import { HttpClient } from '@angular/common/http';
import { Link } from '../models/link';

@Injectable({  providedIn: 'root' })
export class DataService {

  constructor(private http: HttpClient,
              @Inject(APP_CONFIG) private config: AppConfig) { }

    getLinks(id) {
        return this.http.get<Link[]>(`${this.config.apiUrl}links-${id}`);
    }
}
