import { Injectable } from '@angular/core';
import { ReportConfig } from '../models/report.config';
import { CrudService } from '../../shared/services/crud.service';

@Injectable({
  providedIn: 'root'
})
export class ReportService extends CrudService<ReportConfig> {
  protected url = 'report';
}
