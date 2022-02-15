import { Inject, Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { CrudModel } from './crud-model';
import { Observable, throwError } from 'rxjs';
import { APP_CONFIG, AppConfig } from 'src/app/app-config.module';

@Injectable({
  providedIn: 'root'
})
export abstract class CrudService<T extends CrudModel> {

  protected abstract url: string;
  baseUrl: string;
  constructor(private service: HttpService,
    @Inject(APP_CONFIG) private config: AppConfig) {
     }

  getall(): Observable<T[]> {
    this.service.delayMs = 1000;
    if (!this.url) {
      throwError('Endpoint not set.');
    }
    return this.service.get<T[]>(`${this.config.apiUrl}${this.url}`);
  }

  get(id: number): Observable<T> {
    return this.service.get<T>(`${this.config.apiUrl}${this.url}/${id}`);
  }

  add(item: T) {
    return this.service
      .post<T>(`${this.config.apiUrl}${this.url}`, item);
  }

  update(item: T) {
    return this.service
      .put<T>(`${this.config.apiUrl}${this.url}/${item.id}`, item);
  }

  delete(item: T) {
    return this.service
      .delete(`${this.config.apiUrl}${this.url}/${item.id}`);
  }
}
