import { Injectable } from '@angular/core';
import { Schedule } from '../models/schedule';
import { CrudService } from '../core/services/crud.service';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService extends CrudService<Schedule> {
    protected url = 'schedule';
}
