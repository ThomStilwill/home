import { Injectable, Inject } from '@angular/core';
import { APP_CONFIG, AppConfig } from '../../app-config.module';
import { HttpClient } from '@angular/common/http';

@Injectable({  providedIn: 'root' })
export class DataService {

  constructor(private http: HttpClient,
              @Inject(APP_CONFIG) private config: AppConfig) { }

    getItems<T>(id) {
        return this.http.get<T[]>(`${this.config.apiUrl}${id}`);
    }
}
