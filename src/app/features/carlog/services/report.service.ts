import { Injectable } from '@angular/core';
import { ReportConfig } from '../models/report.config';
import { CrudService } from '../core/services/crud.service';

@Injectable({
  providedIn: 'root'
})
export class ReportService extends CrudService<ReportConfig> {
  protected url = 'report';
}
