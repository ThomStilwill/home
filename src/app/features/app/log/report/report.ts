import { Schedule } from '../models/schedule';
import { Logrecord } from '../models/log-record';

export class Report extends  Schedule {
  logs: Logrecord[];

  constructor() {
    super();
  }
}
