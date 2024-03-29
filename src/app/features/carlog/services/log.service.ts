import { Injectable } from '@angular/core';
import { Logrecord } from '../models/log-record';
import { CrudService } from '../core/services/crud.service';

@Injectable({
  providedIn: 'root'
})
export class LogService  extends CrudService<Logrecord> {
  protected url = 'log';
}
